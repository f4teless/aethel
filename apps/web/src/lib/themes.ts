//themes.ts
import { Palette, Sun, Moon, Sparkles, Shield, Zap, Monitor, Bot, Sprout, Flame } from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

export interface ThemeOption {
  name: string;      // The class name to apply (e.g., 'default', 'amethyst-haze')
  label: string;     // The display name (e.g., 'Compiler', 'Amethyst')
  icon: LucideIcon;
  color: string;     // A representative color for UI feedback
  family: string;    // The theme family name (without light/dark suffix)
}

export const themes: ThemeOption[] = [
  { name: 'light', family: 'default', label: 'Default', icon: Monitor, color: '#737373' },
  { name: 'amethyst-haze', family: 'amethyst-haze', label: 'Amethyst', icon: Sparkles, color: '#8b5cf6' },
  { name: 'catppuccin', family: 'catppuccin', label: 'Catppuccin', icon: Palette, color: '#8839ef' },
  { name: 'perpetuity', family: 'perpetuity', label: 'Perpetuity', icon: Zap, color: '#06858e' },
  { name: 'bubblegum', family: 'bubblegum', label: 'Bubblegum', icon: Flame, color: '#d04f99' },
  { name: 'mono', family: 'mono', label: 'Mono', icon: Bot, color: '#737373' },
];

// Theme state management
let currentTheme = 'light';
let isDarkMode = false;
let themeListeners: Array<(theme: { theme: string; isDark: boolean }) => void> = [];

// Subscribe to theme changes
export const subscribeToThemeChanges = (callback: (theme: { theme: string; isDark: boolean }) => void) => {
  themeListeners.push(callback);
  return () => {
    themeListeners = themeListeners.filter(listener => listener !== callback);
  };
};

// Notify listeners of theme changes
const notifyThemeChange = () => {
  const themeState = { theme: currentTheme, isDark: isDarkMode };
  themeListeners.forEach(listener => listener(themeState));
};

// Initialize theme from localStorage or default
export const initializeTheme = () => {
  if (typeof window === 'undefined') return;
  
  const savedTheme = localStorage.getItem('theme') || 'light';
  const savedIsDark = localStorage.getItem('isDarkMode') === 'true';
  
  currentTheme = savedTheme;
  isDarkMode = savedIsDark;
  
  applyTheme(currentTheme, isDarkMode);
};

// Apply theme directly to DOM
export const applyTheme = (themeName: string, dark: boolean = false) => {
  if (typeof window === 'undefined') return;
  
  const family = getThemeFamily(themeName);
  let themeClassName = '';
  
  if (family === 'default') {
    themeClassName = dark ? 'dark' : 'light';
  } else {
    // For custom themes, apply both theme and dark class when needed
    // CSS uses .theme-name.dark which means both classes must be present
    themeClassName = dark ? `${themeName} dark` : themeName;
  }
  
  // Preserve existing classes (especially font variables) and only replace theme-related classes
  const currentClasses = document.documentElement.className;
  const classArray = currentClasses.split(' ');
  
  // Remove any existing theme-related classes
  const filteredClasses = classArray.filter(cls => 
    !cls.startsWith('--font-') && // Keep font variable classes
    cls !== 'light' && 
    cls !== 'dark' && 
    cls !== 'amethyst-haze' && 
    cls !== 'catppuccin' && 
    cls !== 'perpetuity' && 
    cls !== 'bubblegum' && 
    cls !== 'mono'
  );
  
  // Add the new theme classes
  const newClassName = [...filteredClasses, ...themeClassName.split(' ')].join(' ');
  
  console.log('Applying theme - family:', family, 'themeName:', themeName, 'dark:', dark);
  console.log('Previous classes:', currentClasses);
  console.log('New classes:', newClassName);
  
  document.documentElement.className = newClassName;
  
  // Save to localStorage
  localStorage.setItem('theme', themeName);
  localStorage.setItem('isDarkMode', dark.toString());
  
  currentTheme = themeName;
  isDarkMode = dark;
  
  // Notify listeners
  notifyThemeChange();
};

// Get current theme state
export const getCurrentTheme = () => ({ theme: currentTheme, isDark: isDarkMode });

// Helper function to get the current theme family
export const getThemeFamily = (themeName: string): string => {
  console.log('Getting theme family for:', themeName);
  
  // For system default themes
  if (themeName === 'light' || themeName === 'dark' || themeName === 'system') {
    return 'default';
  }
  
  // For custom themes, extract family name (remove .dark if present)
  const baseName = themeName.replace('.dark', '');
  console.log('Base name after removing .dark:', baseName);
  
  const theme = themes.find(t => t.name === baseName);
  const family = theme?.family || 'default';
  console.log('Found theme family:', family);
  
  return family;
};

// Switch to a specific theme
export const switchTheme = (themeName: string) => {
  console.log('Switching to theme:', themeName);
  const family = getThemeFamily(themeName);
  const currentFamily = getThemeFamily(currentTheme);
  
  // When switching theme families, preserve dark mode preference
  if (family !== currentFamily) {
    console.log('Different theme family - preserving dark mode:', isDarkMode);
    applyTheme(themeName, isDarkMode);
  } else {
    // Same family - this shouldn't happen as toggleThemeMode should be called instead
    console.log('Same theme family - applying without change');
    applyTheme(themeName, isDarkMode);
  }
};

// Toggle between light and dark mode for current theme
export const toggleThemeMode = () => {
  console.log('Toggling theme mode. Current:', { currentTheme, isDarkMode });
  const newDarkMode = !isDarkMode;
  applyTheme(currentTheme, newDarkMode);
};

// Helper function for backward compatibility with next-themes
export const toggleThemeModeCompat = (currentTheme: string, resolvedTheme: string): string => {
  console.log('Compat toggle input - currentTheme:', currentTheme, 'resolvedTheme:', resolvedTheme);
  
  const family = getThemeFamily(currentTheme);
  console.log('Theme family:', family);
  
  if (family === 'default') {
    // For default theme, toggle between 'light' and 'dark'
    const result = resolvedTheme === 'dark' ? 'light' : 'dark';
    console.log('Default theme toggle result:', result);
    return result;
  } else {
    // For custom themes, toggle .dark class modifier
    const baseTheme = themes.find(t => t.family === family)?.name;
    console.log('Base theme for family:', baseTheme);
    
    if (!baseTheme) return currentTheme;
    
    if (resolvedTheme === 'dark') {
      console.log('Switching to light variant:', baseTheme);
      return baseTheme; // Switch to light variant (remove .dark)
    } else {
      const darkVariant = `${baseTheme}.dark`;
      console.log('Switching to dark variant:', darkVariant);
      return darkVariant; // Switch to dark variant (add .dark)
    }
  }
};