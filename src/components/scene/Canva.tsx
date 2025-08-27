
"use client"
import { Doctor_GlitchFont } from '@/fonts/fonts'
import { Html, useProgress } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'


const Scene = dynamic(() => import('./Scene'), { ssr: false })

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center style={{ color: '#fff', zIndex: 9999 }}>
      <div className={Doctor_GlitchFont.className} style={{ background: 'rgba(0,0,0,0.5)', padding: '20px', borderRadius: '8px' }}>
        Carregando... {Math.floor(progress)}%
      </div>
    </Html>
  )
}

export const CanvaScene = ({
  activeSection
}: {
  activeSection: number
}) => {
  return (
     <Canvas
        className="absolute top-0 left-0 w-full h-screen"
        dpr={[1, 2]}

        gl={{ antialias: true }}
      >
        <Suspense fallback={<Loader />}>
          <Scene activeSection={activeSection} />
        </Suspense>
      </Canvas>
  )
}