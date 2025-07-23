"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { errorImages, getRandomItem } from "../lib/constants";
import ClientBackgroundWrapper from "@/components/old/ClientBackgroundWrapper";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [randomBg, setRandomBg] = useState(errorImages[0]); // Use first image as default

  useEffect(() => {
    // Set random background after mount to avoid hydration mismatch
    setRandomBg(getRandomItem(errorImages));
  }, []);

  return (
    <ClientBackgroundWrapper backgroundImage={`url(${randomBg})`}>
      <link rel="preload" as="image" href={randomBg} />
      <div className="min-h-screen text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
          <div className="text-6xl mb-4 drop-shadow-lg animate-pulse">💀</div>
          <h1 className="text-5xl font-cinzel font-bold drop-shadow mb-3">
            System Corruption Detected
          </h1>
          <p className="text-xl text-white/90 font-cormorant italic max-w-xl mx-auto mb-6">
            The CodeRealm has encountered an unexpected error. The Architects are working to restore balance.
          </p>
          <div className="space-x-4">
            <button
              onClick={reset}
              className="text-white bg-transparent border border-white/20 px-6 py-2 rounded-xl font-bold font-cinzel tracking-wide transition hover:bg-current/20 backdrop-blur"
            >
              Attempt Recovery
            </button>
            <Link
              href="/"
              className="text-white/70 bg-transparent border border-white/20 px-6 py-2 rounded-xl font-bold font-cinzel tracking-wide transition hover:bg-current/20 backdrop-blur inline-block"
            >
              Return to Safety
            </Link>
          </div>
        </div>
      </div>
    </ClientBackgroundWrapper>
  );
} 