"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { UIProvider } from "../lib/uiStore";
import { ThemeProvider } from "../components/theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <UIProvider>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </UIProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
