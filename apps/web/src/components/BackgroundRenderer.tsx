"use client";

import { useUIStore } from "../lib/uiStore";

const BackgroundRenderer = () => {
  const { backgroundImage } = useUIStore();

  return (
    <>
      {/* Background fixed wallpaper */}
      <div
        className="fixed top-0 left-0 w-screen h-screen bg-cover bg-center -z-10 transition-all duration-700"
        style={{ backgroundImage }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      </div>
    </>
  );
};

export default BackgroundRenderer; 