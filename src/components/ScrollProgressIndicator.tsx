'use client';
import { useEffect, useRef } from 'react';

const ScrollProgressIndicator = () => {
    const scrollBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (scrollBarRef.current) {
                const { scrollHeight, clientHeight } = document.documentElement;
                const scrollableHeight = scrollHeight - clientHeight;
                const scrollY = window.scrollY;
                const scrollProgress = (scrollY / scrollableHeight) * 100;

                scrollBarRef.current.style.transform = `translateY(-${100 - scrollProgress
                    }%)`;
            }
        };

        handleScroll();

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-[50svh] right-[2%] -translate-y-1/2 w-2 h-[120px] rounded-full bg-background/50 backdrop-blur-sm overflow-hidden z-50">
            <div
                className="w-full  backdrop-blur-sm rounded-full h-full  bg-blue-600  transition-transform duration-150 ease-out"
                ref={scrollBarRef}
            />
        </div>
    );
};

export default ScrollProgressIndicator;