"use client";

import { useState, useEffect } from "react";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import PlatformDemo from "@/components/landing/PlatformDemo";
import Features from "@/components/landing/Features";
import Testimonials from "@/components/landing/Testimonials";
import FinalCta from "@/components/landing/FinalCta";
import Hero from "@/components/landing/Hero";
import { getRandomItem } from "@/lib/constants";
import { hero } from "@/components/landing/landing";

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);


  const [heroData, setHeroData] = useState(() => hero[0]);

  useEffect(() => {
    setHeroData(getRandomItem(hero));
  }, []);

    return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div
        className="fixed inset-0 opacity-20 duration-700 ease-out"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, var(--primary), transparent 40%)`,
          mixBlendMode: "hard-light"
        }}
      />

      <div>
        <Hero heroData={heroData} isLoaded={isLoaded} />

        <Features />

        <PlatformDemo />

        <Testimonials />

        <FinalCta />
      </div>

      <Footer />
    </div>
    );
}
