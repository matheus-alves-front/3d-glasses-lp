import React, { FC} from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

useGLTF.preload('/models/sunglasses.glb')

interface GLTFResult {
  nodes: {
    Object_2: THREE.Mesh
    Object_3: THREE.Mesh
    temples_004_mesh: THREE.Mesh
  }
  materials: {
    GlassShade4: THREE.Material
    Used_Metal: THREE.Material
    frame: THREE.Material
  }
}

export const SunglassesModel: FC<JSX.IntrinsicElements['group']> = (props) => {
  const { nodes, materials } = useGLTF('/models/sunglasses.glb') as unknown as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.9}>
        <mesh
          scale={20}
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.GlassShade4}
        />
        <mesh
          scale={20}
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={materials.Used_Metal}
        />
      </group>
    </group>
  )
}