import React, { useEffect, useState } from 'react';
import NavigationBar from './components/NavigationBar';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence } from 'motion/react';
import Preloader from './components/Preloader';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      // Lock window at top
      window.scrollTo(0, 0);
      return;
    } else {
      document.body.style.overflow = 'auto';
    }

    // Reveal animations for sections
    const sections = ['hero', 'projects', 'skills', 'contact'];
    sections.forEach(section => {
      gsap.fromTo(`#${section}`, 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          scrollTrigger: {
            trigger: `#${section}`,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, [isLoading]);

  return (
    <main className="relative min-h-screen w-full bg-background text-white selection:bg-white selection:text-black">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      <NavigationBar />
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20 space-y-32">
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </div>
      
      {/* Subtle background noise/texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </main>
  );
}
