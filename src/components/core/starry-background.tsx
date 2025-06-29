'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const StarryBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!containerRef.current) return;

        // Wait for page to be fully loaded before starting animations
        const startAnimations = () => {
            if (isLoaded) return;
            setIsLoaded(true);
        };

        // Start animations after a short delay to ensure smooth initial load
        const timer = setTimeout(startAnimations, 500);

        return () => clearTimeout(timer);
    }, [isLoaded]);

    useEffect(() => {
        if (!containerRef.current || !isLoaded) return;

        // Clear existing particles
        particlesRef.current = [];

        // Create particles - keep all 80 particles
        const particles = Array.from({ length: 80 }, () => {
            const particle = document.createElement('div');
            particle.className = 'absolute rounded-full';
            containerRef.current?.appendChild(particle);
            return particle;
        });

        // Store refs
        particlesRef.current = particles;

        // Function to get the correct particle color
        const getParticleColor = () => {
            const heroSection = document.getElementById('hero');
            if (!heroSection) return 'rgb(255, 255, 255)';

            const rect = heroSection.getBoundingClientRect();
            const isInHeroSection = rect.top <= window.innerHeight && rect.bottom >= 0;
            const isDarkMode = document.documentElement.classList.contains('dark');

            if (isInHeroSection) {
                return isDarkMode ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)';
            } else {
                return 'rgb(255, 255, 255)';
            }
        };

        // Function to update particle colors - optimized with better throttling
        let colorUpdateTimeout: number | null = null;
        const updateParticleColors = () => {
            if (colorUpdateTimeout) return;

            colorUpdateTimeout = window.setTimeout(() => {
                const color = getParticleColor();
                particles.forEach(particle => {
                    particle.style.backgroundColor = color;
                });
                colorUpdateTimeout = null;
            }, 150); // Increased throttle to 150ms for better performance
        };

        // Animate particles with optimized settings
        particles.forEach((particle) => {
            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * window.innerHeight;
            const endX = startX + (Math.random() - 0.5) * 200; // Keep horizontal movement
            const endY = window.innerHeight + 50;
            const duration = Math.random() * 4 + 6; // Keep 6-10 seconds
            const delay = Math.random() * 5; // Keep 0-5 seconds delay

            gsap.set(particle, {
                width: Math.random() * 3 + 2, // Keep larger particles
                height: Math.random() * 3 + 2, // Keep larger particles
                opacity: Math.random() * 0.5 + 0.3, // Keep opacity range
                x: startX,
                y: startY,
                backgroundColor: getParticleColor(),
            });

            // Create animation with horizontal movement (keep all effects)
            gsap.to(particle, {
                x: endX,
                y: endY,
                duration: duration,
                opacity: 0,
                repeat: -1,
                ease: "power1.out", // Keep aggressive easing
                delay: delay,
                onComplete: () => {
                    // Reset particle position for continuous flow
                    gsap.set(particle, {
                        x: Math.random() * window.innerWidth,
                        y: -20,
                        opacity: Math.random() * 0.5 + 0.3,
                    });
                }
            });

            // Keep horizontal swaying motion
            gsap.to(particle, {
                x: endX + (Math.random() - 0.5) * 100,
                duration: duration * 0.5,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
                delay: delay,
            });
        });

        // Add theme change listener with throttling
        const observer = new MutationObserver(() => {
            updateParticleColors();
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        // Optimized scroll listener with better throttling
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateParticleColors();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Simple intersection observer for hero section
        const heroSection = document.getElementById('hero');
        let intersectionObserver: IntersectionObserver | null = null;

        if (heroSection) {
            intersectionObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            updateParticleColors();
                        }
                    });
                },
                { threshold: 0.1 }
            );
            intersectionObserver.observe(heroSection);
        }

        // Initial color update
        updateParticleColors();

        // Cleanup function
        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
            if (intersectionObserver) {
                intersectionObserver.disconnect();
            }
            if (colorUpdateTimeout) {
                clearTimeout(colorUpdateTimeout);
            }
            particles.forEach(particle => {
                gsap.killTweensOf(particle);
                particle.remove();
            });
            particlesRef.current = [];
        };
    }, [isLoaded]); // Only re-run when isLoaded changes

    return (
        <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden" />
    );
};

export default StarryBackground;