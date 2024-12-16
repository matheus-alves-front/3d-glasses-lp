"use client"

import React, { useState, useEffect, useCallback, FC, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Scene } from '@/components/scene/scene'
import { AtmaBoldFont } from '@/fonts/fonts'

export interface SectionElement extends HTMLElement {}

const Home: FC = () => {
  const [activeSection, setActiveSection] = useState<number>(1);

  const handleScroll = useCallback(() => {
    const main = document.querySelector('main');
    if (!main) return;
    const { scrollTop, clientHeight } = main;
   
    const currentIndex = Math.round(scrollTop / clientHeight) + 1;
    if (currentIndex !== activeSection) {
      setActiveSection(currentIndex);
    }
  }, [activeSection]);

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main) return;
    main.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      main.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <main
      className={`
        ${AtmaBoldFont.className} 
        relative 
        w-full 
        h-screen
        overflow-y-auto 
        snap-y 
        snap-mandatory 
        scroll-smooth
      `}
    >
      {/* Canvas fixo ao fundo */}
      <section className="w-full h-screen fixed inset-0 bg-white/60 z-0 pointer-events-none">
        <Canvas
          className="absolute top-0 left-0 w-full h-screen"
          dpr={[1, 2]}
          gl={{ antialias: true }}
        >
          <Suspense fallback={null}>
            <Scene activeSection={activeSection} />
          </Suspense>
        </Canvas>
      </section>

      {/* Cada seção do conteúdo com snap-start */}
      <section className="bg-black/30 px-8 m-auto w-full h-screen flex items-end justify-center pb-24 relative z-10 snap-start">
        <div className="text-white text-center max-w-screen-xl">
          <h2 className="text-4xl mb-4 drop-shadow-sm">Coleção Kira Returns</h2>
          <p className='drop-shadow-sm'>Entre muitos de nossos Editoriais, conheça o NOVO MUNDO...</p>
        </div>
      </section>

      <section className="bg-black/30 px-8 m-auto w-full h-screen flex items-end justify-center pb-24 relative z-10 snap-start">
        <div className="text-white text-center max-w-screen-xl">
          <h2 className="text-4xl mb-4 drop-shadow-sm">Lenda entre os maiores Rappers!</h2>
          <p className='drop-shadow-sm'>Os Óculos mais LENDÁRIOS da Cena! ...</p>
        </div>
      </section>

      <section className="bg-black/30 px-8 m-auto w-full h-screen flex items-end justify-center pb-24 relative z-10 snap-start">
        <div className="text-white text-center max-w-screen-xl">
          <h2 className="text-4xl mb-4 drop-shadow-sm">Conforto, Qualidade, Funcionalidade...</h2>
          <p className='drop-shadow-sm'>Compondo com um dos Tons mais Suaves ...</p>
        </div>
      </section>

      <section className="bg-black/30 px-8 m-auto w-full h-screen flex items-end justify-center pb-24 relative z-10 snap-start">
        <div className="text-white text-center max-w-screen-xl">
          <h2 className="text-4xl mb-4 drop-shadow-sm">
            Não perca essa oportunidade de dar um upgrade no seu estilo!
          </h2>
          <button className='bg-white text-black px-6 py-2 mt-4 rounded'>
            Comprar
          </button>
        </div>
      </section>
    </main>
  )
}

// Pré-carrega o modelo
useGLTF.preload('/models/sunglasses.glb')

export default Home;
