import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

interface SmoothScrollProps {
    children: React.ReactNode;
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const smoother = useRef<ScrollSmoother | null>(null);

    // Check if device is mobile
    const isMobile = () => {
        return window.innerWidth < 768;
    };

    useEffect(() => {
        if (!containerRef.current || !contentRef.current) return;

        // Create smooth scroll instance with mobile-friendly settings
        smoother.current = ScrollSmoother.create({
            wrapper: containerRef.current,
            content: contentRef.current,
            smooth: isMobile() ? 0.5 : 0.8, // Less smooth on mobile
            effects: true,
            smoothTouch: 0.1,
            normalizeScroll: true,
            ignoreMobileResize: true,
            ease: "power2.out"
        });

        // Set up fade animations for each section with better timing
        const sections = contentRef.current.querySelectorAll('section');
        sections.forEach((section, index) => {
            // Skip the first section (hero) as it should be visible by default
            if (index === 0) return;

            // Mobile-friendly animation settings with better timing
            const mobileSettings = {
                start: "top 95%", // Trigger very late on mobile
                end: "top 5%", // End very late on mobile
                duration: 0.6, // Faster animations
                ease: "power1.out", // Simpler easing
                opacity: 0.1, // Very subtle initial fade on mobile
                y: 20 // Smaller movement
            };

            const desktopSettings = {
                start: "top 90%", // Trigger late on desktop
                end: "top 10%", // End late on desktop
                duration: 0.8, // Moderate animations
                ease: "power2.out", // Smooth easing
                opacity: 0.1, // Very subtle initial fade on desktop
                y: 30 // Moderate movement
            };

            const settings = isMobile() ? mobileSettings : desktopSettings;

            gsap.fromTo(section,
                {
                    opacity: settings.opacity,
                    y: settings.y
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: settings.duration,
                    ease: settings.ease,
                    scrollTrigger: {
                        trigger: section,
                        start: settings.start,
                        end: settings.end,
                        toggleActions: "play none none reverse",
                        scrub: isMobile() ? 0.3 : 0.5 // Less scrub for better responsiveness
                    }
                }
            );
        });

        // Cleanup
        return () => {
            if (smoother.current) {
                smoother.current.kill();
                smoother.current = null;
            }
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div ref={containerRef} className="smooth-scroll-container">
            <div ref={contentRef} className="smooth-scroll-content">
                {children}
            </div>
        </div>
    );
}; 