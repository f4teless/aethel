"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

import SignInForm from "@/components/SignInForm";
import SignUpForm from "@/components/SignUpForm";
import ClientBackgroundWrapper from "@/components/ClientBackgroundWrapper";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  life: number;
  maxLife: number;
}

const LoginPage = () => {
  const [showSignIn, setShowSignIn] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const cursorAuraRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mountSfxRef = useRef<HTMLAudioElement | null>(null);
  const flipSfxRef = useRef<HTMLAudioElement | null>(null);
  const authContainerRef = useRef<HTMLDivElement>(null);

  // Particle system
  const createParticle = (x: number, y: number): Particle => ({
    x,
    y,
    size: Math.random() * 5 + 2,
    speedX: Math.random() * 3 - 1.5,
    speedY: Math.random() * 3 - 1.5,
    color: `hsla(${Math.random() * 60 + 200}, 100%, 70%, 1)`,
    maxLife: Math.random() * 60 + 30,
    life: Math.random() * 60 + 30,
  });

  const triggerParticles = (count = 30) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    for (let i = 0; i < count; i++) {
      particlesRef.current.push(createParticle(centerX, centerY));
    }
  };

  const animateParticles = () => {
    if (!canvasCtxRef.current || !canvasRef.current) return;
    const ctx = canvasCtxRef.current;
    const canvas = canvasRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particlesRef.current.length - 1; i >= 0; i--) {
      const p = particlesRef.current[i];
      p.x += p.speedX;
      p.y += p.speedY;
      p.life -= 1;
      p.size *= 0.98;

      ctx.fillStyle = p.color.replace("1)", `${p.life / p.maxLife})`);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      if (p.life <= 0) {
        particlesRef.current.splice(i, 1);
      }
    }
    requestAnimationFrame(animateParticles);
  };

  // Entry animations
  const entryEffects = [
    () => {
      if (!authContainerRef.current) return;
      gsap.set(authContainerRef.current, { y: -100, opacity: 0 });
      gsap.to(authContainerRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "back.out(1.7)",
      });
    },
    () => {
      if (!authContainerRef.current) return;
      gsap.set(authContainerRef.current, { scale: 0.7, opacity: 0 });
      gsap.to(authContainerRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "expo.out",
      });
    },
    () => {
      if (!authContainerRef.current) return;
      gsap.set(authContainerRef.current, { rotationX: 90, opacity: 0 });
      gsap.to(authContainerRef.current, {
        rotationX: 0,
        opacity: 1,
        duration: 1,
        transformOrigin: "top center",
        ease: "power2.out",
      });
    },
    () => {
      if (!authContainerRef.current) return;
      gsap.set(authContainerRef.current, { y: 60, opacity: 0 });
      gsap.to(authContainerRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      });
    },
  ];

  const animateFlip = (callback: () => void) => {
    if (reducedMotion) {
      callback();
      return;
    }

    const container = document.querySelector(".auth-card");
    const shimmer = document.querySelector(".flip-aura");
    if (!container) return;

    flipSfxRef.current?.play();
    triggerParticles();

    gsap.to(container, {
      rotateY: 90,
      duration: 0.35,
      ease: "power2.in",
      onStart: () => {
        if (shimmer) {
          gsap.fromTo(
            shimmer,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1.2, duration: 0.3 }
          );
        }
      },
      onComplete: () => {
        callback();
        gsap.fromTo(
          container,
          { rotateY: -90 },
          {
            rotateY: 0,
            duration: 0.35,
            ease: "power2.out",
            onComplete: () => {
              if (shimmer) gsap.to(shimmer, { opacity: 0, duration: 0.3 });
            },
          }
        );
      },
    });
  };

  const switchToSignIn = () => {
    animateFlip(() => setShowSignIn(true));
  };

  const switchToSignUp = () => {
    animateFlip(() => setShowSignIn(false));
  };

  const onMouseMove = (e: MouseEvent) => {
    if (cursorAuraRef.current) {
      gsap.to(cursorAuraRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);
    const motionListener = () => setReducedMotion(motionQuery.matches);
    motionQuery.addEventListener("change", motionListener);

    // Initialize audio
    mountSfxRef.current = new Audio("/music/retro-game-notification.wav");
    flipSfxRef.current = new Audio("/music/fast-sweep-transition.wav");
    if (mountSfxRef.current) mountSfxRef.current.volume = 0.3;
    if (flipSfxRef.current) flipSfxRef.current.volume = 0.4;

    // Play entry sound
    mountSfxRef.current
      ?.play()
      .catch((e) => console.error("Audio play failed:", e));

    // Initialize cursor aura
    window.addEventListener("mousemove", onMouseMove);

    // Initialize particles
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext("2d");
      if (canvasCtxRef.current && canvasRef.current) {
        canvasRef.current.width = canvasRef.current.offsetWidth;
        canvasRef.current.height = canvasRef.current.offsetHeight;
        animateParticles();
      }
    }

    // Run random entry animation
    if (!reducedMotion && authContainerRef.current) {
      const fx = entryEffects[Math.floor(Math.random() * entryEffects.length)];
      fx();
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      motionQuery.removeEventListener("change", motionListener);
    };
  }, [reducedMotion]);

  return (
    <ClientBackgroundWrapper
      backgroundImage={showSignIn ? "url(/bg4.webp)" : "url(/bg1.webp)"}
    >
      <link rel="preload" as="image" href="/bg4.webp" />
      <link rel="preload" as="image" href="/bg1.webp" />
      <div className="min-h-screen relative text-white transition-all duration-500 overflow-hidden">
        <div ref={cursorAuraRef} id="cursor-aura" />
        <div className="flip-aura pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,rgba(180,210,255,0.15),transparent_60%)] opacity-0" />

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
          <div
            ref={authContainerRef}
            className="auth-container text-center relative"
          >
            <div className="absolute inset-0 pointer-events-none z-[-1] flex justify-center items-center">
              <canvas ref={canvasRef} className="w-[500px] h-[500px]" />
            </div>

            {showSignIn ? (
              <>
                <h1 className="text-4xl font-cinzel font-bold drop-shadow">
                  Welcome Back, Seeker
                </h1>
                <p className="text-lg font-cormorant italic text-white/80 mt-2 mb-6">
                  The CodeRealm stirs. Your glyph is recognized.
                </p>
              </>
            ) : (
              <>
                <h1 className="text-4xl font-cinzel font-bold drop-shadow">
                  Forge Your Fate
                </h1>
                <p className="text-lg font-cormorant italic text-white/80 mt-2 mb-6">
                  Bind your soul to a new Architect's Sigil.
                </p>
              </>
            )}

            <div className="perspective">
              <div className="auth-card w-full max-w-md relative">
                {showSignIn ? (
                  <SignInForm onSwitchToSignUp={() => setShowSignIn(false)} />
                ) : (
                  <SignUpForm onSwitchToSignIn={() => setShowSignIn(true)} />
                )}
              </div>
            </div>

            <div className="mt-4">
              {showSignIn ? (
                <button
                  type="button"
                  className="text-white/70 hover:text-white underline text-sm cursor-pointer"
                  onClick={() => setShowSignIn(false)}
                >
                  No identity yet? Begin Your Journey
                </button>
              ) : (
                <button
                  type="button"
                  className="text-white/70 hover:text-white underline text-sm cursor-pointer"
                  onClick={() => setShowSignIn(true)}
                >
                  Already sworn an oath? Return to Sign In
                </button>
              )}
            </div>
          </div>
        </div>

        <style jsx>{`
          .perspective {
            perspective: 1200px;
          }
          .auth-card {
            transform-style: preserve-3d;
          }
          #cursor-aura {
            position: fixed;
            top: 0;
            left: 0;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: radial-gradient(
              circle,
              rgba(100, 150, 255, 0.4) 0%,
              rgba(100, 150, 255, 0) 60%
            );
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
          }
        `}</style>
      </div>
    </ClientBackgroundWrapper>
  );
};

export default LoginPage;
