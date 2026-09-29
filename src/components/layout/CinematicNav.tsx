import { useState, useEffect } from 'react';
import { sectionFrames } from '../../config/sections';

export default function CinematicNav() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      
      for (const section of sectionFrames) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        
        const rect = el.getBoundingClientRect();
        
        // Element is visible
        if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 mix-blend-difference hidden md:flex flex-col gap-6">
      {sectionFrames.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className={`group flex items-center justify-end gap-4 text-sm uppercase tracking-[0.2em] transition-all duration-500 ${activeSection === section.id ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
        >
          <span className="transition-opacity duration-300">
            {section.label}
          </span>
          <div 
            className={`h-[1px] bg-white transition-all duration-500 ${activeSection === section.id ? 'w-12' : 'w-4 group-hover:w-8'}`} 
          />
        </button>
      ))}
    </nav>
  );
}

