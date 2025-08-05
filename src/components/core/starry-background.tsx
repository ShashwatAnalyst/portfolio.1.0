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

        // Create particles - reduced number for cleaner look
        const particles = Array.from({ length: 20 }, () => {
            const particle = document.createElement('div');
            particle.className = 'absolute rounded-full';
            containerRef.current?.appendChild(particle);
            return particle;
        });

        // Store refs
        particlesRef.current = particles;

        // Simplified particle color - only based on theme, not scroll position
        const getParticleColor = () => {
            const isDarkMode = document.documentElement.classList.contains('dark');
            return isDarkMode ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)';
        };

        // Function to get glow color based on particle color
        const getGlowColor = (particleColor: string) => {
            if (particleColor === 'rgb(0, 0, 0)') {
                return '0 0 8px rgba(0, 0, 0, 0.6), 0 0 16px rgba(0, 0, 0, 0.3)';
            } else {
                return '0 0 8px rgba(255, 255, 255, 0.6), 0 0 16px rgba(255, 255, 255, 0.3), 0 0 24px rgba(255, 255, 255, 0.1)';
            }
        };

        // Function to update particle colors - only for theme changes
        const updateParticleColors = () => {
            const color = getParticleColor();
            const glow = getGlowColor(color);
            particles.forEach(particle => {
                particle.style.backgroundColor = color;
                particle.style.boxShadow = glow;
            });
        };

        // Animate particles with top-to-bottom spawning - STRAIGHT LINE FALL
        particles.forEach((particle) => {
            const startX = Math.random() * window.innerWidth;
            const endX = startX;
            const totalDistance = window.innerHeight + 70;
            const duration = Math.random() * 12 + 18;
            
            const initialProgress = Math.random();
            const startY = -20 + (totalDistance * initialProgress);
            const endY = window.innerHeight + 50;
            
            const remainingDistance = endY - startY;
            const adjustedDuration = (remainingDistance / totalDistance) * duration;

            gsap.set(particle, {
                width: Math.random() * 2 + 1.5,
                height: Math.random() * 2 + 1.5,
                opacity: Math.random() * 0.5 + 0.3,
                x: startX,
                y: startY,
                backgroundColor: getParticleColor(),
                boxShadow: getGlowColor(getParticleColor()),
            });

            // Create continuous falling animation - STRAIGHT LINE
            const animateParticle = () => {
                const newStartX = Math.random() * window.innerWidth;
                const newEndX = newStartX;
                
                gsap.fromTo(particle, 
                    {
                        x: newStartX,
                        y: -20,
                        opacity: Math.random() * 0.5 + 0.3,
                    },
                    {
                        x: newEndX,
                        y: window.innerHeight + 50,
                        duration: duration,
                        opacity: 0,
                        ease: "none",
                        onComplete: animateParticle,
                    }
                );

                // Subtle twinkling effect
                gsap.to(particle, {
                    opacity: Math.random() * 0.3 + 0.7,
                    duration: Math.random() * 2 + 1,
                    repeat: Math.floor(duration / 2),
                    yoyo: true,
                    ease: "power2.inOut",
                });
            };

            // Start the initial animation
            if (initialProgress > 0) {
                gsap.to(particle, {
                    x: endX,
                    y: endY,
                    duration: adjustedDuration,
                    opacity: 0,
                    ease: "none",
                    onComplete: animateParticle,
                });

                gsap.to(particle, {
                    opacity: Math.random() * 0.3 + 0.7,
                    duration: Math.random() * 2 + 1,
                    repeat: Math.floor(adjustedDuration / 2),
                    yoyo: true,
                    ease: "power2.inOut",
                });
            } else {
                setTimeout(() => animateParticle(), Math.random() * 2000);
            }
        });

        // ONLY listen for theme changes - NO SCROLL LISTENER
        const observer = new MutationObserver(() => {
            updateParticleColors();
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        // Initial color update
        updateParticleColors();

        // Cleanup function - removed scroll listener cleanup
        return () => {
            observer.disconnect();
            particles.forEach(particle => {
                gsap.killTweensOf(particle);
                particle.remove();
            });
            particlesRef.current = [];
        };
    }, []);

    return (
        <>
            {/* Background layer - handles both light and dark mode backgrounds */}
            <div className="fixed inset-0 z-0 dark:bg-transparent bg-background" />
            
            {/* Particles container */}
            <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden" />
        </>
    );
};

export default StarryBackground;