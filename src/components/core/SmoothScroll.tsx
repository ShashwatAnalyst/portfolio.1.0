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

        // Set up fade animations for each section with mobile-friendly settings
        const sections = contentRef.current.querySelectorAll('section');
        sections.forEach((section, index) => {
            // Skip the first section (hero) as it should be visible by default
            if (index === 0) return;

            // Mobile-friendly animation settings
            const mobileSettings = {
                start: "top 85%", // Trigger later on mobile
                end: "top 15%", // End later on mobile
                duration: 0.8, // Faster animations
                ease: "power1.out", // Simpler easing
                opacity: 0.3, // Less fade on mobile
                y: 30 // Smaller movement
            };

            const desktopSettings = {
                start: "top 60%",
                end: "top 40%",
                duration: 1,
                ease: "power2.out",
                opacity: 0,
                y: 50
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
                        scrub: isMobile() ? 0.5 : 1 // Less scrub on mobile for better performance
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