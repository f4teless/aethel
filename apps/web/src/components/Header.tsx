"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { usePerformanceMonitor } from "@/hooks/usePerformance";
import { getAvatarUrl } from "@/lib/avatar";
import { authClient } from "@/lib/auth-client"
import router from "next/router";

const Header = () => {
  usePerformanceMonitor("Header");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch //refetch the session
  } = authClient.useSession()


  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const transparent = !scrolled && !mobileMenuOpen;

  return (
    <div
      className={`fixed w-full z-50 transition-all duration-300 ${transparent
          ? "bg-transparent"
          : "bg-slate-900/90 backdrop-blur-lg shadow-xl border-b border-white/10"
        }`}
    >
      <header className="px-6 md:px-12 py-4 flex justify-between items-center font-cinzel uppercase tracking-wider text-white text-sm">
        <Link
          href="/"
          className="text-2xl md:text-3xl font-bold tracking-widest text-white drop-shadow-md hover:scale-105 transition-all duration-300 hover:text-blue-300"
        >
          Aethel<span className="text-slate-400">.</span>
        </Link>

        <nav className="flex items-center space-x-8 hidden md:flex text-slate-300 font-semibold">
          <Link
            href="/lore"
            className={`hover:text-white transition-all duration-300 border-b-2 border-transparent hover:border-blue-400 pb-1 ${pathname === "/lore" ? "text-white border-blue-400" : ""
              }`}
          >
            Lore
          </Link>
          <Link
            href="/community"
            className={`hover:text-white transition-all duration-300 border-b-2 border-transparent hover:border-purple-400 pb-1 ${pathname === "/community" ? "text-white border-purple-400" : ""
              }`}
          >
            Community
          </Link>
          <Link
            href="/pvp"
            className={`hover:text-white transition-all duration-300 border-b-2 border-transparent hover:border-red-400 pb-1 ${pathname === "/pvp" ? "text-white border-red-400" : ""
              }`}
          >
            PVP
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            {!mounted || isPending ? (
              // Render login button during SSR and loading to match initial server state
              <Link
                href="/login"
                className="px-6 py-2.5 font-ebg shadow-md bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white rounded-lg transition-all duration-300 hover:from-blue-600/40 hover:to-purple-600/40 hover:shadow-xl border border-white/20 backdrop-blur-sm hover:scale-105"
              >
                Log In
              </Link>
            ) : session ? (
              <Link href="/profile" className="flex items-center space-x-3 group px-4 py-2 rounded-lg border border-white/20 bg-gradient-to-r from-slate-800/50 to-slate-700/50 hover:from-slate-700/70 hover:to-slate-600/70 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                <Image
                  src={"/bg2.webp"}
                  alt="User Avatar"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-slate-500 group-hover:border-white transition-colors"
                />
                <div className="flex flex-col">
                  <span className="font-ebg normal-case group-hover:text-white text-slate-300 transition-colors text-sm font-medium">
                    {session?.user.name || session?.user.email?.split('@')[0]}
                  </span>
                  <span className="font-ebg normal-case text-slate-400 text-xs">
                    Profile
                  </span>
                </div>
                <div className="text-slate-400 group-hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ) : (
              <Link
                href="/login"
                className="px-6 py-2.5 font-ebg shadow-md bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white rounded-lg transition-all duration-300 hover:from-blue-600/40 hover:to-purple-600/40 hover:shadow-xl border border-white/20 backdrop-blur-sm hover:scale-105"
              >
                Log In
              </Link>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden z-30 p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle navigation menu"
          >
            <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}></div>
            <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`}></div>
            <div className={`w-6 h-0.5 bg-white mt-1.5 transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></div>
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-lg flex flex-col items-center space-y-6 py-8 shadow-2xl border-b border-white/10">
          <Link
            href="/"
            className="text-slate-300 hover:text-white text-xl transition-colors hover:scale-105 transform"
          >
            Start
          </Link>
          <Link
            href="/lore"
            className="text-slate-300 hover:text-blue-400 text-xl transition-colors hover:scale-105 transform"
          >
            Lore
          </Link>
          <Link
            href="/community"
            className="text-slate-300 hover:text-purple-400 text-xl transition-colors hover:scale-105 transform"
          >
            Community
          </Link>
          <Link
            href="/pvp"
            className="text-slate-300 hover:text-red-400 text-xl transition-colors hover:scale-105 transform"
          >
            PVP
          </Link>
          <hr className="w-3/4 border-slate-700" />
          {!mounted || isPending ? (
            // Render login button during SSR and loading to match initial server state
            <Link
              href="/login"
              className="bg-gradient-to-r from-blue-600/80 to-purple-600/80 hover:from-blue-600 hover:to-purple-600 px-8 py-2 rounded-lg text-lg transition-all duration-300"
            >
              Log In
            </Link>
          ) : session ? (
            <>
              <Link
                href="/profile"
                className="flex items-center space-x-3 text-white text-xl hover:text-blue-300 transition-colors bg-slate-800/50 px-6 py-3 rounded-lg border border-white/20"
              >
                <Image
                  src={"/favicon/apple-touch-icon.png"}
                  alt="session Avatar"
                  width={28}
                  height={28}
                  className="rounded-full border-2 border-slate-500"
                />
                <span>{session?.user.name || "User"}'s Profile</span>
              </Link>
              <button
                onClick={async () => {
                  await authClient.signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        router.push("/login"); // redirect to login page
                      },
                    },
                  });
                }}
                className="bg-red-600/80 hover:bg-red-600 px-6 py-2 rounded-lg text-lg transition-colors"
              >
                Log Out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-gradient-to-r from-blue-600/80 to-purple-600/80 hover:from-blue-600 hover:to-purple-600 px-8 py-2 rounded-lg text-lg transition-all duration-300"
            >
              Log In
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
