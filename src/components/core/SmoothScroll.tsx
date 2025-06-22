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
            smooth: isMobile() ? 0.3 : 0.8, // Much less smooth on mobile
            effects: true,
            smoothTouch: isMobile() ? 0.05 : 0.1, // Reduced smoothTouch for mobile
            normalizeScroll: true,
            ignoreMobileResize: true,
            ease: "power2.out"
        });

        // Set up fade animations for each section
        const sections = contentRef.current.querySelectorAll('section');
        sections.forEach((section, index) => {
            // Skip the first section (hero) as it should be visible by default
            if (index === 0) return;

            if (isMobile()) {
                // Mobile-specific settings with better sync
                gsap.fromTo(section,
                    {
                        opacity: 0.2,
                        y: 15
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        ease: "power1.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 85%", // Start earlier
                            end: "top 25%",   // End later
                            toggleActions: "play reverse play reverse", // Better toggle actions
                            scrub: false, // Disable scrub on mobile for better performance
                            refreshPriority: -1, // Lower priority for mobile
                            onToggle: (self) => {
                                // Manual opacity control for better sync
                                if (self.isActive) {
                                    gsap.to(section, {
                                        opacity: 1,
                                        y: 0,
                                        duration: 0.3,
                                        ease: "power1.out"
                                    });
                                } else {
                                    gsap.to(section, {
                                        opacity: 0.2,
                                        y: 15,
                                        duration: 0.3,
                                        ease: "power1.out"
                                    });
                                }
                            }
                        }
                    }
                );
            } else {
                // Desktop settings (your original approach works fine here)
                gsap.fromTo(section,
                    {
                        opacity: 0.1,
                        y: 30
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 90%",
                            end: "top 10%",
                            toggleActions: "play none none reverse",
                            scrub: 0.5
                        }
                    }
                );
            }
        });

        // Add refresh on resize for mobile orientation changes
        const handleResize = () => {
            if (isMobile()) {
                ScrollTrigger.refresh();
            }
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
            
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