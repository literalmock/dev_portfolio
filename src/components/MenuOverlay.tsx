import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { X, Github, Linkedin, Twitter } from 'lucide-react';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({ isOpen, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true,
      antialias: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const count = 500;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: '#ffffff',
      transparent: true,
      opacity: 0.5
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    camera.position.z = 3;

    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, {
        clipPath: 'circle(150% at 100% 0%)',
        duration: 1,
        ease: 'power4.inOut'
      });
      gsap.fromTo(linksRef.current?.children || [], 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, delay: 0.4, ease: 'power3.out' }
      );
    } else {
      gsap.to(overlayRef.current, {
        clipPath: 'circle(0% at 100% 0%)',
        duration: 0.8,
        ease: 'power4.inOut'
      });
    }
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    onClose();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-background flex flex-col pointer-events-auto transition-colors duration-300"
      style={{ clipPath: 'circle(0% at 100% 0%)' }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40" />
      
      <div className="relative z-10 flex justify-between items-center px-8 py-6 md:px-12 lg:px-20">
        <span className="text-xl font-bold tracking-tighter">S.</span>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-white/5 transition-colors">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center px-8 md:px-12 lg:px-20">
        <div ref={linksRef} className="flex flex-col gap-8">
          {['hero', 'projects', 'skills', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-5xl md:text-8xl font-bold text-left hover:text-white/40 transition-colors uppercase tracking-tighter"
            >
              {item === 'hero' ? 'Home' : item}
            </button>
          ))}
        </div>
      </div>

      <div className="px-8 py-12 md:px-12 lg:px-20 flex justify-between items-end">
        <div className="flex gap-6">
          <a href="https://github.com/literalmock" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
            <Github className="w-6 h-6" />
          </a>
          <a href="#" className="text-white/40 hover:text-white transition-colors">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="#" className="text-white/40 hover:text-white transition-colors">
            <Twitter className="w-6 h-6" />
          </a>
        </div>
        <p className="text-xs uppercase tracking-widest text-white/20">
          Shivam Gupta — 2026
        </p>
      </div>
    </div>
  );
};

export default MenuOverlay;
