import React, { useEffect, useRef, FC } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { SunglassesModel } from '../model/Sunglasses'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { PMREMGenerator, MathUtils, PerspectiveCamera } from 'three'
import * as THREE from 'three'

interface SceneProps {
  activeSection: number;
}

export const Scene: FC<SceneProps> = ({ activeSection }) => {
  const { scene, gl, camera } = useThree<{
    scene: THREE.Scene;
    gl: THREE.WebGLRenderer;
    camera: PerspectiveCamera;
  }>()

  const angle = useRef<number>(0)
  const meshRef = useRef<THREE.Group>(null)

  useEffect(() => {
    const loader = new RGBELoader()
    loader.load('/models/envmap.hdr', (texture) => {
      const pmremGenerator = new PMREMGenerator(gl)
      pmremGenerator.compileEquirectangularShader()
      gl.toneMapping = THREE.ACESFilmicToneMapping

      const envMap = pmremGenerator.fromEquirectangular(texture).texture

      scene.environment = envMap
      scene.background = envMap

      texture.dispose()
      pmremGenerator.dispose()
    })
  }, [scene, gl])

  const targetPositions: Record<number, { radius: number; y: number; fov: number; isRotation: boolean }> = {
    1: { radius: 20, y: 1, fov: 80, isRotation: false },
    2: { radius: 16, y: -4, fov: 60, isRotation: true },
    3: { radius: 14, y: -2, fov: 90, isRotation: true },
  }

  useFrame((_, delta) => {
    // Incrementa o "tempo" continuamente
    angle.current += delta * 0.1
  
    // Obtém os parâmetros do targetPosition baseados no activeSection
    const { radius, y, fov } = targetPositions[activeSection] || targetPositions[1]
  
    // Atualiza a câmera
    camera.fov = MathUtils.lerp(camera.fov, fov, 0.05)
    camera.updateProjectionMatrix()
  
    // Aqui você pode manter a translação se precisar
    const targetX = Math.cos(angle.current) * radius
    const targetZ = Math.sin(angle.current) * radius
    camera.position.x = MathUtils.lerp(camera.position.x, targetX, 0.05)
    camera.position.z = MathUtils.lerp(camera.position.z, targetZ, 0.05)
    camera.position.y = MathUtils.lerp(camera.position.y, y, 0.05)
  
    camera.lookAt(0, 0, 0)
  
  })
  

  return (
    <>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} />
      <SunglassesModel ref={meshRef} position={[0, 0, 4]} scale={4} />
      <OrbitControls enableZoom={false} />
    </>
  )
}
