"use client";

import { useEffect } from "react";

export default function SwRegister(): null {
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Allow registration in production, or on localhost for development testing
    const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
    if (process.env.NODE_ENV !== 'production' && !isLocalhost) return;
    if (!('serviceWorker' in navigator)) {
      console.debug('Service workers are not supported in this browser');
      return;
    }

    const register = async () => {
      const swUrl = '/sw.js';
      try {
        // Preflight: make sure the SW file exists to avoid noisy registration errors
        const res = await fetch(swUrl, { method: 'GET', cache: 'no-store' });
        if (!res.ok) {
          console.warn(`Service worker file not found at ${swUrl} (status ${res.status})`);
          return;
        }

        const registration = await navigator.serviceWorker.register(swUrl);
        console.log('Service worker registered:', registration);

        // optional: listen for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (!newWorker) return;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed') {
              console.log('New content is available; please refresh.');
            }
          });
        });
      } catch (err) {
        console.error('Service worker registration failed:', err);
      }
    };

    register();
  }, []);

  return null;
}
