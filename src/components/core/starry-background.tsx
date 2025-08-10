'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const StarryBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        if (!containerRef.current) return;

        particlesRef.current = [];

        const particleCount = 25;
        const particles = Array.from({ length: particleCount }, () => {
            const particle = document.createElement('div');
            particle.className = 'absolute rounded-full';
            containerRef.current?.appendChild(particle);
            return particle;
        });

        particlesRef.current = particles;

        const getParticleColor = () => {
            const isDarkMode = document.documentElement.classList.contains('dark');
            return isDarkMode ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)';
        };

        const getGlowColor = (particleColor: string) => {
            if (particleColor === 'rgb(0, 0, 0)') {
                return '0 0 8px rgba(0, 0, 0, 0.6), 0 0 16px rgba(0, 0, 0, 0.3)';
            } else {
                return '0 0 8px rgba(255, 255, 255, 0.6), 0 0 16px rgba(255, 255, 255, 0.3), 0 0 24px rgba(255, 255, 255, 0.1)';
            }
        };

        const updateParticleColors = () => {
            const color = getParticleColor();
            const glow = getGlowColor(color);
            particles.forEach(particle => {
                particle.style.backgroundColor = color;
                particle.style.boxShadow = glow;
            });
        };

        // Track active particle positions to prevent clustering
        const activePositions: { x: number; timestamp: number }[] = [];
        const minDistance = Math.max(80, window.innerWidth / 15); // Minimum distance between particles

        const isPositionTooClose = (newX: number, currentTime: number) => {
            // Remove positions older than 3 seconds
            const recentPositions = activePositions.filter(pos => currentTime - pos.timestamp < 3000);
            activePositions.length = 0;
            activePositions.push(...recentPositions);

            // Check if new position is too close to any recent position
            return recentPositions.some(pos => Math.abs(pos.x - newX) < minDistance);
        };

        const getScatteredXPosition = () => {
            const currentTime = Date.now();
            let attempts = 0;
            let x;

            do {
                x = Math.random() * (window.innerWidth - 20) + 10; // 10px margin from edges
                attempts++;
            } while (isPositionTooClose(x, currentTime) && attempts < 50);

            // Record this position
            activePositions.push({ x, timestamp: currentTime });
            return x;
        };

        // Set initial particle properties but keep them hidden
        particles.forEach((particle) => {
            gsap.set(particle, {
                width: Math.random() * 2 + 1.5,
                height: Math.random() * 2 + 1.5,
                opacity: 0, // Start invisible
                x: getScatteredXPosition(),
                y: -20,
                backgroundColor: getParticleColor(),
                boxShadow: getGlowColor(getParticleColor()),
            });
        });

        // Create animation function for particles
        const animateParticle = (particle: HTMLDivElement) => {
            const constantDuration = 25; // Slower duration for gentle fall
            const startX = getScatteredXPosition();

            gsap.fromTo(
                particle,
                { x: startX, y: -20, opacity: Math.random() * 0.5 + 0.3 },
                {
                    x: startX,
                    y: window.innerHeight + 50,
                    duration: constantDuration,
                    opacity: 0,
                    ease: 'none',
                    onComplete: () => {
                        // Random delay before next animation (3-10 seconds)
                        setTimeout(() => animateParticle(particle), Math.random() * 7000 + 3000);
                    },
                }
            );

            // Twinkle effect
            gsap.to(particle, {
                opacity: Math.random() * 0.3 + 0.7,
                duration: Math.random() * 2 + 1,
                repeat: Math.floor(constantDuration / 2),
                yoyo: true,
                ease: 'power2.inOut',
            });
        };

        // Start particles with random delays spread over time (0-30 seconds)
        particles.forEach((particle) => {
            const randomDelay = Math.random() * 30000; // 0-30 seconds
            setTimeout(() => animateParticle(particle), randomDelay);
        });

        const observer = new MutationObserver(() => {
            updateParticleColors();
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        updateParticleColors();

        const handleResize = () => {
            // Clear active positions on resize since screen dimensions changed
            activePositions.length = 0;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', handleResize);
            particles.forEach(particle => {
                gsap.killTweensOf(particle);
                particle.remove();
            });
            particlesRef.current = [];
        };
    }, []);

    return (
        <>
            <div className="fixed inset-0 z-0 dark:bg-transparent bg-background" />
            <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden" />
        </>
    );
};

export default StarryBackground;