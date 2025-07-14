"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const user = null; // Placeholder for user data

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const transparent = true; // Placeholder

  return (
    <div
      className={`w-full z-20 transition-colors duration-300 ${
        transparent && !mobileMenuOpen
          ? " top-0 left-0"
          : "bg-transparent backdrop-blur-lg sticky top-0 shadow-xl"
      }`}
    >
      <header className="px-6 md:px-12 py-4 flex justify-between items-center font-cinzel uppercase tracking-wider text-white text-sm">
        <Link href="/" className="text-2xl md:text-3xl font-bold tracking-widest text-white drop-shadow-md hover:scale-105 transition-transform">
          Aethel<span className="text-slate-400">.</span>
        </Link>

        <nav className="space-x-6 hidden md:block text-slate-300 font-semibold">
          <Link href="/lore" className={`hover:text-white transition ${pathname === "/lore" ? "text-white" : ""}`}>
            Lore
          </Link>
          <Link href="/community" className={`hover:text-white transition ${pathname === "/community" ? "text-white" : ""}`}>
            Community
          </Link>
          <Link href="/pvp" className={`hover:text-white transition ${pathname === "/pvp" ? "text-white" : ""}`}>
            PVP
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            {user ? (
              <Link href="/profile" className="flex items-center space-x-2 group">
                <span className="font-ebg normal-case group-hover:text-white text-slate-300">{user.name}</span>
                <Image src={user.avatar} alt="User Avatar" width={32} height={32} className="rounded-full border-2 border-slate-500 group-hover:border-white transition" />
              </Link>
            ) : (
              <Link href="/login" className="px-4.5 py-2 font-ebg shadow-md bg-transparent text-white rounded-md transition hover:bg-current/20 hover:shadow-xl duration-200 border border-white/20 backdrop-blur-sm">
                Log In
              </Link>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden z-30 p-2"
            aria-label="Toggle navigation menu"
          >
            <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}></div>
            <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`}></div>
            <div className={`w-6 h-0.5 bg-white mt-1.5 transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></div>
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-lg flex flex-col items-center space-y-6 py-8 shadow-2xl">
          <Link href="/" className="text-slate-300 hover:text-white text-xl">
            Start
          </Link>
          <Link href="/lore" className="text-slate-300 hover:text-white text-xl">
            Lore
          </Link>
          <Link href="/community" className="text-slate-300 hover:text-white text-xl">
            Community
          </Link>
          <Link href="/pvp" className="text-slate-300 hover:text-white text-xl">
            PVP
          </Link>
          <hr className="w-3/4 border-slate-700" />
          {user ? (
            <>
              <Link href="/profile" className="text-white text-xl">
                {user.name}'s Profile
              </Link>
              <Link href="/logout" className="bg-red-600/80 px-6 py-2 rounded text-lg">
                Log Out
              </Link>
            </>
          ) : (
            <Link href="/login" className="bg-slate-700/80 px-8 py-2 rounded text-lg">
              Log In
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
