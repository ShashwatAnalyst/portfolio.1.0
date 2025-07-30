import React from 'react';
import { Button } from '../ui/button';
import { Sun, Moon } from 'lucide-react';
import { GithubIcon, LinkedInIcon, TwitterIcon } from '../social-icons';
import { useTheme } from 'next-themes';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

interface NavbarProps {
    sections: {
        [key: string]: React.RefObject<HTMLElement>;
    };
}

export const Navbar: React.FC<NavbarProps> = ({ sections }) => {
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
    };

    return (
        <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[100] w-[95%] max-w-6xl">
            <div className="bg-white/10 dark:bg-black/10 backdrop-blur-lg rounded-2xl border border-white/20 dark:border-white/10 shadow-xl px-4 py-3 md:px-6 md:py-4">
                <div className="flex items-center justify-center">
                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <div
className="flex items-center text-sm font-medium text-gray-500 hover:text-blue-700 transition-colors duration-300 group cursor-pointer"
onClick={(e) => handleNavClick(e, 'hero')}
                        >
                            <div className="relative w-3 h-3 rounded-full bg-blue-500 mr-2 group-hover:scale-125 transition-transform duration-300">
                                <svg className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            Home
                        </div>
                        <div
className="flex items-center text-sm font-medium text-gray-500 hover:text-blue-700 transition-colors duration-300 group cursor-pointer"
onClick={(e) => handleNavClick(e, 'about')}
                        >
                            <div className="relative w-3 h-3 rounded-full bg-purple-500 mr-2 group-hover:scale-125 transition-transform duration-300">
                                <svg className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            About
                        </div>
                        <div
className="flex items-center text-sm font-medium text-gray-500 hover:text-blue-700 transition-colors duration-300 group cursor-pointer"
onClick={(e) => handleNavClick(e, 'skills')}
                        >
                            <div className="relative w-3 h-3 rounded-full bg-green-500 mr-2 group-hover:scale-125 transition-transform duration-300">
                                <svg className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            Skills
                        </div>
                        <div
className="flex items-center text-sm font-medium text-gray-500 hover:text-blue-700 transition-colors duration-300 group cursor-pointer"
onClick={(e) => handleNavClick(e, 'projects')}
                        >
                            <div className="relative w-3 h-3 rounded-full bg-orange-500 mr-2 group-hover:scale-125 transition-transform duration-300">
                                <svg className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            Projects
                        </div>
                        <div
className="flex items-center text-sm font-medium text-gray-500 hover:text-blue-700 transition-colors duration-300 group cursor-pointer"
onClick={(e) => handleNavClick(e, 'contact')}
                        >
                            <div className="relative w-3 h-3 rounded-full bg-pink-500 mr-2 group-hover:scale-125 transition-transform duration-300">
                                <svg className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            Contact
                        </div>
                    </div>

                    {/* Social Media and Theme Buttons */}
                    <div className="flex items-center gap-3 ml-8">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="w-30 h-30 rounded-full bg-white/10 hover:bg-white/30 dark:bg-black/10 dark:hover:bg-white/20 backdrop-blur-sm border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-110 hover:rotate-12 hover:shadow-lg hover:shadow-white/20 dark:hover:shadow-black/30 group"
                            onClick={() => window.open('https://github.com/shashwatanalyst', '_blank')}
                        >
                            <GithubIcon className="w-4 h-4 transition-all duration-300 group-hover:scale-110 group-hover:text-gray-800 dark:group-hover:text-white" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="w-30 h-30 rounded-full bg-white/10 hover:bg-blue-500/20 dark:bg-black/10 dark:hover:bg-blue-500/30 backdrop-blur-sm border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-110 hover:-rotate-12 hover:shadow-lg hover:shadow-blue-500/20 dark:hover:shadow-blue-400/30 group"
                            onClick={() => window.open('https://www.linkedin.com/in/shashwat-singh-bb2730357/', '_blank')}
                        >
                            <LinkedInIcon className="w-4 h-4 transition-all duration-300 group-hover:scale-110 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="w-30 h-30 rounded-full bg-white/10 hover:bg-sky-500/20 dark:bg-black/10 dark:hover:bg-sky-500/30 backdrop-blur-sm border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-110 hover:rotate-12 hover:shadow-lg hover:shadow-sky-500/20 dark:hover:shadow-sky-400/30 group"
                            onClick={() => window.open('https://x.com/ShashwatSi48402', '_blank')}
                        >
                            <TwitterIcon className="w-4 h-4 transition-all duration-300 group-hover:scale-110 group-hover:text-sky-500 dark:group-hover:text-sky-400" />
                        </Button>
                        <div className="w-px h-6 bg-white/20 dark:bg-white/10 mx-2"></div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="w-30 h-30 rounded-full bg-white/10 hover:bg-yellow-500/20 dark:bg-black/10 dark:hover:bg-yellow-500/30 backdrop-blur-sm border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-110 hover:rotate-180 hover:shadow-lg hover:shadow-yellow-500/20 dark:hover:shadow-yellow-400/30 group"
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-4 h-4 transition-all duration-300 group-hover:scale-110 group-hover:text-yellow-500 dark:group-hover:text-yellow-400" />
                            ) : (
                                <Moon className="w-4 h-4 transition-all duration-300 group-hover:scale-110 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation - Hidden for now, can be implemented later */}
                <div className="md:hidden mt-3 pt-3 border-t border-white/20 dark:border-white/10">
                    <div className="flex flex-wrap gap-3 justify-center">
                        <div
                            className="flex items-center text-sm font-medium hover:text-primary transition-colors duration-300 group cursor-pointer"
                            onClick={(e) => handleNavClick(e, 'hero')}
                        >
                            <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                            Home
                        </div>
                        <div
                            className="flex items-center text-sm font-medium hover:text-primary transition-colors duration-300 group cursor-pointer"
                            onClick={(e) => handleNavClick(e, 'about')}
                        >
                            <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                            About
                        </div>
                        <div
                            className="flex items-center text-sm font-medium hover:text-primary transition-colors duration-300 group cursor-pointer"
                            onClick={(e) => handleNavClick(e, 'skills')}
                        >
                            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                            Skills
                        </div>
                        <div
                            className="flex items-center text-sm font-medium hover:text-primary transition-colors duration-300 group cursor-pointer"
                            onClick={(e) => handleNavClick(e, 'projects')}
                        >
                            <div className="w-2 h-2 rounded-full bg-orange-500 mr-2"></div>
                            Projects
                        </div>
                        <div
                            className="flex items-center text-sm font-medium hover:text-primary transition-colors duration-300 group cursor-pointer"
                            onClick={(e) => handleNavClick(e, 'contact')}
                        >
                            <div className="w-2 h-2 rounded-full bg-pink-500 mr-2"></div>
                            Contact
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};