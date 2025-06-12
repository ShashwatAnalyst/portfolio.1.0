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
            smooth: 1, // Increased smoothness
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

        // Enhanced section animations with physics
        sections.current.forEach((section, index) => {
            if (!section) return;

            // Initial state
            gsap.set(section, {
                opacity: index === 0 ? 1 : 0,
                y: index === 0 ? 0 : 100,
                scale: index === 0 ? 1 : 0.95,
                rotationX: index === 0 ? 0 : 5,
                transformOrigin: "center center",
                force3D: true
            });

            // Create smooth entrance animation
            ScrollTrigger.create({
                trigger: section,
                start: "top 50%",
                end: "bottom 50%",
                scrub: false,
                onEnter: () => {
                    gsap.to(section, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        rotationX: 0,
                        duration: 1.2,
                        ease: "power2.out",
                        force3D: true
                    });
                },
                onLeave: () => {
                    gsap.to(section, {
                        opacity: 0,
                        y: -50,
                        scale: 0.98,
                        rotationX: -3,
                        duration: 0.8,
                        ease: "power2.in",
                        force3D: true
                    });
                },
                onEnterBack: () => {
                    gsap.to(section, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        rotationX: 0,
                        duration: 1.2,
                        ease: "power2.out",
                        force3D: true
                    });
                },
                onLeaveBack: () => {
                    gsap.to(section, {
                        opacity: 0,
                        y: 50,
                        scale: 0.98,
                        rotationX: 3,
                        duration: 0.8,
                        ease: "power2.in",
                        force3D: true
                    });
                }
            });

            // Parallax effects for depth
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
        });

        initialized.current = true;
    }, []);

    const addSection = useCallback((element: HTMLElement | null) => {
        if (element && !sections.current.includes(element)) {
            sections.current.push(element);
        }
    }, []);

    const scrollToSection = useCallback((index: number) => {
        if (smoother.current && sections.current[index]) {
            smoother.current.scrollTo(sections.current[index], true, "power3.inOut");
        }
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