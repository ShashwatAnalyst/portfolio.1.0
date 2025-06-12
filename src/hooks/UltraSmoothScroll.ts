import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Flip } from 'gsap/Flip';
import { Observer } from 'gsap/Observer';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { TextPlugin } from 'gsap/TextPlugin';
import { Draggable } from 'gsap/Draggable';
import { EaselPlugin } from 'gsap/EaselPlugin';
import { PixiPlugin } from 'gsap/PixiPlugin';
import { CustomEase } from 'gsap/CustomEase';
import { CustomBounce } from 'gsap/CustomBounce';
import { CustomWiggle } from 'gsap/CustomWiggle';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathHelper } from 'gsap/MotionPathHelper';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';
import { PhysicsPropsPlugin } from 'gsap/PhysicsPropsPlugin';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { SplitText } from 'gsap/SplitText';

// Register all GSAP plugins
gsap.registerPlugin(
    ScrollSmoother,
    ScrollTrigger,
    MotionPathPlugin,
    Flip,
    Observer,
    ScrollToPlugin,
    TextPlugin,
    Draggable,
    EaselPlugin,
    PixiPlugin,
    CustomEase,
    CustomBounce,
    CustomWiggle,
    MorphSVGPlugin,
    DrawSVGPlugin,
    MotionPathHelper,
    Physics2DPlugin,
    PhysicsPropsPlugin,
    ScrambleTextPlugin,
    SplitText
);

interface Section {
    element: HTMLElement;
    id: string;
}

export function useUltraSmoothScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [sections, setSections] = useState<Section[]>([]);
    const smootherRef = useRef<ScrollSmoother | null>(null);

    useEffect(() => {
        if (!containerRef.current || !contentRef.current) return;

        // Create ScrollSmoother instance
        smootherRef.current = ScrollSmoother.create({
            wrapper: containerRef.current,
            content: contentRef.current,
            smooth: 1.5,
            effects: true,
            normalizeScroll: true,
            smoothTouch: 0.1,
        });

        // Cleanup function
        return () => {
            if (smootherRef.current) {
                smootherRef.current.kill();
                smootherRef.current = null;
            }
        };
    }, []);

    const addSection = (element: HTMLElement | null, id: string) => {
        if (!element) return;

        // Check if section already exists
        const exists = sections.some(s => s.id === id);
        if (!exists) {
            setSections(prev => [...prev, { element, id }]);
        }
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