'use client';
import { useEffect, useRef } from 'react';

const ScrollProgressIndicator = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            const scrollableHeight = scrollHeight - clientHeight;
            const progress = (scrollTop / scrollableHeight) * 100;

            if (scrollRef.current) {
                scrollRef.current.style.width = `${progress}%`;
            }
        };

        handleScroll(); // run once initially
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-[6px] bg-transparent z-[9999]">
            <div
                ref={scrollRef}
                className="h-full bg-black dark:bg-white transition-all duration-150 ease-out"
            />
        </div>
    );
};

export default ScrollProgressIndicator;
