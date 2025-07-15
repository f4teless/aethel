"use client";

import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import { authClient } from "@/lib/auth-client";
import Loader from "@/components/loader";

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  redirectTo?: string;
}

export default function AuthGuard({ 
  children, 
  fallback,
  redirectTo = "/login" 
}: AuthGuardProps) {
  const router = useRouter();
  const { data: session, isPending, error } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session && !error) {
      // Get current path to use as callback URL
      const currentPath = window.location.pathname;
      const loginUrl = redirectTo + (currentPath !== '/' ? `?callbackUrl=${encodeURIComponent(currentPath)}` : '');
      router.push(loginUrl);
    }
  }, [session, isPending, error, router, redirectTo]);

  // Show loading state while checking session
  if (isPending) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <Loader />
      </div>
    );
  }

  // Show error state if session check failed
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)] text-[var(--foreground)]">
        <div className="text-center">
          <h2 className="font-cinzel text-2xl mb-4">Authentication Error</h2>
          <p className="text-[var(--muted-foreground)] mb-4">
            Unable to verify your session. Please try signing in again.
          </p>
          <button 
            onClick={() => router.push(redirectTo)}
            className="px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded hover:bg-[var(--primary)]/80 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Don't render children if no session
  if (!session) {
    return null; // Will redirect in useEffect
  }

  // Render protected content
  return <>{children}</>;
}
