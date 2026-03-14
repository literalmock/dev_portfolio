import React from 'react';

const skillGroups = [
  {
    category: "Languages",
    skills: ["JavaScript", "Python", "Bash", "C"]
  },
  {
    category: "Backend & Database",
    skills: ["Node.js", "Express.js", "MongoDB", "REST APIs", "Zod", "JWT"]
  },
  {
    category: "DevOps & Tools",
    skills: ["Linux (Debian/Arch)", "Docker", "Git", "VS Code", "Vim"]
  }
];

const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="scroll-mt-32">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl font-bold">Tech Stack</h2>
        <div className="h-px flex-1 bg-white/10"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {skillGroups.map((group, index) => (
          <div key={index} className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">{group.category}</h3>
            <div className="flex flex-wrap gap-3">
              {group.skills.map(skill => (
                <div 
                  key={skill} 
                  className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-white/80 hover:text-white hover:border-white/20 transition-all"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
