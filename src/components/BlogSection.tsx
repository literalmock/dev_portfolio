const drafts = ['How I think about rate limiting', 'Queues, retries & idempotency'];

export default function BlogSection() {
  return (
    <section id="blog" aria-labelledby="blog-heading" className="pt-28 md:pt-36" data-reveal>
      <div className="mb-8 flex items-center justify-between">
        <h1 id="blog-heading" className="h1">Blogs</h1>
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
