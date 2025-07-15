"use client";

import { useServiceWorker } from "../hooks/useServiceWorker";
import { useEffect } from "react";

export default function ServiceWorkerRegistration() {
  useServiceWorker({
    onUpdate: (registration) => {
      console.log('🔄 Service worker update available');
    },
    onSuccess: (registration) => {
      console.log('✅ Service worker registered successfully');
    },
    onError: (error) => {
      console.error('❌ Service worker registration failed:', error);
    }
  });

  return null;
}
