"use client";
import { useEffect } from 'react';
import Lenis from 'lenis';

type Props = { children: React.ReactNode };

export default function ClientProviders({ children }: Props) {
  useEffect(() => {
    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Skip smooth scrolling on small screens to reduce main-thread work
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // smoothTouch option removed for compatibility with current Lenis types
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      // lenis exposes destroy at runtime; guard if not present in types
      const anyLenis = lenis as unknown as { destroy?: () => void };
      anyLenis.destroy?.();
    };
  }, []);

  return <>{children}</>;
}
