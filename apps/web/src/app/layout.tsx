import "./globals.css";
import Providers from "./providers";
import Header from "../components/Header";
import ClientBackgroundWrapper from "../components/ClientBackgroundWrapper";
import BackgroundRenderer from "../components/BackgroundRenderer";
import { 
  cinzel, 
  manrope, 
  cormorant, 
  ebGaramond, 
  medievalSharp, 
  imFellEnglishSC 
} from "../lib/fonts";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ReactLenis } from "lenis/react";

export const metadata: Metadata = {
  title: {
    default: "Aethel - A Realm on the Brink of Collapse",
    template: "%s | Aethel"
  },
  description: "A world once governed by logic... now broken. Only the Architects can restore the logic and prevent the final SIGTERM.",
  keywords: ["coding game", "algorithm challenges", "fantasy RPG", "programming", "competitive coding"],
  authors: [{ name: "Lost from Light" }],
  creator: "Lost from Light",
  publisher: "Aethel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://aethel.quest'), // Replace with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Aethel - A Realm on the Brink of Collapse",
    description: "A world once governed by logic... now broken. Only the Architects can restore the logic.",
    url: 'https://aethel.quest',
    siteName: 'Aethel',
    images: [
      {
        url: '/feature-classes.webp',
        width: 1200,
        height: 630,
        alt: 'Aethel - CodeRealm',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Aethel - A Realm on the Brink of Collapse",
    description: "A world once governed by logic... now broken. Only the Architects can restore the logic.",
    images: ['/feature-classes.webp'],
    creator: '@playaethel',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis root>
    <html 
      lang="en" 
      className={`
        ${cinzel.variable} 
        ${manrope.variable} 
        ${cormorant.variable} 
        ${ebGaramond.variable} 
        ${medievalSharp.variable} 
        ${imFellEnglishSC.variable}
      `}
      
    >
      <head>
        <link
        rel="preload"
        href="/bg2.webp"
        as="image"
        type="image/webp"
        fetchPriority="high"
        />
      </head>
      <body>
        <Providers>
           <ClientBackgroundWrapper backgroundImage="url(/bg2.webp)">
            <BackgroundRenderer />
            <div className="grid h-svh grid-rows-[auto_1fr] relative z-10">
              <Header />
              <Suspense fallback={
                <main className="flex items-center justify-center">
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
        </Providers>
      </body>
    </html>
    // </ReactLenis>
  );
}