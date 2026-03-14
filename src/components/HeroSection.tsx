import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const phrases = [
    "I'm Shivam",
    "I'm Backend Developer",
    "I'm Full Stack Developer"
  ];

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = phrases[loopIndex % phrases.length];
      const updatedText = isDeleting 
        ? currentPhrase.substring(0, displayText.length - 1)
        : currentPhrase.substring(0, displayText.length + 1);

      setDisplayText(updatedText);

      if (!isDeleting && updatedText === currentPhrase) {
        // Pause at the end of typing
        setTypingSpeed(2000);
        setIsDeleting(true);
      } else if (isDeleting && updatedText === "I'm ") {
        setIsDeleting(false);
        setLoopIndex(loopIndex + 1);
        setTypingSpeed(500);
      } else {
        setTypingSpeed(isDeleting ? 50 : 100);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopIndex, typingSpeed]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Initial state for other elements
      gsap.set(".reveal-stagger", { opacity: 0, y: 20 });

      tl.to(".reveal-stagger", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
      });

      // Continuous subtle floating for the status pill
      gsap.to(".status-pill", {
        y: -4,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={containerRef} className="flex flex-col items-start min-h-[85vh] justify-center py-20">
      <div className="status-pill inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-12 reveal-stagger">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
        <span className="text-xs font-medium text-white/60 uppercase tracking-widest">Available for projects</span>
      </div>
      
      <div className="mb-12 h-[120px] md:h-[180px] lg:h-[220px] flex items-center">
        <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none">
          <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            {displayText}
          </span>
          <span className="inline-block w-[4px] h-[0.8em] bg-white ml-2 animate-pulse align-middle"></span>
        </h1>
      </div>
      
      <p className="text-xl md:text-2xl text-white/40 max-w-2xl leading-relaxed reveal-stagger mb-12">
        Building high-performance backend architectures and seamless 
        full-stack experiences. Focused on scalability, security, and 
        elegant code.
      </p>
      
      <div className="flex flex-wrap gap-6 reveal-stagger">
        <a 
          href="#projects" 
          className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:bg-white/90 active:scale-95"
        >
          <span className="relative z-10">Explore Projects</span>
        </a>
        <a 
          href="#contact" 
          className="px-8 py-4 bg-transparent text-white font-bold rounded-full border border-white/20 hover:bg-white/5 transition-all hover:border-white/40"
        >
          Get in touch
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
