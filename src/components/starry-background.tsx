'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const StarryBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        if (!containerRef.current) return;

        // Clear existing particles
        particlesRef.current = [];

        // Create particles
        const particles = Array.from({ length: 100 }, () => {
            const particle = document.createElement('div');
            particle.className = 'absolute rounded-full bg-white';
            containerRef.current?.appendChild(particle);
            return particle;
        });

        // Store refs
        particlesRef.current = particles;

        // Animate particles
        particles.forEach((particle) => {
            gsap.set(particle, {
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.1,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
            });

            gsap.to(particle, {
                y: window.innerHeight,
                duration: Math.random() * 10 + 10,
                opacity: 0,
                repeat: -1,
                ease: 'none',
                delay: Math.random() * 10,
            });
        });

        // Cleanup function
        return () => {
            particles.forEach(particle => {
                gsap.killTweensOf(particle);
                particle.remove();
            });
            particlesRef.current = [];
        };
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden" />
    );
};

export default StarryBackground;