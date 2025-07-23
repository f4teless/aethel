"use client";

import { useEffect } from 'react';
import { initializeTheme } from '@/lib/themes';

export const useThemeInit = () => {
  useEffect(() => {
    initializeTheme();
  }, []);
};
