import { useState } from 'react';
import CustomCursor from './components/CustomCursor';
import CinematicEntry from './components/CinematicEntry';
import ScrollProgressIndicator from './components/ScrollProgressIndicator';
import { ThemeProvider } from './components/theme-provider';
import { Sidebar } from './components/sidebar';
import { HeroSection } from './components/hero-section';
import { AboutSection } from './components/about-section';
import { SkillsSection } from './components/skills-section';
import { ProjectsSection } from './components/projects-section';
import { ContactSection } from './components/contact-section';
import StarryBackground from './components/starry-background';
import { Spacer } from './components/spacer';
import { Toaster } from 'sonner';
import './App.css';

// Replace useScrollAnimation with UltraSmoothScroll
import { useUltraSmoothScroll } from './hooks/UltraSmoothScroll';

export default function App() {
  const [showCinematic, setShowCinematic] = useState(true);
  const { containerRef, contentRef, addSection } = useUltraSmoothScroll();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background text-foreground">
        <StarryBackground />
        <CustomCursor />
        <ScrollProgressIndicator />

        {/* Enhanced scroll indicator */}
        <div className="relative z-20">
          <Sidebar />

          {/* Add smooth scroll container and content refs */}
          <div ref={containerRef} className="smooth-scroll-container">
            <div ref={contentRef} className="smooth-scroll-content">
              <main className="container mx-auto px-4 md:px-8 lg:px-16 pt-0 pb-4 md:pb-8 lg:pb-12">
                <div ref={(el) => el && addSection(el, 'hero')} className="scroll-section">
                  <HeroSection />
                </div>

                <Spacer />

                <div ref={(el) => el && addSection(el, 'about')} className="scroll-section">
                  <AboutSection />
                </div>

                <Spacer />

                <div ref={(el) => el && addSection(el, 'skills')} className="scroll-section">
                  <SkillsSection />
                </div>

                <Spacer />

                <div ref={(el) => el && addSection(el, 'projects')} className="scroll-section">
                  <ProjectsSection />
                </div>

                <Spacer />

                <div ref={(el) => el && addSection(el, 'contact')} className="scroll-section">
                  <ContactSection />
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>

      {showCinematic && (
        <div className="fixed inset-0 z-[9999]">
          <CinematicEntry onComplete={() => setShowCinematic(false)} />
        </div>
      )}

      <Toaster richColors position="top-center" />
    </ThemeProvider>
  );
}