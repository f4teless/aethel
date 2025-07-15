"use client";

import { useEffect } from 'react';

interface ServiceWorkerConfig {
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onError?: (error: Error) => void;
}

export function useServiceWorker(config: ServiceWorkerConfig = {}) {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      console.log('Service Worker not supported');
      return;
    }

    registerServiceWorker(config);
  }, []);
}

async function registerServiceWorker(config: ServiceWorkerConfig) {
  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });

    console.log('✅ Service Worker registered successfully');

    // Handle updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (!newWorker) return;

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            // New content is available
            console.log('🔄 New content available, please refresh');
            config.onUpdate?.(registration);
          } else {
            // Content is cached for offline use
            console.log('✅ Content cached for offline use');
            config.onSuccess?.(registration);
          }
        }
      });
    });

    // Check if there's a waiting service worker
    if (registration.waiting) {
      config.onUpdate?.(registration);
    }

  } catch (error) {
    console.error('❌ Service Worker registration failed:', error);
    config.onError?.(error as Error);
  }
}

// Hook for handling service worker updates
export function useServiceWorkerUpdate() {
  const [updateAvailable, setUpdateAvailable] = React.useState(false);
  const [registration, setRegistration] = React.useState<ServiceWorkerRegistration | null>(null);

  useServiceWorker({
    onUpdate: (reg) => {
      setUpdateAvailable(true);
      setRegistration(reg);
    },
    onSuccess: (reg) => {
      setRegistration(reg);
    },
  });

  const applyUpdate = () => {
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  };

  return {
    updateAvailable,
    applyUpdate,
  };
}

// Utility to preload critical resources
export function preloadResources(urls: string[]) {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'CACHE_URLS',
      payload: urls,
    });
  }
}

// Hook for monitoring online/offline status
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = React.useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

// Component for showing update notification
export function UpdateNotification() {
  const { updateAvailable, applyUpdate } = useServiceWorkerUpdate();

  if (!updateAvailable) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-[var(--background)] border border-[var(--accent)] rounded-lg p-4 shadow-lg z-50 max-w-sm">
      <div className="space-y-3">
        <div>
          <h4 className="font-semibold text-[var(--foreground)]">Update Available</h4>
          <p className="text-sm text-[var(--muted-foreground)]">
            A new version of Aethel is available. Refresh to get the latest features.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={applyUpdate}
            className="px-3 py-1 bg-[var(--accent)] text-[var(--accent-foreground)] rounded text-sm hover:opacity-90 transition-opacity"
          >
            Update Now
          </button>
          <button
            onClick={() => setUpdateAvailable(false)}
            className="px-3 py-1 border border-[var(--border)] rounded text-sm hover:bg-[var(--muted)] transition-colors"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
}
