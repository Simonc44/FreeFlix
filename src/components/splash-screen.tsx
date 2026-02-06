'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function SplashScreen() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    const isHome = pathname === '/';
    // Check if the navigation is coming from within the same site.
    const isInternalNavigation = document.referrer.startsWith(window.location.origin);

    if (isHome && !isInternalNavigation) {
      // It should be shown. Let's set a timer to hide it.
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
      }, 2500); // Start fade out
      
      const visibilityTimer = setTimeout(() => {
        setVisible(false);
      }, 3000); // Remove from DOM after fade out

      return () => {
        clearTimeout(exitTimer);
        clearTimeout(visibilityTimer);
      };
    } else {
      // It should not be shown. Hide it immediately.
      setIsExiting(true);
      setVisible(false);
    }
  }, [pathname]);

  // This will render the splash screen on the server, preventing the flash of content.
  // On the client, useEffect will run and hide it if necessary.
  if (!visible) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-[200] flex items-center justify-center bg-black transition-opacity duration-500 ease-in-out',
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      )}
    >
      <h1 className="text-8xl font-headline font-bold text-white tracking-widest animate-splash-zoom">
        FREEFLIX
      </h1>
    </div>
  );
}
