import React, { useState } from 'react';
import { Menu as MenuIcon, Github } from 'lucide-react';
import MenuOverlay from './MenuOverlay';

const NavigationBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-6 md:px-12 lg:px-20 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold tracking-tighter cursor-pointer" onClick={() => scrollToSection('hero')}>
            S.
          </span>
          <div className="hidden md:flex gap-6">
            {['projects', 'skills', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-xs uppercase tracking-widest font-medium text-white/40 hover:text-white transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a href="https://github.com/literalmock" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-white/5 transition-colors">
            <Github className="w-5 h-5 text-white/60" />
          </a>
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-2 rounded-full hover:bg-white/5 transition-colors"
          >
            <MenuIcon className="w-5 h-5 text-white/60" />
          </button>
        </div>
      </nav>
      
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default NavigationBar;
