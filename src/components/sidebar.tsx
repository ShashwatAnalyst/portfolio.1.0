import React, { useState } from 'react';
import { Button } from './ui/button';
import { Sun, Moon } from 'lucide-react';
import { GithubIcon, LinkedInIcon, TwitterIcon } from './social-icons';
import { useTheme } from 'next-themes';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

interface SidebarProps {
    sections: {
        [key: string]: React.RefObject<HTMLElement>;
    };
}

export const Sidebar: React.FC<SidebarProps> = ({ sections }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, setTheme } = useTheme();

    const handleNavClick = (e: React.MouseEvent<HTMLDivElement>, sectionId: string) => {
        e.preventDefault();
        const section = sections[sectionId]?.current;
        if (!section) return;

        // Get the ScrollSmoother instance
        const smoother = ScrollSmoother.get();
        if (!smoother) return;

        // Scroll to the section using GSAP's ScrollSmoother
        smoother.scrollTo(section, true, "center center");
        setIsOpen(false);
    };

    return (
        <>
            <div className="fixed top-4 left-4 z-[100]">
                <label htmlFor="menu-check" className="flex flex-col w-[40px] h-[40px] cursor-pointer justify-center">
                    <input
                        type="checkbox"
                        id="menu-check"
                        className="hidden peer"
                        checked={isOpen}
                        onChange={() => setIsOpen(!isOpen)}
                    />
                    <span className="bg-blue-600 rounded-[2px] h-[3px] mb-[6px] transition-all duration-300 ease-in-out w-full peer-checked:rotate-45 peer-checked:translate-y-[4.5px]"></span>
                    <span className="bg-blue-600 rounded-[2px] h-[3px] transition-all duration-300 ease-in-out w-full peer-checked:-rotate-45 peer-checked:-translate-y-[4.5px]"></span>
                </label>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full w-[400px] sm:w-[400px] w-[230px] bg-background/95 backdrop-blur-sm z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-8 h-full flex flex-col items-center">
                    <div className="flex mt-16">
                        {/* Navigation Links */}
                        <div className="flex flex-col gap-4">
                            <h2 className="text-lg font-semibold mb-2 pl-4">MENU</h2>
                            <div
                                className="flex items-center text-lg hover:text-primary transition-colors duration-300 group"
                                onClick={(e) => handleNavClick(e, 'hero')}
                            >
                                <div className="relative w-4 h-4 rounded-full bg-blue-500 mr-3 group-hover:scale-150 transition-transform duration-300">
                                    <svg className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                Home
                            </div>
                            <div
                                className="flex items-center text-lg hover:text-primary transition-colors duration-300 group"
                                onClick={(e) => handleNavClick(e, 'about')}
                            >
                                <div className="relative w-4 h-4 rounded-full bg-purple-500 mr-3 group-hover:scale-150 transition-transform duration-300">
                                    <svg className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                About
                            </div>
                            <div
                                className="flex items-center text-lg hover:text-primary transition-colors duration-300 group"
                                onClick={(e) => handleNavClick(e, 'skills')}
                            >
                                <div className="relative w-4 h-4 rounded-full bg-green-500 mr-3 group-hover:scale-150 transition-transform duration-300">
                                    <svg className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                Skills
                            </div>
                            <div
                                className="flex items-center text-lg hover:text-primary transition-colors duration-300 group"
                                onClick={(e) => handleNavClick(e, 'projects')}
                            >
                                <div className="relative w-4 h-4 rounded-full bg-orange-500 mr-3 group-hover:scale-150 transition-transform duration-300">
                                    <svg className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                Projects
                            </div>
                            <div
                                className="flex items-center text-lg hover:text-primary transition-colors duration-300 group"
                                onClick={(e) => handleNavClick(e, 'contact')}
                            >
                                <div className="relative w-4 h-4 rounded-full bg-pink-500 mr-3 group-hover:scale-150 transition-transform duration-300">
                                    <svg className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                Contact
                            </div>
                        </div>

                        {/* Social Media and Theme Buttons */}
                        <div className="flex flex-col gap-4 ml-24 sm:ml-24 ml-8">
                            <h2 className="text-lg font-semibold mb-2">SOCIAL</h2>
                            <Button
                                variant="outline"
                                size="icon"
                                className="w-[50px]"
                                onClick={() => window.open('https://github.com/itsshashwatsingh', '_blank')}
                            >
                                <GithubIcon className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="w-[50px]"
                                onClick={() => window.open('https://www.linkedin.com/in/shashwat-singh-bb2730357/', '_blank')}
                            >
                                <LinkedInIcon className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="w-[50px]"
                                onClick={() => window.open('https://x.com/ShashwatSi48402', '_blank')}
                            >
                                <TwitterIcon className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Theme Toggle and Email at the bottom */}
                    <div className="mt-auto mb-8 flex flex-col items-center gap-4">
                        <Button
                            variant="outline"
                            size="icon"
                            className="w-[50px]"
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-4 h-4" />
                            ) : (
                                <Moon className="w-4 h-4" />
                            )}
                        </Button>
                        <div className="w-full flex flex-col items-center gap-4">
                            <div className="w-full h-[1px] bg-border"></div>
                            <h2 className="text-lg font-semibold">GET IN TOUCH</h2>
                            <div className="text-muted-foreground">
                                shashwat98k@gmail.com
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 