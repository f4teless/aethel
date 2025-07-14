"use client"

import Link from "next/link";
import { errorImages, getRandomItem } from "@/lib/constants";
import ClientBackgroundWrapper from "@/components/ClientBackgroundWrapper";

const NotFoundPage = () => {
  const randomBg = getRandomItem(errorImages);

  return (
    <ClientBackgroundWrapper backgroundImage={`url(${randomBg})`}>
      <link rel="preload" as="image" href={randomBg} />
      <div className="flex flex-col items-center justify-center min-h-screen text-center text-white px-4 relative z-10">
        <div className="bg-black/50 backdrop-blur-lg p-8 md:p-12 rounded-xl border border-red-500/30 max-w-3xl shadow-2xl shadow-red-900/20">
          <div className="glitch font-cinzel text-7xl md:text-9xl font-black" data-text="404">
            404
          </div>
          <h1 className="font-cinzel text-3xl md:text-4xl font-bold mt-4 text-red-400 tracking-wider">
            A VOID POINTER EXCEPTION
          </h1>
          <p className="font-cormorant italic text-lg md:text-xl text-white/80 mt-6 max-w-2xl mx-auto">
            The resource you seek has been de-allocated by the Great Unraveling, or perhaps it never existed at all. The logic path leads into a void.
          </p>
          <div className="mt-10 flex justify-center space-x-4">
            <Link
              href="/"
              className="bg-cyan-600/20 hover:bg-cyan-500/30 text-white px-8 py-3 rounded-md transition font-cinzel tracking-wider shadow-lg hover:shadow-xl hover:scale-105 duration-200 border border-white/20"
            >
              RETURN TO SAFETY
            </Link>
            <Link
              href="/lore"
              className="bg-slate-800/40 hover:bg-slate-700/50 text-white px-8 py-3 rounded-md transition font-cinzel tracking-wider shadow-lg hover:shadow-xl hover:scale-105 duration-200 border border-white/20"
            >
              Revisit the Lore
            </Link>
          </div>
        </div>
        
        <style jsx>{`
          .glitch {
            position: relative;
            text-shadow:
              0.05em 0 0 rgba(255, 0, 0, 0.75),
              -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
              0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
            animation: glitch 500ms infinite;
          }

          .glitch:before,
          .glitch:after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: transparent;
          }

          .glitch:before {
            left: 2px;
            text-shadow: -2px 0 #ff00c1;
            clip: rect(44px, 450px, 56px, 0);
            animation: glitch-anim 2s infinite linear alternate-reverse;
          }

          .glitch:after {
            left: -2px;
            text-shadow:
              -2px 0 #00fff9,
              2px 2px #ff00c1;
            clip: rect(85px, 450px, 90px, 0);
            animation: glitch-anim-2 3s infinite linear alternate-reverse;
          }

          @keyframes glitch-anim {
            0% {
              clip: rect(42px, 9999px, 44px, 0);
            }
            5% {
              clip: rect(12px, 9999px, 60px, 0);
            }
            100% {
              clip: rect(90px, 9999px, 92px, 0);
            }
          }

          @keyframes glitch-anim-2 {
            0% {
              clip: rect(2px, 9999px, 10px, 0);
            }
            15% {
              clip: rect(78px, 9999px, 92px, 0);
            }
            100% {
              clip: rect(52px, 9999px, 60px, 0);
            }
          }
        `}</style>
      </div>
    </ClientBackgroundWrapper>
  );
};

export default NotFoundPage; 