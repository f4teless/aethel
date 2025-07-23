"use client";

import { useState } from "react";
import Image from "next/image";
import ClientBackgroundWrapper from "@/components/old/ClientBackgroundWrapper";

// Optimized Image component for better performance
const OptimizedImage = ({ src, alt, width, height, className }: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) => (
  <Image
    src={src}
    alt={alt}
    width={width}
    height={height}
    className={className}
    priority={false}
    loading="lazy"
    quality={85}
    placeholder="blur"
    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGBkaGx0f/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAhEQACAQIEBwAAAAAAAAAAAAABAgMAEQQFITFBUaGx0f/aAAwDAQACEQMRAD8A0XGARslxQlNvOL/z"
  />
);

const LorePage = () => {
  const [activeTab, setActiveTab] = useState("unraveling");

  return (
    <ClientBackgroundWrapper backgroundImage="url(/lore-library.webp)">
      <link rel="preload" as="image" href="/lore-library.webp" />
      <div className="container mx-auto px-4 sm:px-6 py-16 md:py-24 text-white">
        <header className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="font-cinzel text-4xl md:text-6xl font-bold drop-shadow-lg">
            The Chronicles of Aethel
          </h1>
          <p className="font-cormorant italic text-xl md:text-2xl text-white/80 mt-4">
            Recovered fragments from a world on the brink. Study the past to
            prevent the final `SIGTERM`.
          </p>
        </header>

        <div className="sticky top-[70px] z-40 bg-slate-900/70 backdrop-blur-lg rounded-lg border border-white/20 mb-12 shadow-xl">
          <nav className="flex justify-center items-center flex-wrap gap-x-4 sm:gap-x-8 p-4 font-cinzel tracking-wider">
            <button
              className={`transition-all duration-300 cursor-pointer px-4 py-2 rounded-lg ${
                activeTab === "world" 
                  ? "text-white bg-white/10 border border-white/20 shadow-lg" 
                  : "text-white/60 hover:text-white/80 hover:bg-white/5"
              }`}
              onClick={() => setActiveTab("world")}
            >
              The World
            </button>
            <div className="h-4 w-px bg-white/20 hidden sm:block" />
            <button
              className={`transition-all duration-300 cursor-pointer px-4 py-2 rounded-lg ${
                activeTab === "unraveling" 
                  ? "text-white bg-white/10 border border-white/20 shadow-lg" 
                  : "text-white/60 hover:text-white/80 hover:bg-white/5"
              }`}
              onClick={() => setActiveTab("unraveling")}
            >
              The Great Unraveling
            </button>
            <div className="h-4 w-px bg-white/20 hidden sm:block" />
            <button
              className={`transition-all duration-300 cursor-pointer px-4 py-2 rounded-lg ${
                activeTab === "corruption" 
                  ? "text-white bg-white/10 border border-white/20 shadow-lg" 
                  : "text-white/60 hover:text-white/80 hover:bg-white/5"
              }`}
              onClick={() => setActiveTab("corruption")}
            >
              The Code Corruption
            </button>
            <div className="h-4 w-px bg-white/20 hidden sm:block" />
            <button
              className={`transition-all duration-300 cursor-pointer px-4 py-2 rounded-lg ${
                activeTab === "architects" 
                  ? "text-white bg-white/10 border border-white/20 shadow-lg" 
                  : "text-white/60 hover:text-white/80 hover:bg-white/5"
              }`}
              onClick={() => setActiveTab("architects")}
            >
              The Architects
            </button>
          </nav>
        </div>

        <div className="max-w-4xl mx-auto space-y-20">
          {activeTab === "world" && (
            <section className="space-y-6 animate-fade-in">
              <h2 className="font-cinzel text-3xl md:text-4xl border-b border-white/20 pb-2">
                Aethel: The CodeRealm
              </h2>
              <OptimizedImage
                src="/lore-world.webp"
                alt="A sweeping vista of the world of Aethel"
                width={1024}
                height={800}
                className="h-[800px] rounded-lg shadow-xl border border-white/10 w-full object-cover"
              />
              <p className="font-ebg text-lg text-white/90 leading-relaxed">
                Aethel is not a world of earth and stone, but one of pure logic
                and syntax...
              </p>
              <blockquote className="border-l-4 border-blue-400 pl-4 py-2 my-4 bg-black/20 font-cormorant italic text-lg text-slate-300">
                "In the beginning, there was the void. Then, the Compiler
                spoke: `main()`. And there was light." - The First Log
              </blockquote>
              <p className="font-ebg text-lg text-white/90 leading-relaxed">
                For eons, The Compiler maintained perfect harmony. But no system
                is eternal...
              </p>
            </section>
          )}

          {activeTab === "unraveling" && (
            <section className="space-y-6 animate-fade-in">
              <h2 className="font-cinzel text-3xl md:text-4xl border-b border-white/20 pb-2">
                The Great Unraveling
              </h2>
              <OptimizedImage
                src="/lore-unraveling.webp"
                alt="A world fracturing and dissolving into digital fragments"
                width={1024}
                height={700}
                className="h-[700px] rounded-lg shadow-xl border border-white/10 w-full object-cover"
              />
              <p className="font-ebg text-lg text-white/90 leading-relaxed">
                The Great Unraveling is the name given to the slow,
                catastrophic system crash of reality itself...
              </p>
              <blockquote className="border-l-4 border-purple-500 pl-4 py-2 my-4 bg-black/20 font-cormorant italic text-lg text-slate-300">
                "The Unraveling is not death. It is worse. It is the systematic
                de-allocation of memory..."
              </blockquote>
              <p className="font-ebg text-lg text-white/90 leading-relaxed">
                Should the Unraveling complete, Aethel will cease to exist...
              </p>
            </section>
          )}

          {activeTab === "corruption" && (
            <section className="space-y-6 animate-fade-in">
              <h2 className="font-cinzel text-3xl md:text-4xl border-b border-white/20 pb-2">
                The Code Corruption
              </h2>
              <OptimizedImage
                src="/lore-corruption.webp"
                alt="A monstrous glitch beast"
                width={1024}
                height={800}
                className="h-[800px] rounded-lg shadow-xl border border-white/10 w-full object-cover"
              />
              <p className="font-ebg text-lg text-white/90 leading-relaxed">
                If the Great Unraveling is the disease, the Code Corruption is
                its symptoms...
              </p>
              <blockquote className="border-l-4 border-red-500 pl-4 py-2 my-4 bg-black/20 font-cormorant italic text-lg text-slate-300">
                "We saw it first in the Datawood... the trees began to scream
                in binary."
              </blockquote>
              <p className="font-ebg text-lg text-white/90 leading-relaxed">
                These anomalies are not merely dangerous; they are catalysts...
              </p>
            </section>
          )}

          {activeTab === "architects" && (
            <section className="space-y-6 animate-fade-in">
              <h2 className="font-cinzel text-3xl md:text-4xl border-b border-white/20 pb-2">
                The Architects
              </h2>
              <OptimizedImage
                src="/lore-architect.webp"
                alt="A cloaked figure manipulating lines of code"
                width={1024}
                height={800}
                className="h-[800px] rounded-lg shadow-xl border border-white/10 w-full object-cover"
              />
              <p className="font-ebg text-lg text-white/90 leading-relaxed">
                In a desperate attempt to halt the Unraveling, The Compiler
                granted a new class of user...
              </p>
              <blockquote className="border-l-4 border-blue-400 pl-4 py-2 my-4 bg-black/20 font-cormorant italic text-lg text-slate-300">
                "They are not gods. They are debuggers. And the fate of our
                world is their stack trace."
              </blockquote>
              <p className="font-ebg text-lg text-white/90 leading-relaxed">
                Your journey is to seek out the root cause of the Corruption...
              </p>
            </section>
          )}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </ClientBackgroundWrapper>
  );
};

export default LorePage;