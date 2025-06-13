import { Button } from './ui/button';
import { Mail, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { GithubIcon, LinkedInIcon, TwitterIcon } from './social-icons';
import { useTheme } from 'next-themes';
import { useUltraSmoothScroll } from '@/hooks/UltraSmoothScroll';

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const { scrollToSection } = useUltraSmoothScroll();

    const handleNavigation = (sectionId: string) => {
        const sectionMap: { [key: string]: number } = {
            'hero': 0,
            'about': 1,
            'skills': 2,
            'projects': 3,
            'contact': 4
        };

        if (sectionMap[sectionId] !== undefined) {
            scrollToSection(sectionMap[sectionId]);
        }
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
                    <span className="bg-foreground rounded-[2px] h-[3px] mb-[6px] transition-all duration-300 ease-in-out w-full peer-checked:rotate-45 peer-checked:translate-y-[4.5px]"></span>
                    <span className="bg-foreground rounded-[2px] h-[3px] transition-all duration-300 ease-in-out w-full peer-checked:-rotate-45 peer-checked:-translate-y-[4.5px]"></span>
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
            <div className={`fixed top-0 left-0 h-full w-[300px] bg-background/95 backdrop-blur-sm z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-8">
                    <div className="flex flex-col gap-4 mt-16">
                        <div
                            className="flex items-center text-lg hover:text-primary transition-colors duration-300 group"
                            onClick={() => handleNavigation('hero')}
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
                            onClick={() => handleNavigation('about')}
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
                            onClick={() => handleNavigation('skills')}
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
                            onClick={() => handleNavigation('projects')}
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
                            onClick={() => handleNavigation('contact')}
                        >
                            <div className="relative w-4 h-4 rounded-full bg-pink-500 mr-3 group-hover:scale-150 transition-transform duration-300">
                                <svg className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            Contact
                        </div>
                    </div>

                    {/* Get in Touch Section */}
                    <div className="mt-16">
                        <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
                        <div className="space-y-4">
                            <Button
                                variant="outline"
                                className="w-full justify-start gap-2"
                                onClick={() => window.location.href = 'mailto:shashwatsingh2004@gmail.com'}
                            >
                                <Mail className="w-4 h-4" />
                                shashwatsingh2004@gmail.com
                            </Button>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="flex-1"
                                    onClick={() => window.open('https://github.com/itsshashwatsingh', '_blank')}
                                >
                                    <GithubIcon className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="flex-1"
                                    onClick={() => window.open('https://www.linkedin.com/in/shashwat-singh-2004/', '_blank')}
                                >
                                    <LinkedInIcon className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="flex-1"
                                    onClick={() => window.open('https://twitter.com/itsshashwatsingh', '_blank')}
                                >
                                    <TwitterIcon className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Theme Toggle */}
                    <div className="mt-8">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="w-full"
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-4 h-4" />
                            ) : (
                                <Moon className="w-4 h-4" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
} 