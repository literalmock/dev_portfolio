import { useState } from 'react';
import { Magnetic } from './Effects';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = 'sg946511@gmail.com';
  const copy = async () => { await navigator.clipboard.writeText(email); setCopied(true); setTimeout(() => setCopied(false), 1600); };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="mt-24" data-reveal>
      <h2 id="contact-heading" className="text-[clamp(2.2rem,8vw,3.6rem)] font-bold leading-[1.05] tracking-[-.04em]">
        got a <span className="hl">problem?</span><br />
        let&apos;s <span className="grad">cook</span> 🔥
      </h2>
      <p className="mt-6 max-w-[460px] text-[var(--muted)]">backend, apis, scaling things that keep falling over. drop a message, i reply fast. promise.</p>
      <div className="mt-9 flex flex-wrap items-center gap-3">
        <Magnetic><a href={'mailto:' + email} className="cta">slide into my inbox <span>↗</span></a></Magnetic>
        <button onClick={copy} className="pill">{copied ? 'copied ✓' : 'copy email'}</button>
      </div>
      <div className="mono mt-20 flex justify-between text-[var(--dim)]">
        <span>© 2026 shivam gupta</span>
        <span>made with caffeine ☕</span>
      </div>
    </section>
  );
}
