"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { UIProvider } from "../lib/uiStore";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <UIProvider>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
      </UIProvider>
    </QueryClientProvider>
  );
}
