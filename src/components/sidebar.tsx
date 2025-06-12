import { Button } from './ui/button';
import { Mail } from 'lucide-react';
import { useState } from 'react';
import { GithubIcon, LinkedInIcon, TwitterIcon } from './social-icons';

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const scrollToSection = (sectionId: string) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
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
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-background/95 backdrop-blur-md z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full p-6">
                    {/* Navigation Links */}
                    <div className="flex flex-col gap-4 mt-16">
                        <div
                            className="flex items-center text-lg hover:text-primary transition-colors duration-300 group"
                            onClick={() => scrollToSection('home')}
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
                            onClick={() => scrollToSection('about')}
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
                            onClick={() => scrollToSection('skills')}
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
                            onClick={() => scrollToSection('projects')}
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
                            onClick={() => scrollToSection('contact')}
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
                    <div className="mt-auto pt-8 border-t border-border">
                        <h3 className="text-lg font-semibold mb-4">GET IN TOUCH</h3>

                        {/* Email */}
                        <div className="flex items-center gap-2 text-muted-foreground mb-4">
                            <Mail className="w-4 h-4" />
                            <span>shashwat98k@gmail.com</span>
                        </div>

                        {/* Social Media Buttons */}
                        <div className="flex gap-4">
                            <Button variant="ghost" size="icon" className="hover:scale-110 transition-all w-14 h-14" aria-label="GitHub">
                                <GithubIcon />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:scale-110 transition-all w-14 h-14" aria-label="LinkedIn">
                                <LinkedInIcon />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:scale-110 transition-all w-14 h-14" aria-label="Twitter">
                                <TwitterIcon />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 