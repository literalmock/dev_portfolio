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
import ExperienceSection from './components/ExperienceSection';
import FreelanceSection from './components/FreelanceSection';
import Seo from './components/Seo';

gsap.registerPlugin(ScrollTrigger);

const paths = ['/', '/projects', '/blogs', '/freelance'];
// Old "#/projects" links still work: rewrite them to "/projects" on load.
if (location.hash.startsWith('#/')) history.replaceState(null, '', location.hash.slice(1));
const readPath = () => { const p = location.pathname.replace(/\/+$/, '') || '/'; return paths.includes(p) ? p : '/'; };

let freelanceSeen = false; // freelance animations only play on its first visit per page load

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [path, setPath] = useState(readPath);

  useEffect(() => {
    const on = () => { setPath(readPath()); window.scrollTo(0, 0); };
    // Internal links (href="/projects") switch routes without a page reload.
    const click = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.target || a.origin !== location.origin || !paths.includes(a.pathname)) return;
      e.preventDefault();
      if (a.pathname !== location.pathname) history.pushState(null, '', a.pathname);
      on();
    };
    window.addEventListener('popstate', on);
    document.addEventListener('click', click);
    return () => { window.removeEventListener('popstate', on); document.removeEventListener('click', click); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : '';
    if (isLoading || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const skipFreelance = path === '/freelance' && freelanceSeen;
    if (path === '/freelance') freelanceSeen = true;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        if (skipFreelance && element.closest('#freelance')) return;
        gsap.fromTo(element, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .65, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 88%', once: true } });
      });
    });
    return () => ctx.revert();
  }, [isLoading, path]);

  return (
    <>
      <AnimatePresence mode="wait">{isLoading && <Preloader onComplete={() => setIsLoading(false)} />}</AnimatePresence>
      <Seo path={path} />
      <Effects />
      <NavigationBar path={path} />
      <main className="relative z-10 mx-auto max-w-[680px] px-6 pb-28">
        {path === '/' && <><HeroSection /><ExperienceSection /><SkillsSection /><ContactSection /></>}
        {path === '/projects' && <><ProjectsSection /><ContactSection /></>}
        {path === '/blogs' && <BlogSection />}
        {path === '/freelance' && <><FreelanceSection /><ContactSection /></>}
      </main>
      <Dock path={path} />
    </>
  );
}
