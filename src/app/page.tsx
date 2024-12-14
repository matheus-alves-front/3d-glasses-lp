"use client"

import React, { useState, useEffect, useRef, FC, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Scene } from '@/components/scene/scene'
import { AtmaBoldFont, AtmaNormalFont } from '@/fonts/fonts'

export interface SectionElement extends HTMLElement {}

const Home: FC = () => {
  const [activeSection, setActiveSection] = useState<number>(1);

  const sectionRefs = useRef<SectionElement[]>([]);
  sectionRefs.current = [];

  const addToRefs = (el: SectionElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  useEffect(() => {
    const options = {
      threshold: 0.5
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          const index = sectionRefs.current.indexOf(entry.target as SectionElement) + 1; 
          setActiveSection(index);
        }
      });
    }, options);

    sectionRefs.current.forEach(ref => {
      if(ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach(ref => observer.unobserve(ref));
    }
  }, []);

  return (
    <main className={`${AtmaBoldFont.className} w-full h-[300vh] flex flex-col overflow-hidden relative`}>
      <section className="w-full h-screen fixed inset-0 bg-white/60 z-0">
        <Canvas
          className="absolute top-0 left-0 w-full h-screen"
          dpr={[1, 2]}
          gl={{ antialias: true }}
        >
          {/* Passe a seção ativa para a cena */}

          <Suspense fallback={null}>
            <Scene activeSection={activeSection} />
          </Suspense>
        </Canvas>
      </section>
      <section ref={addToRefs} className="bg-black/30 px-8 m-auto w-full h-screen flex items-end justify-center pb-24 relative z-10">
        <div className="text-white text-center max-w-screen-xl">
          <h2 className="text-4xl mb-4 drop-shadow-sm">Coleção Kira Returns
          </h2>
          <p className='drop-shadow-sm'>Entre muitos de nossos Editoriais, conheça o NOVO MUNDO, que foi Inspirado em um Lettring Futurista que se une a cada Modelo de Óculos ! Trazendo uma referência estilo Magazine, Capa de Manga, os maiores Sucessos da marca são Eternizados através desse Projeto Estético e Inovador !</p>
        </div>
      </section>

      <section ref={addToRefs} className="bg-black/30 px-8 m-auto w-full h-screen flex items-end justify-center pb-24 relative z-10">
        <div className="text-white text-center max-w-screen-xl">
          <h2 className="text-4xl mb-4 drop-shadow-sm">Lenda entre os maiores Rappers!</h2>
          <p className='drop-shadow-sm'>Os Óculos mais LENDÁRIOS da Cena! As Famosas Lupas do KIRA que se tornaram uma Febre entre os Jovens através de sua Estética Diferenciada e Conceitos totalmente Inovadores! Aqui você também encontra a nossa Caixa Misteriosa, a Oferta mais Popular da marca em 2024!</p>
        </div>
      </section>

      <section ref={addToRefs} className="bg-black/30 px-8 m-auto w-full h-screen flex items-end justify-center pb-24 relative z-10">
        <div className="text-white text-center max-w-screen-xl">
          <h2 className="text-4xl mb-4 drop-shadow-sm">Conforto, Qualidade, Funcionalidade e é claro, uma ESTÉTICA EXTREMAMENTE AVANÇADA!</h2>
          <p className='drop-shadow-sm'>Compondo com um dos Tons mais Suaves e Discretos da Coleção NEW GEN, CRONUS tras uma Estética Obscura e Marcante em suas Cores e em seu Design Futurista e Esportivo, feita em armação Plasma relusente e Lente Preta, ideial pra quem gosta de um conceito mais Clean! Uma Lupa perfeita para quem Pratica Esporte, para usar no DIA A DIA e até mesmo naquele ROLÊ que vai marcar pra Sempre a sua Vida!</p>
        </div>
      </section>

    </main>
  )
}

// Preload the model
useGLTF.preload('/models/sunglasses.glb')

export default Home;
