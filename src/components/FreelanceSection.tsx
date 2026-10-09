import { useEffect, useRef, useState, type MouseEvent as RMouseEvent } from 'react';
import { Magnetic } from './Effects';

const services = [
  ['Backend & APIs', 'Clean REST APIs, auth and data models on Node.js, Express, MongoDB or PostgreSQL.'],
  ['Queues & pipelines', 'Background jobs that retry, recover and never double-fire. Redis, BullMQ, FFmpeg.'],
  ['Full-stack builds', 'Slick React frontends wired to a solid backend, from napkin sketch to live product.'],
  ['Fixes & scaling', 'Slow endpoint? Flaky job? Messy schema? I hunt the root cause and kill it.'],
];
const works: [string, string, boolean][] = [
  ['Storefront that sells', 'E-commerce website, cart to checkout', true],
  ['Luxury salon, found on page one', 'Premium salon website with full SEO tuning', true],
  ['A cut above the rest', "Portfolio website for a video editor", true],
  ['Made for the spotlight', 'Showcase website for a content creator', true],
  ['Agency, open for business', 'Agency website with a bold, fast front door', true],
  ['Law firm, case in progress', 'Law firm website, currently being built', false],
];

let ctx: AudioContext | undefined;
/** Short synthesized tick; no audio assets needed. */
function blip(up: boolean) {
  try {
    ctx ??= new AudioContext();
    const t = ctx.currentTime, o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'triangle';
    o.frequency.setValueAtTime(up ? 520 : 300, t);
    o.frequency.exponentialRampToValueAtTime(up ? 1040 : 180, t + 0.09);
    g.gain.setValueAtTime(0.09, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
    o.connect(g).connect(ctx.destination);
    o.start(t); o.stop(t + 0.15);
  } catch { /* audio unavailable */ }
}

let pastWorkPlayed = false; // the tick-off sequence runs once per page load

function PastWork() {
  const [done, setDone] = useState<boolean[]>(() => works.map(([, , ok]) => pastWorkPlayed && ok));
  const [shake, setShake] = useState(-1);
  const list = useRef<HTMLUListElement>(null);

  // Strike each shipped job off in turn once the list scrolls into view.
  useEffect(() => {
    const el = list.current; if (!el || pastWorkPlayed) return;
    const timers: number[] = [];
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      works.forEach(([, , ok], i) => ok && timers.push(window.setTimeout(() => {
        setDone(d => d.map((v, j) => (j === i ? true : v)));
        blip(true);
        pastWorkPlayed = true; // set as ticks land, so leaving mid-way still counts as seen
      }, 500 + i * 450)));
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); timers.forEach(clearTimeout); };
  }, []);

  const click = (i: number, e: RMouseEvent<HTMLButtonElement>) => {
    if (!works[i][2]) {
      blip(false); setShake(i); setTimeout(() => setShake(-1), 400); return;
    }
    const next = !done[i];
    blip(next);
    setDone(d => d.map((v, j) => (j === i ? next : v)));
    if (!next || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const btn = e.currentTarget, r = btn.getBoundingClientRect();
    for (let k = 0; k < 10; k++) {
      const s = document.createElement('i');
      const a = (k / 10) * Math.PI * 2, d = 24 + Math.random() * 26;
      s.className = 'burst';
      s.style.left = e.clientX - r.left + 'px'; s.style.top = e.clientY - r.top + 'px';
      s.style.setProperty('--dx', Math.cos(a) * d + 'px'); s.style.setProperty('--dy', Math.sin(a) * d + 'px');
      btn.appendChild(s); setTimeout(() => s.remove(), 700);
    }
  };

  return (
    <ul ref={list} className="border-b border-[var(--line)]">
      {works.map(([title, desc, ok], i) => (
        <li key={title}>
          <button type="button" data-hover aria-pressed={done[i]} onClick={e => click(i, e)}
            className={`work ${done[i] ? 'done' : ''} ${shake === i ? 'shake' : ''}`}>
            <span className="work-num">0{i + 1}</span>
            <span className="work-box"><svg viewBox="0 0 12 12"><path d="M2 6.5 5 9.5 10 3" /></svg></span>
            <span className="min-w-0">
              <span className="work-title h3">{title}</span>
              <span className="mt-0.5 block text-sm text-[var(--muted)]">{desc}</span>
            </span>
            <span className="work-tag mono text-[var(--muted)]">
              {ok ? 'shipped' : <span className="flex items-center gap-2"><i className="status-dot" /> in progress</span>}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

const steps =[['01', 'Talk', 'Tell me the problem and the constraints.'], ['02', 'Scope', 'A clear plan, timeline and price.'], ['03', 'Build', 'Tight loops, steady updates.'], ['04', 'Ship', 'Deploy, document, hand over the keys.']];

export default function FreelanceSection() {
  return (
    <section id="freelance" aria-labelledby="freelance-heading" className="pt-28 md:pt-36">
      <div data-reveal>
        <p className="mono mb-5 flex items-center gap-2.5 text-[var(--muted)]"><i className="status-dot" /> Open for projects</p>
        <h1 id="freelance-heading" className="h1">Freelance</h1>
        <p className="mt-3 max-w-[500px] text-[var(--muted)]">Founders and small teams hire me to turn rough ideas into fast, rock-solid products. No drama, just shipped.</p>
      </div>
      <h2 className="label mt-16" data-reveal>Shipped &amp; shipping <span className="text-[var(--dim)]">(click to tick)</span></h2>
      <div data-reveal><PastWork /></div>
      <h2 className="label mt-16" data-reveal>What I do</h2>
      <div data-reveal>
        {services.map(([k, v]) => (
          <div key={k} className="grid gap-1 border-t border-[var(--line)] py-5 sm:grid-cols-[170px_1fr] sm:gap-6">
            <h3 className="h3">{k}</h3>
            <p className="text-[var(--muted)]">{v}</p>
          </div>
        ))}
      </div>
      <h2 className="label mt-16" data-reveal>How it works</h2>
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4" data-reveal>
        {steps.map(([n, t, d]) => (
          <div key={n}>
            <span className="mono text-[var(--dim)]">{n}</span>
            <h3 className="h3 mt-1">{t}</h3>
            <p className="mt-1 text-sm text-[var(--muted)]">{d}</p>
          </div>
        ))}
      </div>
      <div className="mt-16" data-reveal>
        <Magnetic><a className="cta" href="mailto:sg946511@gmail.com?subject=Project%20inquiry">Start a project <span>↗</span></a></Magnetic>
      </div>
    </section>
  );
}
