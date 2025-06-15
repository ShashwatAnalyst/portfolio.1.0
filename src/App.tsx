import { useRef, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import CustomCursor from './components/core/CustomCursor';
import CinematicEntry from './components/core/CinematicEntry';
import ScrollProgressIndicator from './components/core/ScrollProgressIndicator';
import { ThemeProvider } from './components/theme-provider';
import { Sidebar } from './components/core/sidebar';
import { SmoothScroll } from './components/core/SmoothScroll';
import { HeroSection } from './components/hero-section';
import { AboutSection } from './components/about-section';
import { SkillsSection } from './components/core/skills-section';
import { ProjectsSection } from './components/projects-section';
import { ContactSection } from './components/contact-section';
import StarryBackground from './components/core/starry-background';
import { Spacer } from './components/spacer';
import { Toaster } from 'sonner';
import './App.css';

export default function App() {
  const [showCinematic, setShowCinematic] = useState(true);

  // Create refs for each section
  const sections = {
    hero: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    skills: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null)
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen dark:bg-transparent bg-background h-[130vh] lg:h-[80vh] text-foreground">
        <StarryBackground />
        <CustomCursor />
        <ScrollProgressIndicator />
        <Analytics />

        {/* Enhanced scroll indicator */}
        <div className="relative z-20">
          <Sidebar sections={sections} />

          <SmoothScroll>
            <main className="container mx-auto px-4 md:px-8 lg:px-16 pt-0 pb-4 md:pb-8 lg:pb-12">
              <section ref={sections.hero} id="hero">
                <HeroSection />
              </section>

              <Spacer />

              <section ref={sections.about} id="about">
                <AboutSection />
              </section>

              <Spacer />

              <section ref={sections.skills} id="skills">
                <SkillsSection />
              </section>

              <Spacer />

              <section ref={sections.projects} id="projects">
                <ProjectsSection />
              </section>

              <Spacer />

              <section ref={sections.contact} id="contact">
                <ContactSection />
              </section>
            </main>
          </SmoothScroll>
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