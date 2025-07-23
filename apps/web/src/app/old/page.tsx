"use client"

import { useState, useEffect } from "react";

import Hero from "@/components/landing/old/OldHero";
import Pillars from "@/components/landing/old/OldPillars";
import FinalCta from "@/components/landing/old/OldFinalCta";
import Footer from "@/components/landing/old/OldFooter";
import ClientBackgroundWrapper from "@/components/old/ClientBackgroundWrapper";
import Features from "@/components/landing/old/OldFeatures";
import GamePlay from "@/components/landing/GamePlay";
import { hero } from "@/components/landing/landing";
import { getRandomItem } from "@/lib/constants";

export default function HomePage() {
  
  const [heroData, setHeroData] = useState(hero[0]); // Use first hero as default

  useEffect(() => {
    // Set random hero after mount to avoid hydration mismatch
    setHeroData(getRandomItem(hero));
  }, []);

  return (
    <ClientBackgroundWrapper backgroundImage="url(/bg2.webp)">
      <Hero heroData={heroData} />
      <Pillars />
      <Features />
      <GamePlay />
      <FinalCta />
      <Footer />
    </ClientBackgroundWrapper>
  );
}