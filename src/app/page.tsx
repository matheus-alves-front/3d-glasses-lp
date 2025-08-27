"use client"

import React, { useState, useEffect, useCallback, FC, Suspense, useRef } from 'react'
import { AtmaBoldFont } from '@/fonts/fonts'
import { FaWhatsapp } from "react-icons/fa";
import dynamic from 'next/dynamic'
import { CanvaScene } from '@/components/scene/Canva'
import { useInView } from 'framer-motion';

const Scene = dynamic(() => import('../components/scene/Scene'), { ssr: false })

export interface SectionElement extends HTMLElement {}

const Home: FC = () => {
  const [activeSection, setActiveSection] = useState<number>(1);

  const section1Ref = useRef(null)
  const isSection1View = useInView(section1Ref)

  const section2Ref = useRef(null)
  const isSection2View = useInView(section2Ref)

  const section3Ref = useRef(null)
  const isSection3View = useInView(section3Ref)

  const section4Ref = useRef(null)
  const isSection4View = useInView(section4Ref)


  useEffect(() => {
    if (isSection1View) {
      setActiveSection(1)

      return
    }
    if (isSection2View) {
      setActiveSection(2)

      return
    }

    if (isSection3View) {
      setActiveSection(3)

      return
    }

    if (isSection4View) {
      setActiveSection(4)

      return
    }


    console.log({
      isSection1View, isSection2View, isSection3View, isSection4View
    })
  }, [isSection1View, isSection2View, isSection3View, isSection4View])

  return (
    <main
      className={`
        ${AtmaBoldFont.className} 
        relative 
        w-full
        h-dvh
        overflow-y-auto 
        scroll-smooth
      `}
    >
      {/* Canvas fixo ao fundo */}
      <section className="w-full h-dvh fixed inset-0 z-0 pointer-events-none">
        <CanvaScene activeSection={activeSection} />
      </section>

      {/* Cada seção do conteúdo com snap-start */}
      <section
        ref={section1Ref} 
        className="bg-black/20 px-8 m-auto w-full h-dvh flex items-end justify-center relative z-10 "
      >
        <div className="text-white drop-shadow-xl text-center max-w-screen-xl py-20">
          <h2 style={{textShadow: '0px 0px 7px #000000'}} className="text-xl md:text-4xl mb-4 drop-shadow-lg">Coleção Kira Returns</h2>
          <p className='drop-shadow-lg'>Entre muitos de nossos Editoriais, conheça o NOVO MUNDO...</p>
        </div>
      </section>
      <div className='relative w-full h-20 bg-black/20 z-10'></div>

      <section
        ref={section2Ref} 
        className="bg-black/20 px-8 m-auto w-full h-dvh flex items-end justify-center relative z-10 "
      >
        <div className="text-white drop-shadow-xl text-center max-w-screen-xl py-20">
          <h2 style={{textShadow: '0px 0px 7px #000000'}} className="text-xl md:text-4xl mb-4 drop-shadow-lg">Lenda entre os maiores Rappers!</h2>
          <p className='drop-shadow-lg'>Os Óculos mais LENDÁRIOS da Cena! ...</p>
        </div>
      </section>
      <div className='relative w-full h-20 bg-black/20 z-10'></div>

      <section
        ref={section3Ref} 
        className="bg-black/20 px-8 m-auto w-full h-dvh flex items-end justify-center relative z-10 "
      >
        <div className="text-white drop-shadow-xl text-center max-w-screen-xl py-20">
          <h2 style={{textShadow: '0px 0px 7px #000000'}} className="text-xl md:text-4xl mb-4 drop-shadow-lg">Conforto, Qualidade, Funcionalidade...</h2>
          <p className='drop-shadow-lg'>Compondo com um dos Tons mais Suaves ...</p>
        </div>
      </section>
      <div className='relative w-full h-20 bg-black/20 z-10'></div>

      <section
        ref={section4Ref} 
        className="bg-black/20 px-8 m-auto w-full h-dvh flex items-end justify-center relative z-10"
      >
        <div className="text-white drop-shadow-xl text-center max-w-screen-xl py-20">
          <h2 style={{textShadow: '0px 0px 7px #000000'}} className="text-xl md:text-4xl mb-4 drop-shadow-lg">
            Não perca essa oportunidade de dar um upgrade no seu estilo!
          </h2>
          <button className='bg-white text-xl flex items-center justify-center gap-2 m-auto text-black px-8 py-4 mt-4 rounded-lg'>
            Comprar
            <FaWhatsapp />
          </button>
        </div>
      </section>
    </main>
  )
}

export default Home;
