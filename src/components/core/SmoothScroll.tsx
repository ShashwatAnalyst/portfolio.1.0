import React, { useEffect, useRef, useState, useCallback } from 'react';
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
    const [isMobile, setIsMobile] = useState(false);

    // Improved mobile detection
    const checkMobile = useCallback(() => {
        const mobile = window.innerWidth < 768 || ('ontouchstart' in window);
        setIsMobile(mobile);
        return mobile;
    }, []);

    // Handle resize and orientation changes
    useEffect(() => {
        checkMobile();
        
        const handleResize = () => {
            checkMobile();
            // Refresh ScrollTrigger on resize
            ScrollTrigger.refresh();
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
        };
    }, [checkMobile]);

    useEffect(() => {
        if (!containerRef.current || !contentRef.current) return;

        // Kill existing instance
        if (smoother.current) {
            smoother.current.kill();
            smoother.current = null;
        }
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());

        // Mobile-specific configuration
        const mobileConfig = {
            wrapper: containerRef.current,
            content: contentRef.current,
            smooth: 0.3, // Much less smooth for better touch response
            effects: false, // Disable effects on mobile for better performance
            smoothTouch: false, // Disable smooth touch for natural mobile scrolling
            normalizeScroll: false, // Allow native mobile scrolling
            ignoreMobileResize: true,
        };

        // Desktop configuration
        const desktopConfig = {
            wrapper: containerRef.current,
            content: contentRef.current,
            smooth: 0.8,
            effects: true,
            smoothTouch: 0.1,
            normalizeScroll: true,
            ignoreMobileResize: true,
            ease: "power2.out"
        };

        // Create smooth scroll instance with device-appropriate settings
        if (!isMobile) {
            smoother.current = ScrollSmoother.create(desktopConfig);
        }

        // Set up fade animations with mobile-optimized settings
        const sections = contentRef.current.querySelectorAll('section');
        sections.forEach((section, index) => {
            // Skip the first section (hero) as it should be visible by default
            if (index === 0) return;

            if (isMobile) {
                // Mobile: Much simpler, more reliable animations
                gsap.fromTo(section,
                    {
                        opacity: 0.3,
                        y: 15
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        ease: "power1.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 85%", // Trigger earlier for mobile
                            end: "top 15%",
                            toggleActions: "play reverse play reverse", // Better for mobile
                            once: false, // Allow re-triggering
                            fastScrollEnd: true, // Better mobile performance
                            preventOverlaps: true // Prevent animation conflicts
                        }
                    }
                );
            } else {
                // Desktop: More sophisticated animations
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

        // Mobile-specific: Add intersection observer fallback for better reliability
        if (isMobile) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        const section = entry.target as HTMLElement;
                        if (entry.isIntersecting) {
                            gsap.to(section, {
                                opacity: 1,
                                y: 0,
                                duration: 0.3,
                                ease: "power1.out"
                            });
                        }
                    });
                },
                {
                    threshold: 0.1,
                    rootMargin: '0px 0px -10% 0px'
                }
            );

            sections.forEach((section, index) => {
                if (index > 0) { // Skip hero section
                    observer.observe(section);
                }
            });

            return () => {
                observer.disconnect();
                ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            };
        }

        // Cleanup for desktop
        return () => {
            if (smoother.current) {
                smoother.current.kill();
                smoother.current = null;
            }
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [isMobile]);

    return (
        <div 
            ref={containerRef} 
            className={`smooth-scroll-container ${isMobile ? 'mobile-scroll' : 'desktop-scroll'}`}
            style={{
                height: '100vh',
                overflow: 'hidden'
            }}
        >
            <div 
                ref={contentRef} 
                className="smooth-scroll-content"
                style={{
                    willChange: isMobile ? 'auto' : 'transform'
                }}
            >
                {children}
            </div>
        </div>
    );
};