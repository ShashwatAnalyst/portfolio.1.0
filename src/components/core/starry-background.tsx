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
        const particles = Array.from({ length: 40 }, () => {
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

        // Function to get glow color based on particle color
        const getGlowColor = (particleColor: string) => {
            if (particleColor === 'rgb(0, 0, 0)') {
                return '0 0 8px rgba(0, 0, 0, 0.6), 0 0 16px rgba(0, 0, 0, 0.3)';
            } else {
                return '0 0 8px rgba(255, 255, 255, 0.6), 0 0 16px rgba(255, 255, 255, 0.3), 0 0 24px rgba(255, 255, 255, 0.1)';
            }
        };

        // Function to update particle colors and glow - optimized with better throttling
        let colorUpdateTimeout: number | null = null;
        const updateParticleColors = () => {
            if (colorUpdateTimeout) return;

            colorUpdateTimeout = window.setTimeout(() => {
                const color = getParticleColor();
                const glow = getGlowColor(color);
                particles.forEach(particle => {
                    particle.style.backgroundColor = color;
                    particle.style.boxShadow = glow;
                });
                colorUpdateTimeout = null;
            }, 150);
        };

        // Animate particles with top-to-bottom spawning - STRAIGHT LINE FALL
        particles.forEach((particle) => {
            const startX = Math.random() * window.innerWidth;
            // Remove horizontal drift - particles fall straight down
            const endX = startX;
            const totalDistance = window.innerHeight + 70; // Total travel distance
            const duration = Math.random() * 12 + 18; // Slower: 18-30 seconds (was 12-20)
            
            // CONTINUOUS FLOW: Start particles at different points in their journey
            const initialProgress = Math.random(); // 0 to 1, representing how far along the journey they start
            const startY = -20 + (totalDistance * initialProgress);
            const endY = window.innerHeight + 50;
            
            // Adjust duration based on remaining distance
            const remainingDistance = endY - startY;
            const adjustedDuration = (remainingDistance / totalDistance) * duration;

            gsap.set(particle, {
                width: Math.random() * 2 + 1.4, // Slightly bigger: 1.5-3.5px
                height: Math.random() * 2 + 1.4, // Slightly bigger: 1.5-3.5px
                opacity: Math.random() * 0.5 + 0.3,
                x: startX,
                y: startY,
                backgroundColor: getParticleColor(),
                boxShadow: getGlowColor(getParticleColor()),
            });

            // Create continuous falling animation - STRAIGHT LINE
            const animateParticle = () => {
                const newStartX = Math.random() * window.innerWidth;
                // No horizontal drift - particles fall straight
                const newEndX = newStartX;
                
                gsap.fromTo(particle, 
                    {
                        x: newStartX,
                        y: -20,
                        opacity: Math.random() * 0.5 + 0.3,
                    },
                    {
                        x: newEndX, // Same X position - straight line
                        y: window.innerHeight + 50,
                        duration: duration, // Slower duration
                        opacity: 0,
                        ease: "none", // Linear motion for consistent speed
                        onComplete: animateParticle, // Recursive call for continuous animation
                    }
                );

                // Remove horizontal swaying motion - particles fall straight

                
            };

            // Start the initial animation (for particles that start mid-journey)
            if (initialProgress > 0) {
                gsap.to(particle, {
                    x: endX, // Straight line - no horizontal movement
                    y: endY,
                    duration: adjustedDuration,
                    opacity: 0,
                    ease: "none", // Linear motion
                    onComplete: animateParticle,
                });

                // Remove initial horizontal swaying

                // Initial twinkling
                gsap.to(particle, {
                    opacity: Math.random() * 0.3 + 0.7,
                    duration: Math.random() * 2 + 1,
                    repeat: Math.floor(adjustedDuration / 2),
                    yoyo: true,
                    ease: "power2.inOut",
                });
            } else {
                // Start fresh animation for particles that begin at the top
                setTimeout(() => animateParticle(), Math.random() * 2000);
            }
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
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden" />
    );
};

export default StarryBackground;