import React from 'react';
import { ExternalLink, Github, Key, Server, Database, Cpu } from 'lucide-react';

const projects = [
  {
    title: "DevMate",
    category: "Networking Platform",
    description: "A Tinder-like platform for developers to connect based on skills. Features RESTful APIs, JWT auth, and Zod validation.",
    icon: <Server className="w-6 h-6" />,
    tags: ["Node.js", "Express", "MongoDB", "Zod", "JWT"],
    github: "https://github.com/literalmock/DevMate"
  },
  {
    title: "Linux System Monitor",
    category: "Infrastructure",
    description: "A real-time system monitoring tool for Linux servers, providing insights into CPU, memory, and network usage via a clean dashboard.",
    icon: <Cpu className="w-6 h-6" />,
    tags: ["Python", "Bash", "Docker", "Prometheus"],
    github: "https://github.com/literalmock/linux-monitor"
  },
  {
    title: "Scalable Auth Service",
    category: "Backend",
    description: "A standalone authentication microservice with support for OAuth2, session management, and rate limiting.",
    icon: <Database className="w-6 h-6" />,
    tags: ["Node.js", "Redis", "PostgreSQL", "Docker"],
    github: "https://github.com/literalmock/auth-service"
  },
  {
    title: "Password Generator",
    category: "Frontend / ReactJS",
    description: "A clean and responsive password generator app with configurable length and character options for secure password creation.",
    icon: <Key className="w-6 h-6" />,
    tags: ["React", "Javascript", "Vite", "CSS"],
    github: "https://github.com/literalmock/Password-Generator",
    live: "https://password-generator-eke.pages.dev"
  }
];

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="scroll-mt-32">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl font-bold">Selected Work</h2>
        <div className="h-px flex-1 bg-white/10"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div 
            key={index} 
            className="group relative p-8 bg-white/[0.02] border border-white/10 rounded-3xl hover:bg-white/[0.04] hover:border-white/20 transition-all duration-500"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 rounded-2xl bg-white/5 text-white/80 group-hover:text-white transition-colors">
                {project.icon}
              </div>
              <div className="flex gap-4">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
            
            <span className="text-xs font-medium text-white/40 uppercase tracking-widest mb-2 block">
              {project.category}
            </span>
            <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
            <p className="text-white/50 leading-relaxed mb-8">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-medium text-white/60 uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
