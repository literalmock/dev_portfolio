import { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NavigationBar from './components/NavigationBar';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import Preloader from './components/Preloader';
import BlogSection from './components/BlogSection';
import Dock from './components/Dock';
import Effects from './components/Effects';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : '';
    if (isLoading || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.fromTo(element, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .65, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 88%', once: true } });
      });
    });
    return () => ctx.revert();
  }, [isLoading]);

  return (
    <>
      <AnimatePresence mode="wait">{isLoading && <Preloader onComplete={() => setIsLoading(false)} />}</AnimatePresence>
      <Effects />
      <NavigationBar />
      <main className="relative z-10 mx-auto max-w-[680px] px-6 pb-28">
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Dock />
    </>
  );
}
