"use client"

import { hero, getRandomItem } from "@/lib/constants";
import Hero from "@/components/Hero";
import Pillars from "@/components/Pillars";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import { 
  LazyFeatures, 
  LazyGamePlay, 
  withIntersectionLoading 
} from "@/components/LazyComponents";
import { usePerformanceMonitor } from "@/hooks/usePerformance";
import ClientBackgroundWrapper from "@/components/ClientBackgroundWrapper";

// Create intersection-observer based lazy loaded components
const IntersectionFeatures = withIntersectionLoading(LazyFeatures, 0.2);
const IntersectionGamePlay = withIntersectionLoading(LazyGamePlay, 0.2);

export default function HomePage() {
  usePerformanceMonitor('HomePage');
  
  const heroData = getRandomItem(hero);

  return (
    <ClientBackgroundWrapper backgroundImage="url(/bg2.webp)">
      <Hero heroData={heroData} />
      <Pillars />
      <IntersectionFeatures />
      <IntersectionGamePlay />
      <FinalCta />
      <Footer />
    </ClientBackgroundWrapper>
  );
}