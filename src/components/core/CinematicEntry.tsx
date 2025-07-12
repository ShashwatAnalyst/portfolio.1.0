'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef, useState } from 'react';

gsap.registerPlugin(useGSAP);

interface CinematicEntryProps {
  onComplete: () => void;
}

const CinematicEntry: React.FC<CinematicEntryProps> = ({ onComplete }) => {
  const CinematicEntryRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  // Pre-warm GSAP and force immediate setup
  React.useEffect(() => {
    if (CinematicEntryRef.current) {
      // Force immediate GPU layer creation
      const letters = CinematicEntryRef.current.querySelectorAll('.name-text span');
      const panels = CinematicEntryRef.current.querySelectorAll('.CinematicEntry-item');

      letters.forEach(letter => {
        (letter as HTMLElement).style.transform = 'translateZ(0) translateY(100%)';
        (letter as HTMLElement).style.willChange = 'transform, opacity';
      });

      panels.forEach(panel => {
        (panel as HTMLElement).style.transform = 'translateZ(0)';
        (panel as HTMLElement).style.willChange = 'transform';
      });
    }
  }, []);

  useGSAP(
    () => {
      // Skip GSAP setup if elements aren't ready
      if (!CinematicEntryRef.current) return;

      // Enable maximum performance
      gsap.config({
        nullTargetWarn: false
      });

      // Use requestAnimationFrame to ensure DOM is fully ready
      requestAnimationFrame(() => {
        const tl = gsap.timeline({
          defaults: {
            ease: 'power2.inOut'
          },
          immediateRender: false // Let useEffect handle initial setup
        });

        // Cache selectors - they're already pre-warmed
        const letters = gsap.utils.toArray('.name-text span');
        const panels = gsap.utils.toArray('.CinematicEntry-item');

        // Start animation immediately without additional setup
        tl.fromTo(letters,
          {
            y: '100%',
            autoAlpha: 1,
            scale: 0.98
          },
          {
            y: 0,
            scale: 1,
            stagger: {
              each: 0.07, // Slightly faster for smoother perception
              from: "start"
            },
            duration: 0.35, // Slightly faster
            ease: 'back.out(1.5)', // Less aggressive bounce
            overwrite: true
          }
        );

        // Hold the letters visible
        tl.to({}, { duration: 1.2 });

        // Letter fade out
        tl.to(letters, {
          autoAlpha: 0,
          y: '-20%',
          stagger: 0.05,
          duration: 0.3,
          ease: 'power2.in',
        });

        // Panel slide up animation - Fixed timing and stagger
        tl.to(panels, {
          y: '-100%',
          duration: 0.9, // Slightly longer for better visibility
          stagger: {
            each: 0.13, // Increased stagger for clearer left-to-right effect
            from: "start"
          },
          ease: 'power2.inOut',
        }, '-=0.1'); // Start slightly before letters finish fading

        // Final fade out - adjusted timing to account for longer panel animation
        tl.to(
          CinematicEntryRef.current,
          {
            autoAlpha: 0,
            duration: 0.4,
            ease: 'power2.inOut',
            onComplete: () => {
              // Clean up will-change properties
              gsap.set([letters, panels], { willChange: 'auto' });

              setIsComplete(true);
              if (CinematicEntryRef.current) {
                CinematicEntryRef.current.style.cssText = 'display: none !important; pointer-events: none !important;';
              }
              onComplete();
            },
          },
          '+=0.3' // Wait a bit longer after panels finish
        );
      });
    },
    { scope: CinematicEntryRef, dependencies: [] }
  );

  return (
    <div
      className={`fixed inset-0 z-[6] flex ${isComplete ? 'hidden pointer-events-none' : ''}`}
      ref={CinematicEntryRef}
      style={{
        willChange: isComplete ? 'auto' : 'opacity',
        transform: 'translateZ(0)', // Force GPU layer immediately
        backfaceVisibility: 'hidden'
      }}
    >
      <div className="CinematicEntry-item h-full w-[10%] bg-[#1a1a1a] transform-gpu" style={{ transform: 'translateZ(0)' }}></div>
      <div className="CinematicEntry-item h-full w-[10%] bg-[#1a1a1a] transform-gpu" style={{ transform: 'translateZ(0)' }}></div>
      <div className="CinematicEntry-item h-full w-[10%] bg-[#1a1a1a] transform-gpu" style={{ transform: 'translateZ(0)' }}></div>
      <div className="CinematicEntry-item h-full w-[10%] bg-[#1a1a1a] transform-gpu" style={{ transform: 'translateZ(0)' }}></div>
      <div className="CinematicEntry-item h-full w-[10%] bg-[#1a1a1a] transform-gpu" style={{ transform: 'translateZ(0)' }}></div>
      <div className="CinematicEntry-item h-full w-[10%] bg-[#1a1a1a] transform-gpu" style={{ transform: 'translateZ(0)' }}></div>
      <div className="CinematicEntry-item h-full w-[10%] bg-[#1a1a1a] transform-gpu" style={{ transform: 'translateZ(0)' }}></div>
      <div className="CinematicEntry-item h-full w-[10%] bg-[#1a1a1a] transform-gpu" style={{ transform: 'translateZ(0)' }}></div>
      <div className="CinematicEntry-item h-full w-[10%] bg-[#1a1a1a] transform-gpu" style={{ transform: 'translateZ(0)' }}></div>
      <div className="CinematicEntry-item h-full w-[10%] bg-[#1a1a1a] transform-gpu" style={{ transform: 'translateZ(0)' }}></div>

      <p className="name-text flex text-[20vw] lg:text-[200px] heading-font text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none overflow-hidden will-change-transform">
        <span className="inline-block transform-gpu will-change-transform backface-visibility-hidden" style={{ transform: 'translateZ(0) translateY(100%)' }}>W</span>
        <span className="inline-block transform-gpu will-change-transform backface-visibility-hidden" style={{ transform: 'translateZ(0) translateY(100%)' }}>E</span>
        <span className="inline-block transform-gpu will-change-transform backface-visibility-hidden" style={{ transform: 'translateZ(0) translateY(100%)' }}>L</span>
        <span className="inline-block transform-gpu will-change-transform backface-visibility-hidden" style={{ transform: 'translateZ(0) translateY(100%)' }}>C</span>
        <span className="inline-block transform-gpu will-change-transform backface-visibility-hidden" style={{ transform: 'translateZ(0) translateY(100%)' }}>O</span>
        <span className="inline-block transform-gpu will-change-transform backface-visibility-hidden" style={{ transform: 'translateZ(0) translateY(100%)' }}>M</span>
        <span className="inline-block transform-gpu will-change-transform backface-visibility-hidden" style={{ transform: 'translateZ(0) translateY(100%)' }}>E</span>
      </p>
    </div>
  );
};

export default CinematicEntry;