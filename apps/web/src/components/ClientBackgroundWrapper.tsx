"use client";

import { useEffect } from "react";
import { useUIStore } from "../lib/uiStore";

interface ClientBackgroundWrapperProps {
  children: React.ReactNode;
  backgroundImage?: string;
}

const ClientBackgroundWrapper = ({ children, backgroundImage }: ClientBackgroundWrapperProps) => {
  const { setBackgroundImage } = useUIStore();

  useEffect(() => {
    if (backgroundImage) {
      setBackgroundImage(backgroundImage);
    }
  }, [setBackgroundImage, backgroundImage]);

  return <div>{children}</div>;
};

export default ClientBackgroundWrapper; 