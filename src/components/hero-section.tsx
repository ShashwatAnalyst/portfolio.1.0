import { Download, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useState, useEffect } from 'react';

export function HeroSection() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 450);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleContactClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;

    // Get the ScrollSmoother instance
    const smoother = ScrollSmoother.get();
    if (!smoother) return;

    // Scroll to the section using GSAP's ScrollSmoother
    smoother.scrollTo(contactSection, true, "center center");
  };

  return (
    <section id="hero" className={`flex items-start ${isSmallScreen ? 'pt-12' : 'pt-32'} justify-center`}>
      <div className="container mx-auto px-8 md:px-16 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <h1 className={`${isSmallScreen ? 'text-xl md:text-3xl' : 'text-4xl md:text-6xl'} heading-font tracking-tight`}>
              <span className="bg-blue-600 bg-clip-text text-transparent">
                DATA ANALYST
              </span>
            </h1>
            
            <p className={`${isSmallScreen ? 'text-xs md:text-sm' : 'text-lg'} text-muted-foreground ${isSmallScreen ? 'text-[12px]' : 'text-[18.5px]'} max-w-lg mx-auto lg:mx-0 leading-relaxed`}>
            Hi! I'm <strong>Shashwat</strong>. A passionate Data Analyst with a B.Tech in Computer Science and Engineering (specialization in Big Data Analytics) from SRM Institute of Science and Technology. 
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Button size={isSmallScreen ? "sm" : "lg"} className={`gap-2 bg-blue-600 text-white hover:bg-black hover:text-white transition-all hover:scale-105 ${isSmallScreen ? 'text-xs px-2 py-1' : ''}`}>
              <Download className={`${isSmallScreen ? 'w-3 h-3' : 'w-4 h-4'}`} />
              Download CV
            </Button>
            <Button
              size={isSmallScreen ? "sm" : "lg"}
              className={`gap-2 bg-blue-600 text-white hover:bg-black hover:text-white transition-all hover:scale-105 ${isSmallScreen ? 'text-xs px-2 py-1' : ''}`}
              onClick={handleContactClick}
            >
              <Mail className={`${isSmallScreen ? 'w-3 h-3' : 'w-4 h-4'}`} />
              Contact Me
            </Button>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          {isSmallScreen ? (
            <div className="relative">
              <div className="relative top-[10px] h-[150px] w-[150px] mx-auto rounded-full overflow-hidden border-4 border-gray-800 dark:border-border backdrop-blur-sm transform hover:scale-105 transition-all duration-500 hover:rotate-2 animate-float z-10">
                <img
                  src="/images/profile.png"
                  alt="Profile"
                  className="w-full h-full object-contain rounded-full transition-transform duration-700 hover:scale-110"
                  style={{ objectPosition: 'center top' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 dark:from-background/50 to-transparent"></div>
              </div>
             
            </div>
          ) : (
            <div className="relative lg:right-[-50px] lg:-top-[50px] md:-right-[120px] md:-top-[30px] transform -translate-x-[100px]">
              <div className="relative -right-[130px] top-[20px] h-[150px] w-[150px] lg:-right-[00px] md:-right-[20px] md:top-[20px] lg:w-[300px] lg:h-[300px] md:h-[150px] md:w-[150px] rounded-full overflow-hidden border-4 border-gray-800 dark:border-border backdrop-blur-sm transform hover:scale-105 transition-all duration-500 hover:rotate-2 animate-float z-10 translate-x-[-50px] translate-y-[50px]">
                <img
                  src="/images/profile.png"
                  alt="Profile"
                  className="w-full h-full object-contain rounded-full transition-transform duration-700 hover:scale-110"
                  style={{ objectPosition: 'center top' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 dark:from-background/50 to-transparent"></div>
              </div>
              
            </div>
          )}
        </div>
      </div>
    </section>
  );
}