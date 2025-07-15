"use client";

import { useEffect, useRef, useCallback, useState } from 'react';

interface PerformanceMetrics {
  renderTime: number;
  componentName: string;
  timestamp: number;
}

// Hook for monitoring component render performance
export function usePerformanceMonitor(componentName: string, enabled: boolean = process.env.NODE_ENV === 'development') {
  const renderStartTime = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;
    
    renderStartTime.current = performance.now();
    
    return () => {
      const renderTime = performance.now() - renderStartTime.current;
      
      if (renderTime > 16) { // More than one frame at 60fps
        console.warn(`🐌 Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`);
      }
      
      // You could send this data to an analytics service
      logPerformanceMetric({
        renderTime,
        componentName,
        timestamp: Date.now(),
      });
    };
  });
}

// Hook for monitoring network requests
export function useNetworkMonitor() {
  const logNetworkRequest = useCallback((url: string, method: string, duration: number, status?: number) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🌐 Network: ${method} ${url} - ${duration.toFixed(2)}ms - Status: ${status || 'pending'}`);
    }
  }, []);

  return { logNetworkRequest };
}

// Hook for monitoring memory usage
export function useMemoryMonitor(intervalMs: number = 30000) {
  useEffect(() => {
    if (typeof window === 'undefined' || !('memory' in performance)) return;

    const interval = setInterval(() => {
      const memInfo = (performance as any).memory;
      const usedMB = Math.round(memInfo.usedJSHeapSize / 1048576);
      const totalMB = Math.round(memInfo.totalJSHeapSize / 1048576);
      const limitMB = Math.round(memInfo.jsHeapSizeLimit / 1048576);
      
      if (usedMB > limitMB * 0.8) {
        console.warn(`⚠️ High memory usage: ${usedMB}MB / ${limitMB}MB`);
      }
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`💾 Memory: ${usedMB}MB used, ${totalMB}MB total, ${limitMB}MB limit`);
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs]);
}

// Utility function to log performance metrics
function logPerformanceMetric(metric: PerformanceMetrics) {
  // In a real app, you might send this to an analytics service
  if (process.env.NODE_ENV === 'development') {
    console.log(`📊 Performance: ${metric.componentName} rendered in ${metric.renderTime.toFixed(2)}ms`);
  }
  
  // Example: Send to analytics
  // analytics.track('component_render', metric);
}

// Hook for measuring Core Web Vitals
export function useWebVitals() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Measure FCP (First Contentful Paint)
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          console.log(`🎨 FCP: ${entry.startTime.toFixed(2)}ms`);
        }
      });
    });

    observer.observe({ entryTypes: ['paint'] });

    // Measure LCP (Largest Contentful Paint)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log(`🖼️ LCP: ${lastEntry.startTime.toFixed(2)}ms`);
    });

    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    return () => {
      observer.disconnect();
      lcpObserver.disconnect();
    };
  }, []);
}

// Debounce hook for performance optimization
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Throttle hook for performance optimization
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastRan = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const now = Date.now();
      if (now - lastRan.current >= delay) {
        callback(...args);
        lastRan.current = now;
      } else {
        timeoutRef.current = setTimeout(() => {
          callback(...args);
          lastRan.current = Date.now();
        }, delay - (now - lastRan.current));
      }
    }) as T,
    [callback, delay]
  );
}
