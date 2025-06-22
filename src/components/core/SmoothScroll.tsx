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

        // Only create ScrollSmoother for desktop
        if (!isMobile) {
            smoother.current = ScrollSmoother.create({
                wrapper: containerRef.current,
                content: contentRef.current,
                smooth: 0.8,
                effects: true,
                smoothTouch: 0.1,
                normalizeScroll: true,
                ignoreMobileResize: true,
                ease: "power2.out"
            });
        }

        // Set up fade animations with mobile-optimized settings
        const sections = contentRef.current.querySelectorAll('section');
        sections.forEach((section, index) => {
            // Skip the first section (hero) as it should be visible by default
            if (index === 0) return;

            if (isMobile) {
                // Mobile: Simple, reliable animations with native scrolling
                gsap.fromTo(section,
                    {
                        opacity: 0.2,
                        y: 20
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: "power1.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 80%",
                            end: "top 20%",
                            toggleActions: "play reverse play reverse",
                            once: false,
                            fastScrollEnd: true,
                            preventOverlaps: true
                        }
                    }
                );
            } else {
                // Desktop: Smooth animations with ScrollSmoother
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

        // Cleanup
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
                height: isMobile ? 'auto' : '100vh',
                overflow: isMobile ? 'auto' : 'hidden'
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