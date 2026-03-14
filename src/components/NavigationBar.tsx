import React, { useState, useEffect } from 'react';
import { Menu as MenuIcon, Github, Moon, Sun } from 'lucide-react';
import MenuOverlay from './MenuOverlay';

const NavigationBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check initial color-scheme or local storage
    const storedTheme = localStorage.getItem('theme');
    const root = document.documentElement;
    
    if (storedTheme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
      setIsDarkMode(false);
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('light');
      root.classList.remove('dark');
      setIsDarkMode(false);
      localStorage.setItem('theme', 'light');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
      setIsDarkMode(true);
      localStorage.setItem('theme', 'dark');
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-6 md:px-12 lg:px-20 bg-background/80 backdrop-blur-md border-b border-white/5 transition-colors duration-300">
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
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/5 transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-white/60" /> : <Moon className="w-5 h-5 text-white/60" />}
          </button>
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
