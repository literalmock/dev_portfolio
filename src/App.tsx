import React, { useEffect, useRef } from 'react';
import NavigationBar from './components/NavigationBar';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
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
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-[#0a0a0a] text-white selection:bg-white selection:text-black">
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
