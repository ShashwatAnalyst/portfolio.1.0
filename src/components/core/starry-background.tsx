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

        // Animate particles with optimized settings
        particles.forEach((particle) => {
            gsap.set(particle, {
                width: Math.random() * 2 + 1, // Slightly smaller particles
                height: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.3, // Reduced opacity range
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                backgroundColor: getParticleColor(),
            });

            gsap.to(particle, {
                y: window.innerHeight,
                duration: Math.random() * 8 + 12, // Slightly longer duration for smoother movement
                opacity: 0,
                repeat: -1,
                ease: 'none',
                delay: Math.random() * 8, // Reduced delay range
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