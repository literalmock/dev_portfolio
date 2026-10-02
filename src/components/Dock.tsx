import { useEffect, useState } from 'react';
import { BookOpen, Briefcase, Home, Mail, Moon, Sun, Wrench } from 'lucide-react';

const items = [
  { id: 'top', label: 'Home', icon: Home },
  { id: 'work', label: 'Work', icon: Briefcase },
  { id: 'skills', label: 'Toolkit', icon: Wrench },
  { id: 'blog', label: 'Blog', icon: BookOpen },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export default function Dock() {
  const [active, setActive] = useState('top');
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === 'dark');

  useEffect(() => {
    if (dark) document.documentElement.dataset.theme = 'dark'; else delete document.documentElement.dataset.theme;
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch { /* ignore */ }
  }, [dark]);

  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' });
    items.forEach((i) => { const el = document.getElementById(i.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  return (
    <nav className="dock" aria-label="Quick navigation">
      {items.map(({ id, label, icon: Icon }) => (
        <a key={id} href={'#' + id} aria-label={label} data-label={label} className={'dock-item' + (active === id ? ' on' : '')}><Icon size={17} /></a>
      ))}
      <span className="dock-sep" />
      <button onClick={() => setDark(!dark)} aria-label="Toggle theme" data-label={dark ? 'Light' : 'Dark'} className="dock-item">{dark ? <Sun size={17} /> : <Moon size={17} />}</button>
    </nav>
  );
}
