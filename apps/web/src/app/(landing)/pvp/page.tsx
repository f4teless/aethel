"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ClientBackgroundWrapper from "@/components/ClientBackgroundWrapper";

const PvpPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const swordsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    // Ensure elements are visible before animating
    if (containerRef.current && swordsRef.current) {
      // Set initial state
      gsap.set(containerRef.current, { y: 50, opacity: 0 });
      gsap.set(swordsRef.current, { scale: 0.5, opacity: 0, rotate: -30 });

      // Animate container
      gsap.to(containerRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      });

      // Animate swords with delay
      gsap.to(swordsRef.current, {
        scale: 1,
        opacity: 1,
        rotate: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
        delay: 0.3,
      });
    }
  }, []);

  return (
    <ClientBackgroundWrapper backgroundImage="url(/bg3.webp)">
      <link rel="preload" as="image" href="/bg3.webp" />
    <div className="min-h-screen text-white relative overflow-hidden">
      <div 
        ref={containerRef}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 pvp-container"
      >
        <div ref={swordsRef} className="swords text-6xl mb-4 drop-shadow-lg">⚔️</div>
        <h1 className="text-5xl font-cinzel font-bold drop-shadow mb-3">
          Arena Awaits
        </h1>
        <p className="text-xl text-white/90 font-cormorant italic max-w-xl mx-auto mb-6">
          The Architects shall clash soon. Logic will be your blade. Speed,
          your shield.
        </p>
        <button
          disabled
          className="text-white/70 bg-transparent border border-white/20 px-6 py-2 rounded-xl font-bold font-cinzel tracking-wide cursor-not-allowed transition hover:bg-current/20 backdrop-blur"
        >
          Coming Soon
        </button>
      </div>
      
      <style jsx>{`
        .swords {
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </div>
    </ClientBackgroundWrapper>
  );
};

export default PvpPage;
