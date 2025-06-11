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

// 👇 Import the hook
import { useScrollAnimation } from './hooks/useScrollAnimation'; // Adjust path accordingly

export default function App() {
  const [showCinematic, setShowCinematic] = useState(true);
  const { addToRefs } = useScrollAnimation(); // 👈 Use hook

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-black text-white">
        <StarryBackground />
        <CustomCursor />
        <ScrollProgressIndicator />
        <div className="relative z-20">
          <Sidebar />
          <main className="container mx-auto px-4 md:px-8 lg:px-16 py-8 md:py-16 lg:py-24">

            {/* Wrapped sections in <div ref={addToRefs}> for scroll animation */}
            <div ref={addToRefs}><HeroSection /></div>
            <Spacer />
            <div ref={addToRefs}><AboutSection /></div>
            <Spacer />
            <div ref={addToRefs}><SkillsSection /></div>
            <Spacer />
            <div ref={addToRefs}><ProjectsSection /></div>
            <Spacer />

          </main>

          <div ref={addToRefs}><ContactSection /></div>
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

