"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  User,
  LogOut,
  Crown,
  Sword,
  Shield,
  Code,
  Brain,
  Network
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  const navigation = [
    { name: "Lore", href: "/lore", icon: Brain },
    { name: "Community", href: "/community", icon: Shield },
    { name: "Leaderboard", href: "/leaderboard", icon: Crown },
  ];

  return (
    <header
      className="relative top-0 left-0 right-0 z-50"
    >
      <div className="flex items-center justify-between h-16 lg:h-20 px-2 md:px-4 lg:px-8">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="font-cinzel text-2xl lg:text-3xl font-bold tracking-wider text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-300 group"
          >
            Aethel
          </Link>

        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navigation.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-300 font-cormorant text-lg group"
              >
                <IconComponent className="w-4 h-4 group-hover:text-[var(--primary)] transition-colors" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {isPending ? (
            <div className="items-center space-x-3 hidden lg:flex">
              <Skeleton className="h-10 w-24.5 rounded-md" />
            </div>
          ) : session ? (
            <div className="items-center space-x-3 hidden lg:flex">
              {/* User Avatar & Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative flex items-center space-x-2 hover:bg-[var(--muted)] p-2 rounded-lg cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] p-[1px]">
                      <Image src={session.user?.image ?? "/default-avatar.png"} alt="User Avatar" width={32} height={32} className="w-full h-full rounded-full bg-[var(--card)] flex items-center justify-center" />
                    </div>
                    <span className="hidden sm:block font-cormorant text-[var(--foreground)]">
                      {session.user?.name || 'Architect'}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-[var(--card)] border-[var(--border)] shadow-xl"
                >
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-[var(--foreground)]">
                      {session.user?.name || 'Architect'}
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      {session.user?.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center cursor-pointer">
                      <Code className="w-4 h-4 mr-2" />
                      Command Center
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/skilltree" className="flex items-center cursor-pointer">
                      <Network className="w-4 h-4 mr-2" />
                      Skill Tree
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="text-[var(--destructive)] focus:text-[var(--destructive)] cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="items-center space-x-3 hidden lg:flex cursor-pointer">
              <Link href="/login">
                <Button
                  className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-[var(--primary-foreground)] hover:opacity-90 transition-opacity font-cormorant px-6 cursor-pointer"
                >
                  Begin Your Oath
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-[var(--foreground)]" />
            ) : (
              <Menu className="w-5 h-5 text-[var(--foreground)]" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[var(--background)]/95 backdrop-blur-md border-b border-[var(--border)]/50 shadow-xl">
          <div className="px-4 py-6 space-y-4">
            {navigation.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-300 font-cormorant text-lg py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {!session && (
              <div className="pt-4 border-t border-[var(--border)] space-y-3">
                <Link
                  href="/login"
                  className="block w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button
                    variant="outline"
                    className="w-full font-cormorant"
                  >
                    Enter the Realm
                  </Button>
                </Link>
                <Link
                  href="/login"
                  className="block w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button
                    className="w-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-[var(--primary-foreground)] font-cormorant"
                  >
                    Begin Your Oath
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
