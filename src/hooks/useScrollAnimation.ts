import { useEffect, useRef, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface ScrollTriggerInstance {
    kill: () => void;
}

export const useScrollAnimation = () => {
    const refs = useRef<HTMLElement[]>([]);
    const triggers = useRef<ScrollTriggerInstance[]>([]);
    const initialized = useRef(false);
    const animationQueue = useRef<(() => void)[]>([]);
    const isProcessing = useRef(false);
    const frameId = useRef<number | null>(null);

    // Enhanced scroll state management
    const scrollState = useRef({
        isAutoScrolling: false,
        isManualScrolling: false,
        lastScrollTime: 0,
        scrollDirection: 0,
        currentSection: -1
    });

    const timeouts = useRef({
        scroll: null as NodeJS.Timeout | null,
        autoScroll: null as NodeJS.Timeout | null,
        state: null as NodeJS.Timeout | null
    });

    // Clear all timeouts helper
    const clearAllTimeouts = useCallback(() => {
        Object.values(timeouts.current).forEach(timeout => {
            if (timeout) clearTimeout(timeout);
        });
        timeouts.current = { scroll: null, autoScroll: null, state: null };
    }, []);

    // Enhanced batch processing with frame scheduling
    const processBatch = useCallback(() => {
        if (isProcessing.current || animationQueue.current.length === 0) return;

        isProcessing.current = true;
        const operations = [...animationQueue.current];
        animationQueue.current = [];

        if (frameId.current) cancelAnimationFrame(frameId.current);
        frameId.current = requestAnimationFrame(() => {
            operations.forEach(op => op());
            isProcessing.current = false;
            frameId.current = null;
            if (animationQueue.current.length > 0) processBatch();
        });
    }, []);

    const queueOperation = useCallback(
        (operation: () => void, immediate = false) => {
            if (immediate && !isProcessing.current) {
                operation();
            } else {
                animationQueue.current.push(operation);
                processBatch();
            }
        },
        [processBatch]
    );

    // More sensitive scroll trigger config for increased auto-scroll
    const scrollTriggerConfig = useMemo(() => ({
        start: 'top 60%', // Much tighter trigger point
        end: 'bottom 40%',
        toggleActions: 'play none none reverse',
        refreshPriority: -1,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        scrub: false,
        pin: false,
        markers: false,
        anticipatePin: 1,
        once: false,
        preventOverlaps: true,
        fastScrollStart: true,
        ignoreMobileResize: true
    }), []);

    // Auto push scroll animation for subtle nudge after section landing
    const autoPushScroll = useCallback((target: HTMLElement, direction: 'up' | 'down', pushAmount = 300) => {
        const currentScroll = window.pageYOffset;
        const viewportHeight = window.innerHeight;
        const maxScroll = Math.max(0, document.documentElement.scrollHeight - viewportHeight);

        // Calculate a dynamic push amount based on viewport height
        const dynamicPushAmount = Math.min(pushAmount, viewportHeight * 0.4); // Increased to 40% of viewport height

        let pushPosition: number;

        if (direction === 'down') {
            pushPosition = Math.min(currentScroll + dynamicPushAmount, maxScroll);
        } else {
            pushPosition = Math.max(currentScroll - dynamicPushAmount, 0);
        }

        // Only push if there's a meaningful difference and we're not at boundaries
        if (Math.abs(pushPosition - currentScroll) > 5 &&
            (direction === 'down' ? pushPosition < maxScroll : pushPosition > 0)) {
            gsap.to(window, {
                scrollTo: {
                    y: pushPosition,
                    autoKill: true
                },
                duration: 0.6, // Slightly longer duration for smoother longer scroll
                ease: 'power2.inOut', // Changed to power2 for smoother acceleration
                overwrite: 'auto',
                onComplete: () => {
                    // Subtle bounce back for natural feel
                    gsap.to(window, {
                        scrollTo: {
                            y: pushPosition - (direction === 'down' ? 15 : -15), // Slightly increased bounce
                            autoKill: true
                        },
                        duration: 0.3,
                        ease: 'power2.out',
                        overwrite: 'auto'
                    });
                }
            });
        }
    }, []);

    // Enhanced smooth auto-scroll with directional positioning
    const smoothScrollTo = useCallback((target: HTMLElement, sectionIndex: number, direction: 'up' | 'down' = 'down', duration = 0.3) => {
        if (scrollState.current.isAutoScrolling) return;

        const targetRect = target.getBoundingClientRect();
        const targetTop = targetRect.top + window.pageYOffset;
        const targetHeight = targetRect.height;
        const currentScroll = window.pageYOffset;
        const viewportHeight = window.innerHeight;

        // Calculate scroll position based on direction
        let finalScrollPosition: number;

        if (direction === 'down') {
            // Scrolling down: position section with very tight spacing
            finalScrollPosition = targetTop - (viewportHeight * 0.2);

            // Adjust for next section to maintain spacing
            const nextSection = refs.current[sectionIndex + 1];
            if (nextSection) {
                const nextRect = nextSection.getBoundingClientRect();
                const nextTop = nextRect.top + window.pageYOffset;
                // Ensure next section maintains consistent spacing
                finalScrollPosition = Math.min(finalScrollPosition, nextTop - (viewportHeight * 0.2));
            }

            // Ensure current section doesn't disappear completely
            const minVisibleHeight = viewportHeight * 0.8;
            finalScrollPosition = Math.max(finalScrollPosition, targetTop - minVisibleHeight);
        } else {
            // Scrolling up: position section with very tight spacing
            finalScrollPosition = targetTop - (viewportHeight * 0.2);

            // Adjust for previous section to maintain spacing
            const prevSection = refs.current[sectionIndex - 1];
            if (prevSection) {
                const prevRect = prevSection.getBoundingClientRect();
                const prevBottom = prevRect.bottom + window.pageYOffset;
                // Ensure previous section maintains consistent spacing
                finalScrollPosition = Math.max(finalScrollPosition, prevBottom - (viewportHeight * 0.2));
            }

            // Ensure current section doesn't disappear completely
            const minVisibleHeight = viewportHeight * 0.8;
            finalScrollPosition = Math.min(finalScrollPosition, targetTop + targetHeight - minVisibleHeight);
        }

        const scrollDelta = Math.abs(finalScrollPosition - currentScroll);

        if (scrollDelta > 1) {
            scrollState.current.isAutoScrolling = true;
            scrollState.current.currentSection = sectionIndex;

            if (timeouts.current.autoScroll) {
                clearTimeout(timeouts.current.autoScroll);
            }

            // Ensure we don't scroll past document boundaries
            const maxScroll = Math.max(0, document.documentElement.scrollHeight - viewportHeight);
            finalScrollPosition = Math.max(0, Math.min(finalScrollPosition, maxScroll));

            // Smooth scroll to position with optimized timing
            gsap.to(window, {
                scrollTo: {
                    y: finalScrollPosition,
                    autoKill: true
                },
                duration: 0.9,
                ease: 'power2.inOut',
                overwrite: 'auto',
                onStart: () => {
                    gsap.set(document.documentElement, {
                        willChange: 'scroll-position'
                    });
                },
                onComplete: () => {
                    gsap.set(document.documentElement, {
                        clearProps: 'willChange'
                    });

                    // Verify final position and adjust if needed
                    const finalRect = target.getBoundingClientRect();
                    const targetCenter = finalRect.top + (finalRect.height / 2);
                    const viewportCenter = viewportHeight / 2;
                    const centerOffset = targetCenter - viewportCenter;

                    // Ensure at least one section is always visible
                    const isSectionVisible = finalRect.top < viewportHeight && finalRect.bottom > 0;
                    if (!isSectionVisible || Math.abs(centerOffset) > 1) {
                        gsap.to(window, {
                            scrollTo: {
                                y: finalScrollPosition + centerOffset,
                                autoKill: true
                            },
                            duration: 0.3,
                            ease: 'power2.out',
                            overwrite: 'auto',
                            onComplete: () => {
                                // Add auto push scroll after landing
                                setTimeout(() => {
                                    if (!scrollState.current.isManualScrolling) {
                                        autoPushScroll(target, direction);
                                    }
                                }, 150);
                            }
                        });
                    } else {
                        // Add auto push scroll after normal landing
                        setTimeout(() => {
                            if (!scrollState.current.isManualScrolling) {
                                autoPushScroll(target, direction);
                            }
                        }, 150);
                    }

                    timeouts.current.autoScroll = setTimeout(() => {
                        scrollState.current.isAutoScrolling = false;
                        timeouts.current.state = setTimeout(() => {
                            scrollState.current.isManualScrolling = false;
                        }, 300);
                    }, 300);
                }
            });
        }
    }, [autoPushScroll]);

    // Simultaneous transition handler for coordinated animations
    const handleSimultaneousTransition = useCallback((currentElement: HTMLElement, nextElement: HTMLElement | null, direction: 'forward' | 'backward') => {
        const timeline = gsap.timeline({ overwrite: 'auto' });

        if (direction === 'forward') {
            // Current element disappears
            timeline.to(currentElement, {
                autoAlpha: 0,
                y: -50,
                scale: 0.995,
                duration: 0.5,
                ease: 'power2.inOut',
                force3D: true
            }, 0); // Start at time 0

            // Next element appears simultaneously
            if (nextElement) {
                timeline.to(nextElement, {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.7,
                    ease: 'power2.out',
                    force3D: true
                }, 0); // Also start at time 0 for simultaneous animation
            }
        } else {
            // Current element disappears
            timeline.to(currentElement, {
                autoAlpha: 0,
                y: 50,
                scale: 0.995,
                duration: 0.5,
                ease: 'power2.inOut',
                force3D: true
            }, 0); // Start at time 0

            // Previous element appears simultaneously
            if (nextElement) {
                timeline.to(nextElement, {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.7,
                    ease: 'power2.out',
                    force3D: true
                }, 0); // Also start at time 0 for simultaneous animation
            }
        }

        return timeline;
    }, []);

    // Updated ScrollTrigger handlers with simultaneous transitions
    const initializeAnimations = useCallback(() => {
        if (initialized.current || refs.current.length === 0) return;

        triggers.current.forEach(trigger => trigger.kill());
        triggers.current = [];

        gsap.ticker.fps(60);
        gsap.config({
            force3D: true,
            nullTargetWarn: false
        });

        // First, ensure all sections are properly positioned
        refs.current.forEach((element, index) => {
            if (!element) return;

            // Set initial positions to be very closely packed
            if (index === 0) {
                gsap.set(element, {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    force3D: true
                });
            } else {
                const prevElement = refs.current[index - 1];
                if (prevElement) {
                    const prevRect = prevElement.getBoundingClientRect();
                    const elementRect = element.getBoundingClientRect();
                    // Calculate offset to ensure sections are close but not overlapping
                    const offset = prevRect.bottom - elementRect.top + 1;

                    gsap.set(element, {
                        autoAlpha: 0,
                        y: offset,
                        scale: 0.995,
                        force3D: true
                    });
                }
            }
        });

        refs.current.forEach((element, index) => {
            if (!element) return;

            const scrollTrigger = ScrollTrigger.create({
                trigger: element,
                ...scrollTriggerConfig,
                onEnter: () => {
                    if (scrollState.current.isManualScrolling &&
                        Date.now() - scrollState.current.lastScrollTime < 50) {
                        return;
                    }

                    gsap.to(element, {
                        autoAlpha: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.7,
                        ease: 'power2.out',
                        force3D: true,
                        overwrite: 'auto'
                    });

                    if (!scrollState.current.isManualScrolling) {
                        smoothScrollTo(element, index, 'down', 0.9);
                    }
                },
                onLeave: () => {
                    const next = refs.current[index + 1];

                    // Use simultaneous transition instead of delayed
                    const timeline = handleSimultaneousTransition(element, next, 'forward');

                    if (next && !scrollState.current.isManualScrolling) {
                        // Add auto push scroll after the transition completes
                        timeline.call(() => {
                            smoothScrollTo(next, index + 1, 'down', 0.9);
                        });
                    }
                },
                onEnterBack: () => {
                    if (scrollState.current.isManualScrolling &&
                        Date.now() - scrollState.current.lastScrollTime < 50) {
                        return;
                    }

                    gsap.to(element, {
                        autoAlpha: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.7,
                        ease: 'power2.out',
                        force3D: true,
                        overwrite: 'auto'
                    });

                    if (!scrollState.current.isManualScrolling) {
                        smoothScrollTo(element, index, 'up', 0.9);
                    }
                },
                onLeaveBack: () => {
                    const prev = refs.current[index - 1];

                    // Use simultaneous transition instead of delayed
                    const timeline = handleSimultaneousTransition(element, prev, 'backward');

                    if (prev && !scrollState.current.isManualScrolling) {
                        // Add auto push scroll after the transition completes
                        timeline.call(() => {
                            smoothScrollTo(prev, index - 1, 'up', 0.9);
                        });
                    }
                }
            });

            triggers.current.push(scrollTrigger);
        });

        initialized.current = true;

        gsap.delayedCall(0.1, () => {
            ScrollTrigger.refresh();
        });
    }, [scrollTriggerConfig, smoothScrollTo, handleSimultaneousTransition]);

    const refreshScrollTrigger = useCallback(() => {
        queueOperation(() => {
            ScrollTrigger.refresh();
            // Force repaint for smoother transitions
            document.documentElement.style.transform = 'translateZ(0)';
            requestAnimationFrame(() => {
                document.documentElement.style.transform = '';
            });
        }, true);
    }, [queueOperation]);

    const addToRefs = useCallback((el: HTMLElement | null) => {
        if (el && !refs.current.includes(el)) {
            refs.current.push(el);
            if (!initialized.current) {
                queueOperation(initializeAnimations, true);
            }
        }
    }, [initializeAnimations, queueOperation]);

    const refresh = useCallback(() => {
        initialized.current = false;
        clearAllTimeouts();
        queueOperation(initializeAnimations, true);
    }, [initializeAnimations, queueOperation, clearAllTimeouts]);

    useEffect(() => {
        if (refs.current.length > 0 && !initialized.current) {
            const timeoutId = setTimeout(initializeAnimations, 20);
            return () => clearTimeout(timeoutId);
        }

        // Enhanced scroll detection with shorter manual scroll window
        let scrollTimer: NodeJS.Timeout;
        let lastScrollY = window.pageYOffset;
        let scrollThreshold = 5; // Very small threshold to detect any scroll movement
        let lastScrollTime = Date.now();

        const handleScroll = () => {
            const currentScrollY = window.pageYOffset;
            const scrollDelta = Math.abs(currentScrollY - lastScrollY);
            const scrollDirection = currentScrollY > lastScrollY ? 1 : -1;
            const currentTime = Date.now();

            // Detect any scroll movement
            if (scrollDelta > scrollThreshold || (currentTime - lastScrollTime) < 100) {
                scrollState.current.lastScrollTime = currentTime;
                scrollState.current.scrollDirection = scrollDirection;
                scrollState.current.isManualScrolling = true;
                lastScrollTime = currentTime;
            }

            lastScrollY = currentScrollY;

            // Clear existing timer
            clearTimeout(scrollTimer);

            // Shorter debounced scroll end detection for more auto-scroll
            scrollTimer = setTimeout(() => {
                if (!scrollState.current.isAutoScrolling) {
                    scrollState.current.isManualScrolling = false;
                }
            }, 50);
        };

        // Optimized resize handler
        let resizeTimeout: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                queueOperation(() => {
                    ScrollTrigger.refresh();
                }, true);
            }, 100);
        };

        window.addEventListener('resize', handleResize, { passive: true });
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(resizeTimeout);
            clearTimeout(scrollTimer);
            clearAllTimeouts();
            if (frameId.current) cancelAnimationFrame(frameId.current);
            triggers.current.forEach(trigger => trigger.kill());
            triggers.current = [];
            initialized.current = false;

            // Reset scroll state
            scrollState.current = {
                isAutoScrolling: false,
                isManualScrolling: false,
                lastScrollTime: 0,
                scrollDirection: 0,
                currentSection: -1
            };
        };
    }, [initializeAnimations, queueOperation, clearAllTimeouts]);

    return {
        addToRefs,
        refresh,
        refreshScrollTrigger
    };
};