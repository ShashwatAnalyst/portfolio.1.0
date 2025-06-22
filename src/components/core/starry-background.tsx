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

        // Create particles - reduced from 200 to 80 for better performance
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

        // Function to update particle colors - optimized with throttling
        let colorUpdateTimeout: number | null = null;
        const updateParticleColors = () => {
            if (colorUpdateTimeout) return;

            colorUpdateTimeout = window.setTimeout(() => {
            const color = getParticleColor();
            particles.forEach(particle => {
                particle.style.backgroundColor = color;
            });
                colorUpdateTimeout = null;
            }, 100); // Throttle to 100ms
        };

        // Animate particles with more aggressive settings
        particles.forEach((particle) => {
            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * window.innerHeight;
            const endX = startX + (Math.random() - 0.5) * 200; // Add horizontal movement
            const endY = window.innerHeight + 50;
            const duration = Math.random() * 4 + 6; // Faster: 6-10 seconds (was 8-12)
            const delay = Math.random() * 5; // Shorter delay: 0-5 seconds (was 0-8)

            gsap.set(particle, {
                width: Math.random() * 3 + 2, // Increased from 2+1 to 3+2 (larger particles)
                height: Math.random() * 3 + 2, // Increased from 2+1 to 3+2 (larger particles)
                opacity: Math.random() * 0.5 + 0.3, // Reduced opacity range
                x: startX,
                y: startY,
                backgroundColor: getParticleColor(),
            });

            // Create more aggressive animation with horizontal movement
            gsap.to(particle, {
                x: endX,
                y: endY,
                duration: duration,
                opacity: 0,
                repeat: -1,
                ease: "power1.out", // More aggressive easing
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

            // Add subtle horizontal swaying motion
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

        // Optimized scroll listener with increased throttling
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
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden" />
    );
};

export default StarryBackground;