import React, { useState } from 'react';
import { Mail, Linkedin, Twitter, Github, ArrowRight, Check } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = "sg946511@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="scroll-mt-32 pb-20">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl font-bold">Get in Touch</h2>
        <div className="h-px flex-1 bg-white/10"></div>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-20">
        <div>
          <h3 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
            Let's build something <span className="text-white/40 italic">scalable.</span>
          </h3>
          <p className="text-xl text-white/50 mb-12">
            Always looking for interesting backend challenges and open-source collaborations.
          </p>
          
          <button 
            onClick={handleCopy}
            className="group relative inline-flex items-center gap-4 px-8 py-4 bg-white text-black font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all overflow-hidden"
          >
            <div className={`flex items-center gap-4 transition-transform duration-300 ${copied ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
              <Mail className="w-5 h-5" />
              <span>{email}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className={`absolute inset-0 flex items-center justify-center gap-2 transition-transform duration-300 ${copied ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
              <Check className="w-5 h-5 text-emerald-600" />
              <span className="text-emerald-600">Copied to clipboard</span>
            </div>
          </button>
        </div>
        
        <div className="flex flex-col justify-end gap-12">
          <div className="flex gap-8">
            <a href="https://github.com/literalmock" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
              <Github className="w-8 h-8" />
            </a>
            <a href="#" className="text-white/40 hover:text-white transition-colors">
              <Linkedin className="w-8 h-8" />
            </a>
            <a href="#" className="text-white/40 hover:text-white transition-colors">
              <Twitter className="w-8 h-8" />
            </a>
          </div>
          
          <div className="pt-8 border-t border-white/5">
            <p className="text-xs uppercase tracking-widest text-white/20">
              © 2026 Shivam Gupta — Built with React, GSAP & Three.js
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
