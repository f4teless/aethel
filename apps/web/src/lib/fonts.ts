import localFont from 'next/font/local';
import { Cormorant_Garamond, EB_Garamond } from 'next/font/google';

// Critical fonts - preloaded
export const cinzel = localFont({
  src: '../assets/fonts/CinzelDecorative-Regular.woff2',
  variable: '--font-cinzel',
  display: 'swap',
  preload: true
});

export const manrope = localFont({
  src: '../assets/fonts/Manrope-VariableFont_wght.woff2',
  variable: '--font-manrope',
  display: 'swap',
  preload: false
});

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['italic'],
  display: 'swap',
  variable: '--font-cormorant',
  preload: true
});

export const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal'],
  display: 'swap',
  variable: '--font-ebgaramond',
});

export const medievalSharp = localFont({
  src: '../assets/fonts/MedievalSharp-Regular.woff2',
  variable: '--font-medieval',
  display: 'optional',
  preload: false,
});

export const imFellEnglishSC = localFont({
  src: '../assets/fonts/IMFellEnglishSC-Regular.woff2',
  variable: '--font-imfell',
  display: 'optional',
  preload: false,
});