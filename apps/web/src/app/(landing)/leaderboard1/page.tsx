"use client";

import { useState, useEffect } from "react";
import { leaderboardImages, getRandomItem } from "@/lib/constants";
import LeaderboardClient from "@/components/LeaderboardClient";
import ClientBackgroundWrapper from "@/components/ClientBackgroundWrapper";

// Helper functions for deterministic server-side generation
const nameParts1 = ['Void', 'Syntax', 'Hex', 'Data', 'Null', 'Quantum', 'Glitch', 'Recursia', 'Binary', 'Vector', 'Chrono', 'Cipher', 'Byte'];
const nameParts2 = ['Walker', 'Scribe', 'Mancer', 'Shift', 'Runner', 'Heart', 'Blade', 'Forge', 'Savant', 'Weaver', 'Storm', 'Wraith', 'Mind'];
const classes = ['Array Knight', 'Dynamic Mage', 'Graph Assassin', 'Greedy Ronin', 'Bit Sage'];
const classEnum = {
  'array-knight': 'Array Knight',
  'dynamic-mage': 'Dynamic Mage',
  'graph-assassin': 'Graph Assassin',
  'greedy-ronin': 'Greedy Ronin',
  'bit-sage': 'Bit Sage',
};

function seededRandom(seed: number) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateName(seed: number) {
  const i = Math.floor(seededRandom(seed) * nameParts1.length);
  const j = Math.floor(seededRandom(seed + 1) * nameParts2.length);
  return nameParts1[i] + nameParts2[j];
}

function generateRandomClass(seed: number) {
  const idx = Math.floor(seededRandom(seed + 2) * classes.length);
  return classes[idx];
}

function generateLeaderboard(count: number, scoreFn: (i: number) => number, classType: 'Varies' | string, offset: number = 0) {
  return Array.from({ length: count }, (_, i) => ({
    name: generateName(i + offset),
    class: classType === 'Varies' ? generateRandomClass(i + offset) : classType,
    score: scoreFn(i),
  }));
}

const leaderboards = {
  pvp: generateLeaderboard(120, i => 3200 - i * 15 - Math.floor(seededRandom(i) * 10), 'Varies'),
  class: {
    'array-knight': generateLeaderboard(75, i => 820 - i * 9 - Math.floor(seededRandom(i) * 5), 'Array Knight', 1000),
    'dynamic-mage': generateLeaderboard(55, i => 850 - i * 10 - Math.floor(seededRandom(i) * 5), 'Dynamic Mage', 2000),
    'graph-assassin': generateLeaderboard(60, i => 840 - i * 11 - Math.floor(seededRandom(i) * 5), 'Graph Assassin', 3000),
    'greedy-ronin': generateLeaderboard(68, i => 810 - i * 8 - Math.floor(seededRandom(i) * 5), 'Greedy Ronin', 4000),
    'bit-sage': generateLeaderboard(45, i => 880 - i * 12 - Math.floor(seededRandom(i) * 5), 'Bit Sage', 5000),
  }
};


export default function LeaderboardPage() {
  const [randomBg, setRandomBg] = useState(leaderboardImages[0]); // Use first image as default

  useEffect(() => {
    // Set random background after mount to avoid hydration mismatch
    setRandomBg(getRandomItem(leaderboardImages));
  }, []);

  return (
      <ClientBackgroundWrapper backgroundImage={`url(${randomBg})`}>
        <link rel="preload" as="image" href={randomBg} />
        <LeaderboardClient leaderboards={leaderboards} />
      </ClientBackgroundWrapper>
  );
} 