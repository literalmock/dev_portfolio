import { ArrowUpRight } from 'lucide-react';

const projects = [
  { title: 'Clip Captions', type: 'AI SaaS', description: 'Automatic transcription and styled captions for short-form video, with word-level sync.', tags: ['React', 'Redis', 'BullMQ', 'FFmpeg'], href: 'https://landing.clipcaptions.video/' },
  { title: 'DevMate', type: 'Networking platform', description: 'Developer matching with skill-based discovery, REST APIs, JWT auth and schema validation.', tags: ['Node.js', 'Express', 'MongoDB', 'Zod'], href: 'https://github.com/literalmock/DevMate' },
  { title: 'NexVenture', type: 'MERN platform', description: 'One place for founders, investors, mentors and students to connect, with a Node.js and Express API on MongoDB and a React client.', tags: ['MongoDB', 'Express', 'React', 'Node.js'], href: 'https://github.com/literalmock/NexVenture' },
  { title: 'mifo', type: 'Terminal system monitor', description: 'Live macOS system monitor for the terminal: CPU, memory, disk, network, battery and thermals. Pure Go, no root, no cgo.', tags: ['Go', 'Bubble Tea', 'TUI', 'macOS'], href: 'https://github.com/literalmock/mifo' },
  { title: 'Password Generator', type: 'Frontend utility', description: 'Responsive tool with configurable length and character rules.', tags: ['React', 'Vite', 'CSS'], href: 'https://password-generator-eke.pages.dev' },
];

export default function ProjectsSection() {
  return (
    <section id="work" aria-labelledby="work-heading" className="pt-28 md:pt-36" data-reveal>
      <h1 id="work-heading" className="h1">Projects</h1>
      <p className="mt-3 mb-10 text-[var(--muted)]">Things I built, broke and fixed.</p>
      <div className="rows">
        {projects.map((p) => (
          <a key={p.title} href={p.href} target="_blank" rel="noreferrer" className="row group block py-6">
            <div className="flex items-start justify-between gap-4">
              <div className="name">
                <h3 className="h3 text-xl">{p.title}</h3>
                <p className="mono mt-1 text-[var(--dim)]">{p.type}</p>
              </div>
              <ArrowUpRight size={18} className="arrow mt-1 shrink-0" />
            </div>
            <p className="mt-3 max-w-[480px] text-sm text-[var(--muted)]">{p.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">{p.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
