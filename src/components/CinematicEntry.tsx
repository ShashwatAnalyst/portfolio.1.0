'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

interface CinematicEntryProps {
  onComplete: () => void;
}

export function CinematicEntry({ onComplete }: CinematicEntryProps) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set('.cinematic-overlay', {
        opacity: 0,
        scale: 1.2,
      });

      // Animate in
      gsap.to('.cinematic-overlay', {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'power2.out',
      });

      // Animate out
      gsap.to('.cinematic-overlay', {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        delay: 2,
        ease: 'power2.in',
        onComplete: () => {
          onComplete();
        },
      });
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div className="cinematic-overlay fixed inset-0 bg-background z-[9999] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          SHASHWAT SINGH
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground">
          Data Analyst Portfolio
        </p>
      </div>
    </div>
  );
}