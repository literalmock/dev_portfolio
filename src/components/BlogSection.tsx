const drafts = ['How I think about rate limiting', 'Queues, retries & idempotency'];

export default function BlogSection() {
  return (
    <section id="blog" className="scroll-mt-24 pb-24" data-reveal>
      <div className="mb-4 flex items-center justify-between">
        <p className="mono text-[var(--dim)]">Blog</p>
        <span className="soon mono"><i /> coming soon</span>
      </div>
      <div className="blog-box">
        {drafts.map((d, i) => (
          <div key={d} className="flex items-center justify-between gap-4 py-3.5">
            <span className="blur-[5px] select-none transition-[filter] duration-500 group-hover:blur-0">{d}</span>
            <span className="mono shrink-0 text-[var(--dim)]">draft_0{i + 1}</span>
          </div>
        ))}
        <p className="mono mt-4 text-[var(--muted)]">✍️ writing about backend, systems & things i break. stay tuned<span className="cursor" /></p>
      </div>
    </section>
  );
}
