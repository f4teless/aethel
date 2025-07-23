"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ClientBackgroundWrapper from "@/components/old/ClientBackgroundWrapper";

const PvpPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const swordsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Ensure elements are visible before animating
    if (containerRef.current && swordsRef.current && ctaRef.current) {
      // Set initial state
      gsap.set(containerRef.current, { y: 50, opacity: 0 });
      gsap.set(swordsRef.current, { scale: 0.5, opacity: 0, rotate: -30 });
      gsap.set(ctaRef.current, { y: 20, opacity: 0 });

      // Create timeline for better control
      const tl = gsap.timeline();
      
      // Animate container
      tl.to(containerRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      })
      // Animate swords with slight delay
      .to(swordsRef.current, {
        scale: 1,
        opacity: 1,
        rotate: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
      }, "-=0.8")
      // Animate CTA button
      .to(ctaRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.4");

      // Add floating animation for swords
      gsap.to(swordsRef.current, {
        y: "+=10",
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
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
          <h1 className="text-5xl md:text-6xl font-cinzel font-bold drop-shadow mb-3 bg-gradient-to-r from-red-400 via-yellow-300 to-red-400 bg-clip-text text-transparent">
            Arena Awaits
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-cormorant italic max-w-2xl mx-auto mb-8 leading-relaxed">
            The Architects shall clash soon. Logic will be your blade. Speed,
            your shield. Only the finest coders shall prevail in the coming war.
          </p>
          <button
            ref={ctaRef}
            disabled
            className="text-white/70 bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-white/20 px-8 py-3 rounded-xl font-bold font-cinzel tracking-wide cursor-not-allowed transition-all duration-300 hover:bg-gradient-to-r hover:from-slate-700/50 hover:to-slate-800/50 hover:border-white/30 backdrop-blur-md shadow-lg"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
              Coming Soon
            </span>
          </button>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-6">
              <div className="text-3xl mb-3">🏆</div>
              <h3 className="font-cinzel text-lg font-bold mb-2">Ranked Battles</h3>
              <p className="text-sm text-white/70">Climb the leaderboard through strategic combat</p>
            </div>
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-6">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-cinzel text-lg font-bold mb-2">Real-time Combat</h3>
              <p className="text-sm text-white/70">Face opponents in lightning-fast duels</p>
            </div>
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-6">
              <div className="text-3xl mb-3">🎖️</div>
              <h3 className="font-cinzel text-lg font-bold mb-2">Eternal Glory</h3>
              <p className="text-sm text-white/70">Claim your place in the Hall of Champions</p>
            </div>
          </div>
        </div>
        
        <style jsx>{`
          .swords {
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
            filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
          }
          
          .pvp-container {
            background: radial-gradient(circle at center, rgba(255, 255, 255, 0.02) 0%, transparent 70%);
          }
        `}</style>
      </div>
    </ClientBackgroundWrapper>
  );
};

export default PvpPage;