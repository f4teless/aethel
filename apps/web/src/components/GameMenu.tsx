//game-menu.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { BookOpen, Sword, ScrollText, Trophy, User, Shield, Zap, Palette } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ThemeSwitcher } from './ThemeSwitcher';

const gameRoutes = [
  { path: '/dashboard', icon: Shield, label: 'Sanctum', description: 'Your command center' },
  { path: '/dungeons', icon: Sword, label: 'Dungeons', description: 'Code challenges await' },
  { path: '/pvp', icon: ScrollText, label: 'PvP Arena', description: 'Battle other architects' },
  { path: '/leaderboard', icon: Trophy, label: 'Hall of Honor', description: 'Top architects' },
  { path: '/profile', icon: User, label: 'Character', description: 'Your architect profile' },
  { path: '/community', icon: BookOpen, label: 'Community', description: 'Connect with architects' },
];

export default function GameMenu({ className = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuState, setMenuState] = useState<'navigation' | 'themes'>('navigation');
  
  const router = useRouter();
  const pathname = usePathname();
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: menuContainerRef });

  const angleIncrement = 360 / gameRoutes.length;

  useGSAP(() => {
    const navItems = menuContainerRef.current?.querySelectorAll('.nav-item');
    const centralHub = menuContainerRef.current?.querySelector('.central-hub-nav');
    const backdrop = menuContainerRef.current?.querySelector('.backdrop');

    const navVisible = isOpen && menuState === 'navigation';
    const radius = 110;
    
    // Reset container opacity when menu opens
    if (menuContainerRef.current) {
      gsap.set(menuContainerRef.current, { opacity: 1 });
    }
    
    // Animate Navigation Orbs
    if (navItems) {
      gsap.to(navItems, {
        x: (i) => navVisible ? Math.cos(((i * angleIncrement) - 90) * Math.PI / 180) * radius : 0,
        y: (i) => navVisible ? Math.sin(((i * angleIncrement) - 90) * Math.PI / 180) * radius : 0,
        scale: navVisible ? 1 : 0,
        opacity: navVisible ? 1 : 0,
        duration: 0.6,
        ease: 'back.out(1.4)',
        stagger: 0.05,
        overwrite: 'auto',
      });
    }
    
    // Animate Central Hub (The Palette Button)
    if (centralHub) {
      gsap.to(centralHub, { 
        scale: navVisible ? 1 : 0, 
        opacity: navVisible ? 1 : 0,
        duration: 0.4,
        ease: 'back.out(1.2)',
      });
    }
    
    // Animate Backdrop with better state management
    if (backdrop) {
      gsap.to(backdrop, { 
        opacity: isOpen ? 1 : 0, 
        pointerEvents: isOpen ? 'auto' : 'none',
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto', // Ensure previous animations are cancelled
      });
    }

  }, { dependencies: [isOpen, menuState] });

  // Reset state to navigation when the menu is closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setMenuState('navigation'), 300); // Delay to allow animations to finish
    }
  }, [isOpen]);

  // Reset menu state when navigating to a new page
  useEffect(() => {
    setIsOpen(false);
    setMenuState('navigation');
  }, [pathname]);
  
  const handleNavigation = contextSafe((path: string) => {
    if (pathname === path) { setIsOpen(false); return; }
    setIsOpen(false); // Close the menu first to trigger backdrop animation
    gsap.to(menuContainerRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => router.push(path)
    });
  });

  const toggleMenu = contextSafe(() => { setIsOpen(prev => !prev); });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') { e.preventDefault(); toggleMenu(); }
      if (e.key === 'Escape' && isOpen) { setIsOpen(false); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, toggleMenu]);

  return (
    <>
      <button
        aria-label="Open Game Menu"
        onClick={toggleMenu}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full cursor-pointer transition-transform duration-300
          bg-gradient-to-br from-accent to-primary
          border-2 border-white/10 shadow-2xl hover:shadow-accent/50
          hover:scale-110 active:scale-100 ${className}`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <BookOpen className="w-7 h-7 text-white" />
        </div>
      </button>
      
      {!isOpen && (
        <div className="fixed bottom-24 right-6 z-30 pointer-events-none">
          <div className="bg-card border border-border rounded-lg px-2 py-1 shadow-lg animate-pulse">
            <p className="text-xs text-muted-foreground">
              <kbd className="px-1.5 py-0.5  rounded text-xs">Ctrl+K</kbd>
            </p>
          </div>
        </div>
      )}

      <div ref={menuContainerRef} className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        {/* Backdrop - moved inside the scoped container */}
        <div 
          className="backdrop absolute inset-0 bg-black/60 opacity-0 pointer-events-none" 
          onClick={() => setIsOpen(false)}
          style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
        />
        
        {/* State 1: Navigation Menu */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={(e) => { e.stopPropagation(); setMenuState('themes'); }}
            aria-label="Open Theme Selector"
            className="central-hub-nav absolute w-20 h-20 rounded-full bg-card border-2 border-border hover:border-accent transition-colors pointer-events-auto flex items-center justify-center" style={{ opacity: 0 }}
          >
            <Palette className="w-9 h-9 text-foreground cursor-pointer" />
          </button>
          
          {gameRoutes.map((route, i) => {
            const isActive = pathname === route.path;
            const angle = (i * angleIncrement) - 90;
            const isBottomHalf = Math.sin(angle * Math.PI / 180) > 0;
            // Top items get tooltips above, bottom items get tooltips below
            const tooltipClass = isBottomHalf ? 'tooltip' : 'tooltip-top';
            
            return (
              <button
                key={route.path}
                onClick={() => handleNavigation(route.path)}
                aria-label={route.label}
                className={`nav-item group absolute w-20 h-20 rounded-full cursor-pointer border-2 transition-colors duration-200 pointer-events-auto hover:!opacity-100 group-hover:z-10 ${isActive ? 'bg-gradient-to-br from-accent to-primary border-transparent shadow-lg shadow-accent/40' : 'bg-card border-border hover:bg-muted hover:border-accent'}`}
                style={{ opacity: 0 }}
              >
                <div className="flex items-center justify-center h-full">
                  <route.icon className={`w-9 h-9 transition-colors ${isActive ? 'text-accent-foreground' : 'text-foreground group-hover:text-accent-foreground'}`} />
                </div>
                <div className={`${tooltipClass} text-foreground`}>{route.label}</div>
              </button>
            )
          })}
        </div>

        {/* State 2: Theme Switcher Menu */}
        <ThemeSwitcher 
          isActive={isOpen && menuState === 'themes'}
          onClose={() => setMenuState('navigation')} 
        />
      </div>
    </>
  );
}