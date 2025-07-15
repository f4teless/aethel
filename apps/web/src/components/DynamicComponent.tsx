"use client";

import dynamic from 'next/dynamic';
import { ComponentType, Suspense, ReactElement } from 'react';

interface DynamicComponentProps {
  children: React.ReactNode;
  className?: string;
}

// Loading fallback with RPG styling
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
    <span className="ml-3 text-[var(--foreground)] opacity-80">Loading...</span>
  </div>
);

// Higher-order component for dynamic loading with suspense
export function withDynamicLoading<T extends object>(
  Component: ComponentType<T>,
  loadingComponent?: () => ReactElement
) {
  const DynamicComponent = dynamic(() => Promise.resolve(Component), {
    loading: loadingComponent || (() => <LoadingSpinner />),
    ssr: false,
  });

  return function WrappedComponent(props: T) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <DynamicComponent {...props} />
      </Suspense>
    );
  };
}

// Component for lazy loading sections
export function LazySection({ 
  children, 
  className = "" 
}: DynamicComponentProps) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className={className}>
        {children}
      </div>
    </Suspense>
  );
}

export default LazySection;
