import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AtmaNormalFont, Doctor_GlitchFont } from "@/fonts/fonts";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${AtmaNormalFont.className} antialiased`}
      >
        <header 
          className="fixed top-0 left-0 right-0 p-8 flex items-center justify-center z-20"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.3) 90%, transparent 100%)"
          }}
        >
          {/* <nav className='hidden md:flex items-center justify-center gap-4 text-xl'>
            <a href="#">Início</a>
            <a href="#">Marcas</a>
            <a href="#">Marcas</a>
          </nav> */}
          <h2 className={`${Doctor_GlitchFont.className} m-auto text-5xl p-2 rounded-md `}>
            <span className='text-yellow-600'>M</span>
            IDIA
            <span className='text-yellow-600'>B</span>
            OYZ
          </h2>
          {/* <nav className='hidden md:flex items-center justify-center gap-4 text-xl'>
            <a href="#">Carrinho</a>
            <a href="#">Contato</a>
          </nav> */}
        </header>
        {children}
      </body>
    </html>
  );
}
