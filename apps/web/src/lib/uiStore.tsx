"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface UIStore {
  backgroundImage: string;
  setBackgroundImage: (image: string) => void;
}

const UIContext = createContext<UIStore | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [backgroundImage, setBackgroundImage] = useState("url(/bg2.webp)");

  return (
    <UIContext.Provider value={{ backgroundImage, setBackgroundImage }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUIStore() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUIStore must be used within a UIProvider");
  }
  return context;
} 