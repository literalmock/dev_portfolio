import { useEffect, useRef, useState, type MouseEvent as RMouseEvent, type ReactNode } from 'react';

/** Custom cursor (dot + lagging ring), background spotlight, scroll progress bar. */
const CLICK_VOLUME = 0.25;
let audio: AudioContext | undefined;
let clickBuf: AudioBuffer | undefined;

/** Loads and decodes the click sample once, so playback is instant and clicks can overlap. */
async function loadClick() {
  try {
    audio ??= new AudioContext();
    const res = await fetch('/sounds/click.mp3');
    clickBuf = await audio.decodeAudioData(await res.arrayBuffer());
  } catch { /* audio unavailable */ }
}

function softClick() {
  try {
    if (!audio || !clickBuf) { void loadClick(); return; }
    if (audio.state === 'suspended') void audio.resume();
    const src = audio.createBufferSource(), g = audio.createGain();
    src.buffer = clickBuf; g.gain.value = CLICK_VOLUME;
    src.connect(g).connect(audio.destination); src.start();
  } catch { /* audio unavailable */ }
}

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
    // Click sample on interactive elements only (rows in the Past work list make their own sound).
    const click = (e: MouseEvent) => { const t = (e.target as HTMLElement).closest('a,button,[role="button"],[data-hover]'); if (t && !t.closest('.work')) softClick(); };
    void loadClick(); // preload so even the first click plays
    addEventListener('click', click, true); // capture: runs before React re-renders and detaches the clicked icon
    addEventListener('mousemove', move);
    addEventListener('scroll', scroll, { passive: true });
    return () => { cancelAnimationFrame(raf); removeEventListener('mousemove', move); removeEventListener('click', click, true); removeEventListener('scroll', scroll); document.body.classList.remove('has-cursor'); };
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

/** Big name: letters rise in one by one, then bend away from the cursor; a sheen sweeps across periodically. */
let nameIntroPlayed = false; // survives route changes, so the intro only runs on first load

export function NameFx({ text }: { text: string }) {
  const wrap = useRef<HTMLSpanElement>(null);
  const [skip] = useState(nameIntroPlayed);

  useEffect(() => {
    if (skip) return;
    nameIntroPlayed = true;
    const t = setTimeout(() => wrap.current?.querySelectorAll('.nl').forEach(l => l.classList.add('settled')), 900 + text.length * 50 + 900);
    return () => clearTimeout(t);
  }, [text, skip]);

  const move = (e: RMouseEvent) => {
    const el = wrap.current; if (!el) return;
    el.querySelectorAll<HTMLElement>('.nl').forEach(l => {
      const r = l.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy), p = Math.max(0, 1 - d / 140);
      l.style.setProperty('--p', p.toFixed(3));
      l.style.setProperty('--ty', `${-p * 14}px`);
      l.style.setProperty('--sc', `${1 + p * 0.22}`);
    });
  };
  const leave = () => wrap.current?.querySelectorAll<HTMLElement>('.nl').forEach(l => {
    l.style.setProperty('--p', '0'); l.style.setProperty('--ty', '0px'); l.style.setProperty('--sc', '1');
  });

  return (
    <span ref={wrap} className="name-fx" aria-label={text} onMouseMove={move} onMouseLeave={leave} data-hover>
      {text.split('').map((c, i) => (
        <span key={i} className="nl-mask" aria-hidden="true">
          <span className={skip ? 'nl settled' : 'nl'} style={skip ? undefined : { animationDelay: `${0.9 + i * 0.05}s` }}>{c === ' ' ? ' ' : c}</span>
        </span>
      ))}
    </span>
  );
}
