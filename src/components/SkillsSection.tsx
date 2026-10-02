const groups = [
  ['Languages', 'JavaScript, TypeScript, Python, Bash, C'],
  ['Backend & data', 'Node.js, Bun, Express, MongoDB, PostgreSQL, Prisma, Redis, REST, Zod, JWT'],
  ['Frontend', 'React, Next.js'],
  ['Systems & tools', 'Linux, Docker, Git, BullMQ, FFmpeg, Vim'],
];

export default function SkillsSection() {
  return (
    <section id="skills" className="pb-24" data-reveal>
      <p className="mono mb-4 text-[var(--dim)]">Toolkit</p>
      {groups.map(([k, v]) => (
        <div key={k} className="grid gap-1 border-t border-[var(--line)] py-4 sm:grid-cols-[150px_1fr] sm:gap-6">
          <span className="text-[var(--muted)]">{k}</span>
          <span>{v}</span>
        </div>
      ))}
    </section>
  );
}
