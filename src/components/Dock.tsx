import { useEffect, useState } from 'react';
import { BookOpen, Briefcase, Home, Moon, Sun, Layers } from 'lucide-react';

export const routes = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/projects', label: 'Projects', icon: Layers },
  { path: '/blogs', label: 'Blogs', icon: BookOpen },
  { path: '/freelance', label: 'Freelance', icon: Briefcase },
];

export default function Dock({ path }: { path: string }) {
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === 'dark');

  useEffect(() => {
    if (dark) document.documentElement.dataset.theme = 'dark'; else delete document.documentElement.dataset.theme;
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch { /* ignore */ }
  }, [dark]);

  return (
    <nav className="dock" aria-label="Primary">
      {routes.map(({ path: p, label, icon: Icon }) => (
        <a key={p} href={p} aria-label={label} aria-current={path === p ? 'page' : undefined} data-label={label} className={'dock-item' + (path === p ? ' on' : '')}><Icon size={17} /></a>
      ))}
      <span className="dock-sep" />
      <button onClick={() => setDark(!dark)} aria-label="Toggle theme" data-label={dark ? 'Light' : 'Dark'} className="dock-item">{dark ? <Sun size={17} /> : <Moon size={17} />}</button>
    </nav>
  );
}
