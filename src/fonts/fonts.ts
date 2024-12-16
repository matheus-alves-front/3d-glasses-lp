import { Atma, Rubik_Glitch, Luckiest_Guy
} from 'next/font/google'
import localFont from 'next/font/local'

export const AtmaBoldFont = Atma({
  weight: '700',
  subsets: ['latin'],
  display: 'swap',
})

export const AtmaNormalFont = Atma({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const RubikGlitchFont = Rubik_Glitch({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const Doctor_GlitchFont = localFont({
  src: './Doctor_Glitch.otf',
  weight: '400',  // se a sua fonte suporta diferentes pesos, ajuste conforme a necessidade
  style: 'normal', // ou 'italic', se desejar
  display: 'swap', // melhora a experiência do usuário ao carregar a fonte
})