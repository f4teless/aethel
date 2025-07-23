import Header from "@/components/landing/old/OldHeader";
import ClientBackgroundWrapper from "@/components/old/ClientBackgroundWrapper";
import BackgroundRenderer from "@/components/old/BackgroundRenderer";
import { Suspense } from "react";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientBackgroundWrapper backgroundImage="url(/bg2.webp)">
      <BackgroundRenderer />
      <div className="relative z-10">
        <Header />
        <Suspense fallback={
          <main className="flex items-center justify-center min-h-screen">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto"></div>
              <p className="mt-4 font-cinzel">Loading the CodeRealm...</p>
            </div>
          </main>
        }>
          <main>{children}</main>
        </Suspense>
      </div>
    </ClientBackgroundWrapper>
  );
}