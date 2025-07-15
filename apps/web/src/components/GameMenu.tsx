"use client";

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { authClient } from '@/lib/auth-client';
import { 
  Sword, 
  ScrollText, 
  Target, 
  TreePine, 
  Trophy, 
  User, 
  Settings, 
  Sun, 
  Moon,
  Zap,
  Shield,
  Star,
  BookOpen
} from 'lucide-react';

// RPG Navigation Routes
const gameRoutes = [
  { 
    path: '/dashboard', 
    icon: Shield, 
    label: 'Sanctum', 
    description: 'Your command center',
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    path: '/dungeons', 
    icon: Sword, 
    label: 'Dungeons', 
    description: 'Code challenges await',
    color: 'from-red-500 to-orange-500'
  },
  { 
    path: '/quests', 
    icon: ScrollText, 
    label: 'Quests', 
    description: 'Your coding journey',
    color: 'from-green-500 to-emerald-500'
  },
  { 
    path: '/skilltree', 
    icon: TreePine, 
    label: 'Skill Tree', 
    description: 'Enhance your abilities',
    color: 'from-purple-500 to-violet-500'
  },
  { 
    path: '/leaderboard', 
    icon: Trophy, 
    label: 'Hall of Honor', 
    description: 'Top architects',
    color: 'from-yellow-500 to-amber-500'
  },
  { 
    path: '/profile', 
    icon: User, 
    label: 'Character', 
    description: 'Your architect profile',
    color: 'from-pink-500 to-rose-500'
  },
];

interface GameMenuProps {
  className?: string;
}

export default function GameMenu({ className = "" }: GameMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { data: session } = authClient.useSession();

  // Mock player stats - replace with real data
  const playerStats = {
    level: 12,
    experience: 2847,
    experienceToNext: 3500,
    className: "Dynamic Mage",
    currentQuest: "Master React Hooks"
  };

  const xpPercentage = (playerStats.experience / playerStats.experienceToNext) * 100;

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      {/* Floating Orb - Main Menu Trigger */}
      <div 
        className={`fixed top-6 right-6 z-50 ${className}`}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {/* Main Orb */}
        <div 
          className={`
            relative w-16 h-16 rounded-full cursor-pointer transition-all duration-500
            bg-gradient-to-br from-[var(--accent)] to-[var(--primary)]
            border-2 border-[var(--accent-foreground)]/20
            shadow-2xl hover:shadow-[var(--accent)]/50
            ${isOpen ? 'scale-110' : 'scale-100'}
          `}
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Pulsing Core */}
          <div className="absolute inset-3 rounded-full bg-gradient-to-br from-white/30 to-transparent animate-pulse" />
          
          {/* Center Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-[var(--accent-foreground)] animate-pulse" />
          </div>

          {/* Magical Particles */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`
                absolute w-1 h-1 bg-[var(--accent-foreground)] rounded-full
                animate-ping opacity-60
              `}
              style={{
                top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 25}px`,
                left: `${20 + Math.cos(i * 60 * Math.PI / 180) * 25}px`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>

        {/* Expanded Radial Menu */}
        <div 
          className={`
            absolute top-0 right-0 transition-all duration-700 ease-out
            ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'}
          `}
        >
          {/* Player Status Bar */}
          <div className="absolute -top-20 -left-64 w-64 bg-[var(--card)] border border-[var(--border)] rounded-lg p-3 shadow-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--primary)] flex items-center justify-center">
                <span className="text-xs font-bold text-[var(--accent-foreground)]">
                  {playerStats.level}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[var(--foreground)]">
                  {session?.user?.name || 'Architect'}
                </p>
                <p className="text-xs text-[var(--muted-foreground)]">
                  {playerStats.className}
                </p>
              </div>
            </div>
            
            {/* XP Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-[var(--muted-foreground)]">
                <span>EXP</span>
                <span>{playerStats.experience}/{playerStats.experienceToNext}</span>
              </div>
              <div className="w-full bg-[var(--muted)] rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${xpPercentage}%` }}
                />
              </div>
            </div>

            {/* Current Quest */}
            <div className="mt-2 text-xs text-[var(--muted-foreground)]">
              <span className="text-[var(--accent)]">Active Quest:</span> {playerStats.currentQuest}
            </div>
          </div>

          {/* Navigation Portals */}
          {gameRoutes.map((route, index) => {
            const angle = (index * 60) - 90; // Start from top, 60° spacing
            const radius = 120;
            const x = Math.cos(angle * Math.PI / 180) * radius;
            const y = Math.sin(angle * Math.PI / 180) * radius;
            
            const isActive = pathname === route.path;
            const isHovered = hoveredRoute === route.path;

            return (
              <div
                key={route.path}
                className={`
                  absolute w-12 h-12 rounded-full cursor-pointer transition-all duration-500
                  border-2 border-[var(--border)]
                  ${isActive 
                    ? 'bg-gradient-to-br from-[var(--accent)] to-[var(--primary)] shadow-lg shadow-[var(--accent)]/50' 
                    : 'bg-[var(--card)] hover:bg-[var(--muted)]'
                  }
                  ${isHovered ? 'scale-125' : 'scale-100'}
                `}
                style={{
                  transform: `translate(${x}px, ${y}px) ${isHovered ? 'scale(1.25)' : 'scale(1)'}`,
                  transitionDelay: `${index * 50}ms`,
                }}
                onClick={() => handleNavigation(route.path)}
                onMouseEnter={() => setHoveredRoute(route.path)}
                onMouseLeave={() => setHoveredRoute(null)}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <route.icon 
                    className={`w-6 h-6 ${
                      isActive ? 'text-[var(--accent-foreground)]' : 'text-[var(--foreground)]'
                    }`} 
                  />
                </div>

                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-[var(--popover)] border border-[var(--border)] rounded-lg px-3 py-2 shadow-xl whitespace-nowrap z-10">
                    <p className="text-sm font-semibold text-[var(--popover-foreground)]">
                      {route.label}
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      {route.description}
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          {/* Theme Toggle Portal - Day/Night Cycle */}
          <div
            className={`
              absolute w-10 h-10 rounded-full cursor-pointer transition-all duration-500
              bg-gradient-to-br ${theme === 'dark' ? 'from-blue-600 to-purple-600' : 'from-yellow-400 to-orange-500'}
              border-2 border-[var(--border)] hover:scale-110
            `}
            style={{
              transform: `translate(0px, 140px)`,
            }}
            onClick={toggleTheme}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {theme === 'dark' ? (
                <Moon className="w-5 h-5 text-white" />
              ) : (
                <Sun className="w-5 h-5 text-white" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
