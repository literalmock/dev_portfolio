import { useEffect, useRef, useState, type MouseEvent as RMouseEvent, type ReactNode } from 'react';

/** Custom cursor (dot + lagging ring), background spotlight, scroll progress bar. */
export default function Effects() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const spot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
    if (fine) document.body.classList.add('has-cursor');
    let x = innerWidth / 2, y = innerHeight / 3, rx = x, ry = y, raf = 0;

    const move = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      spot.current?.style.setProperty('--mx', x + 'px');
      spot.current?.style.setProperty('--my', y + 'px');
      const t = (e.target as HTMLElement).closest('a,button,[data-hover]');
      ring.current?.classList.toggle('active', !!t);
    };
    const scroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    };
    const tick = () => {
      rx += (x - rx) * 0.16; ry += (y - ry) * 0.16;
      if (dot.current) dot.current.style.transform = `translate(${x}px,${y}px)`;
      if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px)`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    addEventListener('mousemove', move);
    addEventListener('scroll', scroll, { passive: true });
    return () => { cancelAnimationFrame(raf); removeEventListener('mousemove', move); removeEventListener('scroll', scroll); document.body.classList.remove('has-cursor'); };
  }, []);

  return (
    <>
      <div className="progress" ref={bar} />
      <div className="spotlight" ref={spot} />
      <div className="grain" />
      <div className="cursor-ring" ref={ring} />
      <div className="cursor-dot" ref={dot} />
    </>
  );
}

const GLYPHS = 'abcdefghijklmnopqrstuvwxyz0123456789#/_<>';

/** Text that scrambles into place on mount and on hover. */
export function Scramble({ text, className }: { text: string; className?: string }) {
  const [out, setOut] = useState(text);
  const timer = useRef(0);

  const run = () => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    clearInterval(timer.current);
    timer.current = window.setInterval(() => {
      frame++;
      setOut(text.split('').map((c, i) => c === ' ' ? ' ' : i < frame / 2 ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]).join(''));
      if (frame / 2 >= text.length) { clearInterval(timer.current); setOut(text); }
    }, 30);
  };

  useEffect(() => { const t = setTimeout(run, 900); return () => { clearTimeout(t); clearInterval(timer.current); }; }, [text]);
  return <span className={className} onMouseEnter={run} data-hover aria-label={text}>{out}</span>;
}

/** Wrapper that pulls its child slightly toward the cursor. */
export function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const move = (e: RMouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.3}px,${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ''; };
  return <span ref={ref} onMouseMove={move} onMouseLeave={leave} className="inline-block transition-transform duration-200 ease-out">{children}</span>;
}
