//themeswitcher.tsx
"use client";

import { useTheme } from 'next-themes';
import { X, Sun, Moon } from 'lucide-react';
import { 
  themes, 
  getThemeFamily, 
  switchTheme, 
  toggleThemeMode, 
  getCurrentTheme,
  initializeTheme,
  subscribeToThemeChanges
} from '@/lib/themes';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useEffect, useState } from 'react';

interface ThemeSwitcherProps {
  isActive: boolean; // Is the theme menu visible?
  onClose: () => void; // Function to tell the parent to go back to 'navigation'
}

export function ThemeSwitcher({ isActive, onClose }: ThemeSwitcherProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentThemeState, setCurrentThemeState] = useState({ theme: 'light', isDark: false });
  
  const angleIncrement = 360 / themes.length;

  // Initialize theme on mount and set up state
  useEffect(() => {
    initializeTheme();
    setCurrentThemeState(getCurrentTheme());
    
    // Subscribe to theme changes
    const unsubscribe = subscribeToThemeChanges(setCurrentThemeState);
    
    return unsubscribe;
  }, []);

  useGSAP(() => {
    // This animation runs whenever 'isActive' changes
    if (!containerRef.current) return;
    
    const themeItems = containerRef.current.querySelectorAll(".theme-item");
    const centralHub = containerRef.current.querySelector(".central-hub-themes");
    const radius = 110;

    // Animate the central close button
    gsap.to(centralHub, {
      scale: isActive ? 1 : 0,
      opacity: isActive ? 1 : 0,
      duration: 0.4,
      ease: 'back.out(1.2)',
    });

    // Animate the theme orbs
    gsap.to(themeItems, {
      x: (i) => isActive ? Math.cos(((i * angleIncrement) - 90) * Math.PI / 180) * radius : 0,
      y: (i) => isActive ? Math.sin(((i * angleIncrement) - 90) * Math.PI / 180) * radius : 0,
      scale: isActive ? 1 : 0,
      opacity: isActive ? 1 : 0,
      duration: 0.6,
      ease: 'back.out(1.4)',
      stagger: 0.05,
    });
  }, { scope: containerRef, dependencies: [isActive] });

  const handleThemeChange = (newTheme: string) => {
    const currentFamily = getThemeFamily(currentThemeState.theme);
    const targetFamily = getThemeFamily(newTheme);
    
    console.log('Current theme:', currentThemeState.theme, 'Current family:', currentFamily);
    console.log('Target theme:', newTheme, 'Target family:', targetFamily);
    console.log('Is dark mode:', currentThemeState.isDark);
    
    if (currentFamily === targetFamily) {
      // Same theme family clicked - toggle light/dark mode within that family
      console.log('Toggling within same family');
      toggleThemeMode();
    } else {
      // Different theme family clicked - switch to that theme
      console.log('Changing theme family to:', newTheme);
      switchTheme(newTheme);
    }
  };  return (
    <div ref={containerRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Central Close Button for Theme Menu */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close Theme Selector"
        className="central-hub-themes absolute opacity-0 pointer-events-auto w-20 h-20 rounded-full bg-card border-2 border-border hover:border-accent transition-colors flex items-center justify-center cursor-pointer"
      >
        <X className="w-9 h-9 text-foreground" />
      </button>

      {/* Theme Family Orbs */}
      {themes.map((themeOption, i) => {
        const currentFamily = getThemeFamily(currentThemeState.theme);
        const isActive = currentFamily === themeOption.family;
        const isDarkMode = currentThemeState.isDark;
        
        // Calculate tooltip position based on circular position
        const angle = (i * angleIncrement) - 90;
        const isBottomHalf = Math.sin(angle * Math.PI / 180) > 0;
        // Top items get tooltips above, bottom items get tooltips below
        const tooltipClass = isBottomHalf ? 'tooltip' : 'tooltip-top';
        
        // Use theme-aware colors when active
        let buttonBg = themeOption.color;
        let iconColor = 'text-white/80';
        let borderStyle = 'border-border hover:border-accent';
        
        if (isActive) {
          // Use CSS variables for active theme to match current theme colors
          buttonBg = 'var(--primary)';
          iconColor = isDarkMode ? 'text-primary-background' : 'text-primary-foreground';
          borderStyle = isDarkMode 
            ? 'border-primary shadow-lg shadow-primary/40' 
            : 'border-primary shadow-lg shadow-primary/40';
        } else {
          // Non-active themes keep their base color but with visual hints for dark mode
          buttonBg = themeOption.color;
          iconColor = 'text-white/80';
          borderStyle = 'border-border hover:border-accent';
        }
        
        return (
          <button
            key={themeOption.name}
            onClick={(e) => {
              e.stopPropagation();
              handleThemeChange(themeOption.name);
            }}
            aria-label={`${themeOption.label} theme - Click again to toggle ${isDarkMode ? 'light' : 'dark'} mode`}
            className={`theme-item group absolute w-20 h-20 rounded-full border-2 pointer-events-auto flex items-center justify-center transition-all duration-200 ${borderStyle} cursor-pointer`}
            style={{ 
              opacity: 0, 
              backgroundColor: isActive ? buttonBg : themeOption.color,
              filter: isActive 
                ? 'none' 
                : `brightness(${isDarkMode ? '0.7' : '1'}) contrast(${isDarkMode ? '1.2' : '1'})`
            }}
          >
            <themeOption.icon 
              size={36} 
              className={`${iconColor} transition-colors duration-200`} 
            />
            <div className={`${tooltipClass} text-foreground`}>
              {themeOption.label} 
              {isActive && (
                <span className="block text-xs opacity-75 mt-1 text-foreground`">
                  {isDarkMode ? '🌙 Dark' : '☀️ Light'} • Click to toggle
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}