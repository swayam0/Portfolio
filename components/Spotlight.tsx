'use client';
import { useEffect, useRef } from 'react';

export default function Spotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on desktop with fine pointers and no reduced motion preference
    const isDesktop = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches;
    if (!isDesktop) return;

    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      rafId = requestAnimationFrame(() => {
        if (spotlightRef.current) {
          // Keep the gradient centered on the mouse
          spotlightRef.current.style.setProperty('--x', `${e.clientX}px`);
          spotlightRef.current.style.setProperty('--y', `${e.clientY}px`);
          // Slight opacity increase when moving to make it dynamic, but mostly static
          spotlightRef.current.style.opacity = '1';
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="pointer-events-none fixed inset-0 z-40 transition-opacity duration-500 hidden md:block opacity-0"
      style={{
        background: 'radial-gradient(400px circle at var(--x, -100%) var(--y, -100%), rgba(255,255,255,0.02), transparent 40%)',
        mixBlendMode: 'screen'
      }}
    />
  );
}
