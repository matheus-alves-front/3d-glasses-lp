import React, { useEffect, useRef, FC, Suspense } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, useProgress, Environment } from '@react-three/drei'
import { SunglassesModel } from '../model/Sunglasses'
import { MathUtils, PerspectiveCamera } from 'three'

interface SceneProps {
  activeSection: number;
}

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center style={{ color: '#fff', zIndex: 9999 }}>
      <div style={{ background: 'rgba(0,0,0,0.7)', padding: '20px', borderRadius: '8px' }}>
        Carregando... {Math.floor(progress)}%
      </div>
    </Html>
  )
}

const isMobile = typeof window !== 'undefined' ? /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) : false

// Ajustamos as posições conforme necessário:
const targetPositions: Record<number, { x: number; z: number; y: number; fov: number; isRotation: boolean }> = {
  1: { x: 0, z: 20, y: 1, fov: 80, isRotation: false },
  2: { x: 5, z: 10, y: -4, fov: 60, isRotation: false },
  3: { x: -8, z: 16, y: -2, fov: 90, isRotation: false },
  4: { x: 0, z: 20, y: 0, fov: 90, isRotation: true },
}

export const Scene: FC<SceneProps> = ({ activeSection }) => {
  const { camera } = useThree<{
    camera: PerspectiveCamera;
  }>()

  const angle = useRef<number>(0)

  useFrame((_, delta) => {
    const { x, z, y, fov, isRotation } = targetPositions[activeSection] || targetPositions[1]
    
    // Ajuste suave do FOV
    camera.fov = MathUtils.lerp(camera.fov, fov, 0.025)
    camera.updateProjectionMatrix()

    // Ponto central do modelo (onde a câmera deve olhar)
    const centerX = 0
    const centerY = 0
    const centerZ = 0

    let targetX, targetY, targetZ

    if (isRotation) {
      // Orbitando ao redor do ponto central (o modelo em [0,0,4])
      angle.current += delta * .4
      const orbitRadius = 20 // Ajuste conforme necessário
      const offsetX = Math.cos(angle.current) * orbitRadius
      const offsetZ = Math.sin(angle.current) * orbitRadius

      // A câmera orbita ao redor do modelo, independente de x,z da targetPosition.
      // Caso queira usar x,z,y da targetPosition como "altura" ou "offset base", inclua-os no cálculo.
      targetX = MathUtils.lerp(camera.position.x, centerX + offsetX, 0.025)
      targetZ = MathUtils.lerp(camera.position.z, centerZ + offsetZ, 0.025)
      targetY = MathUtils.lerp(camera.position.y, centerY + y, 0.025)

    } else {
      // Sem rotação: apenas aproximação suave da posição alvo
      angle.current += delta * 0.5
      const floatOffset = Math.sin(angle.current) * 1
      targetX = MathUtils.lerp(camera.position.x, x, 0.025)
      targetZ = MathUtils.lerp(camera.position.z, z, 0.025)
      targetY = MathUtils.lerp(camera.position.y, y + floatOffset, 0.025)
    }

    camera.position.set(targetX, targetY, targetZ)
    // Agora a câmera olha diretamente para o modelo
    camera.lookAt(0,0,0)
  })

  return (
    <Suspense fallback={<Loader />}>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} />
      
      <SunglassesModel position={[0, 0, 4]} scale={4} />
      
      {/* {!isMobile && ( */}
        <Environment files="/models/envmap.hdr" background />
      {/* )} */}
      {/* {isMobile && (
        <color attach="background" args={[0xcccccc]} />
      )} */}
      
      <OrbitControls enableZoom={false} />
    </Suspense>
  )
}
