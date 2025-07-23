"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { UIProvider } from "./uiStore";
import { ThemeProvider } from "./theme-provider";
import { useThemeInit } from "../hooks/useThemeInit";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  
  // Initialize our custom theme system
  useThemeInit();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        themes={[
          'light', 
          'dark', 
          'system', 
          'amethyst-haze', 
          'amethyst-haze.dark',
          'catppuccin', 
          'catppuccin.dark',
          'perpetuity', 
          'perpetuity.dark',
          'bubblegum', 
          'bubblegum.dark',
          'mono', 
          'mono.dark'
        ]}
      >
          <UIProvider>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </UIProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
