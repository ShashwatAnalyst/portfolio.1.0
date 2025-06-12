import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export function useUltraSmoothScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [sections, setSections] = useState<{ element: HTMLElement; id: string }[]>([]);
    const smootherRef = useRef<ScrollSmoother | null>(null);

    useEffect(() => {
        if (!containerRef.current || !contentRef.current) return;

        // Create ScrollSmoother instance
        smootherRef.current = ScrollSmoother.create({
            wrapper: containerRef.current,
            content: contentRef.current,
            smooth: 1.5,
            effects: true,
        });

        return () => {
            smootherRef.current?.kill();
        };
    }, []);

    const addSection = (element: HTMLElement | null, id: string) => {
        if (!element) return;
        setSections(prev => [...prev, { element, id }]);
    };

    const scrollToSection = (sectionId: string) => {
        const section = sections.find(s => s.id === sectionId);
        if (!section || !smootherRef.current) return;

        const { element } = section;
        const offset = element.offsetTop;

        smootherRef.current.scrollTo(offset, true, 'center center');
    };

    return {
        containerRef,
        contentRef,
        addSection,
        scrollToSection,
    };
}