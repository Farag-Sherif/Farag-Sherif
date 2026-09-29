import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'home', label: '01 / INTRO' },
  { id: 'about', label: '02 / ABOUT' },
  { id: 'skills', label: '03 / SKILLS' },
  { id: 'experience', label: '04 / EXP' },
  { id: 'projects', label: '05 / WORK' },
  { id: 'contact', label: '06 / CONTACT' }
];

export const SideProgress = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = 'home';
      let minDistance = window.innerHeight;

      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const distance = Math.abs(rect.top);
          if (distance < minDistance) {
            minDistance = distance;
            currentSection = section.id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-4 mix-blend-difference text-white">
      {SECTIONS.map((section) => (
        <button
          key={section.id}
          className="group flex items-center gap-3 text-right"
          onClick={() => {
            document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className={`text-xs font-bold tracking-widest transition-opacity duration-300 ${activeSection === section.id ? 'opacity-100' : 'opacity-30 group-hover:opacity-100'}`}>
            {section.label}
          </span>
          <div className={`h-px transition-all duration-300 ${activeSection === section.id ? 'w-8 bg-white' : 'w-4 bg-white/30 group-hover:w-6 group-hover:bg-white/70'}`} />
        </button>
      ))}
    </div>
  );
};
