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
            smooth: isMobile() ? 0.2 : 0.8, // Even less smooth on mobile for better responsiveness
            effects: true,
            smoothTouch: 0.05, // Reduced touch smoothness
            normalizeScroll: true,
            ignoreMobileResize: true,
            ease: "power1.out" // Simpler easing for mobile
        });

        // Set up fade animations for each section with better timing
        const sections = contentRef.current.querySelectorAll('section');
        sections.forEach((section, index) => {
            // Skip the first section (hero) as it should be visible by default
            if (index === 0) return;

            // Mobile-friendly animation settings with much earlier triggers
            const mobileSettings = {
                start: "top 90%", // Trigger even earlier on mobile
                end: "top 90%", // End almost immediately - section becomes fully visible very quickly
                duration: 0.15, // Very fast animations for mobile
                ease: "power1.out", // Simpler easing
                opacity: 0.7, // Much more visible initial state
                y: 10 // Smaller movement
            };

            const desktopSettings = {
                start: "top 90%", // Trigger earlier on desktop too
                end: "top 10%", // End almost immediately - section becomes fully visible very quickly
                duration: 0.3, // Very fast animations
                ease: "power2.out", // Smooth easing
                opacity: 0.6, // More visible initial state on desktop
                y: 20 // Moderate movement
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
                        scrub: isMobile() ? 0.05 : 0.2, // Much less scrub for better responsiveness
                        markers: false, // Set to true for debugging
                        fastScrollEnd: true, // Better performance
                        preventOverlaps: true // Prevent overlapping animations
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