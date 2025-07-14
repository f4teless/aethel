import { hero, getRandomItem } from "../lib/constants";
import Hero from "../components/Hero";
import Pillars from "../components/Pillars";
import FinalCta from "../components/FinalCta";
import Footer from "../components/Footer";
import ClientBackgroundWrapper from "@/components/ClientBackgroundWrapper";
import dynamic from "next/dynamic";

// Dynamically import heavy components
const DynamicGamePlay = dynamic(() => import("../components/GamePlay"), {
  loading: () => <div className="py-20 md:py-32 bg-black/20 animate-pulse" />,
  ssr: true,
});

const DynamicFeatures = dynamic(() => import("../components/Features"), {
  loading: () => <div className="py-20 md:py-32 bg-black/20 animate-pulse" />,
  ssr: true,
});

export default function HomePage() {
  const heroData = getRandomItem(hero);

  return (
      <ClientBackgroundWrapper backgroundImage="url(/bg2.webp)">
        <Hero heroData={heroData} />
        <Pillars />
        <DynamicFeatures />
        <DynamicGamePlay />
        <FinalCta />
        <Footer />
      </ClientBackgroundWrapper>
  );
}