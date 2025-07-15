"use client";

import dynamic from 'next/dynamic';
import { Suspense, useState, useRef, useEffect } from 'react';

// Lazy loading fallback components
const ComponentLoader = ({ name }: { name: string }) => (
  <div className="flex items-center justify-center p-8 min-h-[200px] bg-[var(--background)] border border-[var(--border)] rounded-lg">
    <div className="text-center space-y-3">
      <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin mx-auto" />
      <p className="text-[var(--muted-foreground)] text-sm">Loading {name}...</p>
    </div>
  </div>
);

// Dynamically import heavy components
export const LazyBackgroundRenderer = dynamic(
  () => import('./BackgroundRenderer'),
  {
    loading: () => <ComponentLoader name="Background" />,
    ssr: false,
  }
);

export const LazyGamePlay = dynamic(
  () => import('./GamePlay'),
  {
    loading: () => <ComponentLoader name="Gameplay" />,
    ssr: false,
  }
);

export const LazyFeatures = dynamic(
  () => import('./Features'),
  {
    loading: () => <ComponentLoader name="Features" />,
    ssr: false,
  }
);

export const LazyPillars = dynamic(
  () => import('./Pillars'),
  {
    loading: () => <ComponentLoader name="Core Pillars" />,
    ssr: false,
  }
);

export const LazyCommunityMain = dynamic(
  () => import('./CommunityMain'),
  {
    loading: () => <ComponentLoader name="Community" />,
    ssr: false,
  }
);

export const LazyLeaderboard = dynamic(
  () => import('./LeaderboardClient'),
  {
    loading: () => <ComponentLoader name="Leaderboard" />,
    ssr: false,
  }
);

// Utility function to wrap components with Suspense
export function withSuspense<T extends object>(
  Component: React.ComponentType<T>,
  fallback?: React.ReactNode
) {
  return function SuspenseWrapper(props: T) {
    return (
      <Suspense fallback={fallback || <ComponentLoader name="Component" />}>
        <Component {...props} />
      </Suspense>
    );
  };
}

// Higher-order component for intersection observer based lazy loading
export function withIntersectionLoading<T extends object>(
  Component: React.ComponentType<T>,
  threshold: number = 0.1
) {
  return function IntersectionWrapper(props: T) {
    const [shouldLoad, setShouldLoad] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        },
        { threshold }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, []);

    return (
      <div ref={ref}>
        {shouldLoad ? (
          <Component {...props} />
        ) : (
          <ComponentLoader name="Content" />
        )}
      </div>
    );
  };
}
