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

        // Create particles - increased from 100 to 200
        const particles = Array.from({ length: 200 }, () => {
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

        // Function to update particle colors - simplified
        const updateParticleColors = () => {
            const color = getParticleColor();
            particles.forEach(particle => {
                particle.style.backgroundColor = color;
            });
        };

        // Animate particles
        particles.forEach((particle) => {
            gsap.set(particle, {
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                opacity: Math.random() * 0.7 + 0.3,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                backgroundColor: getParticleColor(),
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

        // Add theme change listener
        const observer = new MutationObserver(() => {
            updateParticleColors();
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        // Optimized scroll listener with proper throttling
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
                            // Simple immediate update when hero becomes visible
                            updateParticleColors();
                        }
                    });
                },
                { threshold: 0.1 }
            );
            intersectionObserver.observe(heroSection);
        }

        // Initial color update - just once with a small delay
        updateParticleColors();
        setTimeout(updateParticleColors, 100);

        // Cleanup function
        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
            if (intersectionObserver) {
                intersectionObserver.disconnect();
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