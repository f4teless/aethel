"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { providers } from "@/app/login/providers";
import React from "react";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isLoading) return; 

    gsap.set(".nexus-core", { scale: 0.5, opacity: 0 });
    gsap.set(".nexus-header", { y: -30, opacity: 0 });
    gsap.set(".provider-button", { y: 20, opacity: 0 });
    gsap.set(".nexus-footer a", { y: 10, opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(".nexus-core", {
      scale: 1,
      opacity: 1,
      duration: 0.8,
    })
      .to(".nexus-header", {
        y: 0,
        opacity: 1,
        duration: 0.6,
      }, "-=0.5")
      .to(".provider-button", {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.07,
      }, "-=0.4")
      .to(".nexus-footer a", {
        y: 0,
        opacity: 1,
        duration: 0.4,
      }, ">-0.2");

  }, { scope: containerRef, dependencies: [isLoading] });


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authClient.getSession();
        if (session?.data?.session) {
          router.replace('/dashboard');
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.log('No active session found');
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground text-sm">Verifying Sigil...</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 bg-primary/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="nexus-header text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-cinzel font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Authenticate Sigil
          </h1>
          <p className="text-muted-foreground font-cormorant italic text-lg mt-2">
            Choose your glyph to enter the CodeRealm.
          </p>
        </div>

        <ScrollArea className="nexus-core bg-card/60 backdrop-blur-xl shadow-2xl shadow-primary/5 p-6 space-y-4 h-80 w-full rounded-md border border-[var(--border)]" data-lenis-prevent>

          <div className="space-y-3">
            {providers.map((provider, idx) => (
              <React.Fragment key={provider.key}>
                <Button
                  variant="outline"
                  onClick={provider.onClick}
                  className={`
                        w-full text-sm border-[var(--border)] hover:border-[var(--primary)] 
                        bg-[var(--background)]/50 hover:bg-[var(--muted)]/80 
                        transition-all duration-300 h-10 mb-3 relative overflow-hidden
                        group/button backdrop-blur-sm provider-button opacity-0 translate-y-5 cursor-pointer
                        ${provider.className}
                      `}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/5 to-[var(--accent)]/5 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center gap-3">
                    {provider.icon}
                    {provider.label}
                  </span>
                </Button>
                {idx !== providers.length - 1 && (
                  <Separator className="my-2 bg-[var(--border)]/30" />
                )}
              </React.Fragment>
            ))}
          </div>


        </ScrollArea>

        <div className="nexus-footer text-center mt-6">
          <a href="/" className="group inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
            Return to the Realm Gates
          </a>
        </div>
      </div>
    </div>
  );
}