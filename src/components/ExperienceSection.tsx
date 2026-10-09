const jobs = [
  { group: 'Now', role: 'Backend & Full-stack Developer', org: '', tag: 'Freelance', period: '2026 — Present', note: 'Building APIs, dashboards and product backends for clients.' },
  { group: 'Previously', role: 'SDE Intern', org: 'Axipays', period: 'Mar — Jun 2026', note: 'Payments-side backend work: services, integrations and reliability.' },
  { group: 'Previously', role: 'Founder / Developer', org: 'Clip Captions', period: '2025', note: 'AI captions SaaS. Queues, retries and a media processing pipeline.' },
];

export default function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="mt-20" data-reveal>
      <h2 id="experience-heading" className="label">Experience</h2>
      <ol className="timeline">
        {jobs.map((j) => (
          <li key={j.org || j.tag} className="tl-item">
            <div className="tl-meta">
              <span className="tl-group">{j.group}</span>
              <span className="mono text-[var(--dim)]">{j.period}</span>
            </div>
            <div>
              <h3 className="h3">{j.role}{' '}
                {j.org
                  ? <><span className="text-[var(--muted)] font-normal">at</span> {j.org}</>
                  : <span className="text-[var(--muted)] font-normal">({j.tag})</span>}</h3>
              <p className="mt-1 text-sm text-[var(--muted)]">{j.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
