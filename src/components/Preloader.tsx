import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min((t - start) / 1100, 1);
      setN(Math.round(100 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step); else setTimeout(onComplete, 150);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <motion.div initial={{ y: 0 }} exit={{ y: '-100%', transition: { duration: .8, ease: [.76, 0, .24, 1] } }} className="fixed inset-0 z-[100] flex items-end justify-between bg-[var(--text)] p-6 text-[var(--bg)] md:p-10">
      <span className="mono">Shivam Gupta — Portfolio</span>
      <span className="text-[clamp(4rem,14vw,10rem)] font-light leading-none tracking-tighter tabular-nums">{n}</span>
    </motion.div>
  );
}
