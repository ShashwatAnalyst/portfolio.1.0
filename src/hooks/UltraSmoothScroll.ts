import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export const useUltraSmoothScroll = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const smoother = useRef<ScrollSmoother | null>(null);
    const sections = useRef<HTMLElement[]>([]);
    const initialized = useRef(false);

    // Check if device is mobile
    const isMobile = () => {
        return window.innerWidth < 768;
    };

    // Physics-based scroll state
    const scrollPhysics = useRef({
        velocity: 0,
        acceleration: 0,
        friction: 0.92,
        maxVelocity: 50,
        isScrolling: false,
        targetY: 0,
        currentY: 0,
        lastTime: 0,
        momentum: 0
    });

    const initializeSmoothScroll = useCallback(() => {
        if (!containerRef.current || !contentRef.current || initialized.current) return;

        // Create ultra-smooth scroll with physics
        smoother.current = ScrollSmoother.create({
            wrapper: containerRef.current,
            content: contentRef.current,
            smooth: isMobile() ? 0.5 : 1, // Less smooth on mobile for better performance
            effects: true,
            smoothTouch: 0.1,
            normalizeScroll: true,
            ignoreMobileResize: true,
            ease: "power4.out",
            onUpdate: (self) => {
                const physics = scrollPhysics.current;
                const currentTime = Date.now();
                const deltaTime = currentTime - physics.lastTime;

                if (deltaTime > 0) {
                    const newVelocity = (self.scrollTop() - physics.currentY) / deltaTime * 16.67;
                    physics.velocity = physics.velocity * 0.8 + newVelocity * 0.2; // Smooth velocity
                    physics.currentY = self.scrollTop();
                    physics.lastTime = currentTime;
                }
            }
        });

        // Enhanced section animations with mobile-friendly settings
        sections.current.forEach((section, index) => {
            if (!section) return;

            // Mobile-friendly animation settings
            const mobileSettings = {
                opacity: index === 0 ? 1 : 0.3, // Less fade on mobile
                y: index === 0 ? 0 : 30, // Smaller movement on mobile
                scale: index === 0 ? 1 : 0.98, // Less scale change on mobile
                rotationX: 0, // No 3D rotation on mobile
                duration: 0.8, // Faster animations on mobile
                ease: "power1.out" // Simpler easing on mobile
            };

            const desktopSettings = {
                opacity: index === 0 ? 1 : 0,
                y: index === 0 ? 0 : 100,
                scale: index === 0 ? 1 : 0.95,
                rotationX: index === 0 ? 0 : 5,
                duration: 1.2,
                ease: "power2.out"
            };

            const settings = isMobile() ? mobileSettings : desktopSettings;

            // Initial state
            gsap.set(section, {
                opacity: settings.opacity,
                y: settings.y,
                scale: settings.scale,
                rotationX: settings.rotationX,
                transformOrigin: "center center",
                force3D: !isMobile() // Disable 3D on mobile for better performance
            });

            // Create smooth entrance animation with mobile-friendly triggers
            ScrollTrigger.create({
                trigger: section,
                start: isMobile() ? "top 80%" : "top 50%", // Trigger later on mobile
                end: isMobile() ? "bottom 20%" : "bottom 50%", // End later on mobile
                scrub: false,
                onEnter: () => {
                    gsap.to(section, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        rotationX: 0,
                        duration: settings.duration,
                        ease: settings.ease,
                        force3D: !isMobile()
                    });
                },
                onLeave: () => {
                    if (isMobile()) {
                        // On mobile, only slightly fade out instead of completely hiding
                        gsap.to(section, {
                            opacity: 0.7,
                            y: -20,
                            scale: 0.99,
                            duration: settings.duration * 0.6,
                            ease: "power1.in"
                        });
                    } else {
                        // Desktop behavior - full fade out
                        gsap.to(section, {
                            opacity: 0,
                            y: -50,
                            scale: 0.98,
                            rotationX: -3,
                            duration: settings.duration * 0.8,
                            ease: "power2.in",
                            force3D: true
                        });
                    }
                },
                onEnterBack: () => {
                    gsap.to(section, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        rotationX: 0,
                        duration: settings.duration,
                        ease: settings.ease,
                        force3D: !isMobile()
                    });
                },
                onLeaveBack: () => {
                    if (isMobile()) {
                        // On mobile, only slightly fade out instead of completely hiding
                        gsap.to(section, {
                            opacity: 0.7,
                            y: 20,
                            scale: 0.99,
                            duration: settings.duration * 0.6,
                            ease: "power1.in"
                        });
                    } else {
                        // Desktop behavior - full fade out
                        gsap.to(section, {
                            opacity: 0,
                            y: 50,
                            scale: 0.98,
                            rotationX: 3,
                            duration: settings.duration * 0.8,
                            ease: "power2.in",
                            force3D: true
                        });
                    }
                }
            });

            // Parallax effects for depth (disabled on mobile for performance)
            if (!isMobile()) {
                const parallaxElements = section.querySelectorAll('[data-speed]');
                parallaxElements.forEach((element) => {
                    const speed = parseFloat((element as HTMLElement).dataset.speed || '1');
                    gsap.to(element, {
                        yPercent: -50 * speed,
                        ease: "none",
                        scrollTrigger: {
                            trigger: section,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true
                        }
                    });
                });
            }
        });

        initialized.current = true;
    }, []);

    const addSection = useCallback((element: HTMLElement | null) => {
        if (element && !sections.current.includes(element)) {
            sections.current.push(element);
        }
    }, []);

    const scrollToSection = useCallback((index: number) => {
        if (!smoother.current || !sections.current[index]) return;

        const section = sections.current[index];
        const sectionTop = section.offsetTop;

        // Use GSAP to animate the scroll
        gsap.to(smoother.current.scrollTop, {
            value: sectionTop,
            duration: 1,
            ease: "power3.inOut",
            onUpdate: () => {
                if (smoother.current) {
                    smoother.current.scrollTo(sectionTop, true);
                }
            }
        });
    }, []);

    useEffect(() => {
        const timer = setTimeout(initializeSmoothScroll, 100);

        return () => {
            clearTimeout(timer);
            if (smoother.current) {
                smoother.current.kill();
                smoother.current = null;
            }
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            initialized.current = false;
        };
    }, [initializeSmoothScroll]);

    return {
        containerRef,
        contentRef,
        addSection,
        scrollToSection,
        smoother: smoother.current
    };
};