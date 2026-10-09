import { useEffect, useState } from 'react';
import { NameFx, Magnetic } from './Effects';

function Clock() {
  const [t, setT] = useState('');
  useEffect(() => {
    const f = () => setT(new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    f(); const i = setInterval(f, 1000); return () => clearInterval(i);
  }, []);
  return <span className="tabular-nums">{t} IST</span>;
}

export default function HeroSection() {
  return (
    <section id="top" aria-labelledby="intro-title" className="pt-28 md:pt-40">
      <div className="mono mb-10 flex items-center justify-between text-[var(--muted)]" data-reveal>
        <span className="flex items-center gap-2.5"><i className="status-dot" /> Available for work</span>
        <Clock />
      </div>
      <h1 id="intro-title" className="name-font text-[clamp(2.6rem,9vw,4.5rem)] font-bold leading-[.95] tracking-[-.03em]" data-reveal>
        <NameFx text="Shivam Gupta" />
      </h1>
      <p className="mt-3 text-[clamp(1.1rem,3.6vw,1.5rem)] tracking-tight text-[var(--muted)]" data-reveal>Backend engineer.</p>
      <p className="mt-8 max-w-[520px] text-[var(--muted)]" data-reveal>
        Deeply into tech and happiest when I'm tinkering with things — taking them apart to see how they work. I'm focused on building: reliable APIs, scalable systems and products that ship, while getting a little better than I was yesterday.
      </p>
      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm" data-reveal>
        <Magnetic><a className="ulink" href="mailto:sg946511@gmail.com">Email</a></Magnetic>
        <Magnetic><a className="ulink" href="https://github.com/literalmock" target="_blank" rel="noreferrer">GitHub</a></Magnetic>
        <Magnetic><a className="ulink" href="https://www.linkedin.com/in/shivam-gupta-code/" target="_blank" rel="noreferrer">LinkedIn</a></Magnetic>
      </div>

    </section>
  );
}
