"use client";

import { usePathname } from 'next/navigation';
import GameMenu from './GameMenu';
import { ReactNode, useEffect, useState } from 'react';

interface GameLayoutProps {
  children: ReactNode;
}

interface Particle {
  id: number;
  left: string;
  top: string;
  animationDelay: string;
  animationDuration: string;
}

interface GameLayoutProps {
  children: ReactNode;
}

// Routes that should have the game interface
const gameRoutes = [
  '/dashboard',
  '/dungeons', 
  '/pvp',
  '/quests',
  '/skilltree',
  '/leaderboard',
  '/profile',
  '/community'
];

export default function GameLayout({ children }: GameLayoutProps) {
  const pathname = usePathname();
  const [particles, setParticles] = useState<Particle[]>([]);
  
  // Check if current route should have game interface
  const isGameRoute = gameRoutes.some(route => pathname.startsWith(route));

  // Generate particles on the client side only to avoid hydration mismatch
  useEffect(() => {
    const generatedParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${2 + Math.random() * 3}s`,
    }));
    setParticles(generatedParticles);
  }, []);
  
  if (!isGameRoute) {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-screen bg-[var(--background)]">
      {/* Game Interface Overlay */}
      <GameMenu />
      
      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>
      
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Floating Particles - Client-side only */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-[var(--accent)]/30 rounded-full animate-ping"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.animationDelay,
              animationDuration: particle.animationDuration,
            }}
          />
        ))}
        
        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(var(--accent) 1px, transparent 1px),
              linear-gradient(90deg, var(--accent) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>
    </div>
  );
}
