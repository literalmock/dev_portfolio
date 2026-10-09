const groups = [
  ['Languages', 'JavaScript, TypeScript, Python, Bash, C'],
  ['Backend & data', 'Node.js, Bun, Express, MongoDB, PostgreSQL, Prisma, Redis, REST, Zod, JWT'],
  ['Frontend', 'React, Next.js'],
  ['Systems & tools', 'Linux, Docker, Git, BullMQ, FFmpeg, Vim'],
];

export default function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="mt-20" data-reveal>
      <h2 id="skills-heading" className="label">Toolkit</h2>
      {groups.map(([k, v]) => (
        <div key={k} className="grid gap-1 border-t border-[var(--line)] py-4 sm:grid-cols-[150px_1fr] sm:gap-6">
          <span className="font-semibold">{k}</span>
          <span className="text-[var(--muted)]">{v}</span>
        </div>
      ))}
    </section>
  );
}
