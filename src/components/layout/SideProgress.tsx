import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'home', label: '01 / INTRO' },
  { id: 'about', label: '02 / ABOUT' },
  { id: 'skills', label: '03 / STACK' },
  { id: 'experience', label: '04 / CAREER' },
  { id: 'projects', label: '05 / WORKS' },
  { id: 'contact', label: '06 / CONTACT' },
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
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-3 px-3.5 py-4 rounded-2xl bg-[#0B0A0E]/92 backdrop-blur-xl border border-amber-500/20 shadow-[0_12px_36px_rgba(0,0,0,0.8)]">
      {SECTIONS.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <button
            key={section.id}
            className="group flex items-center justify-end gap-2.5 text-right cursor-pointer"
            onClick={() => {
              document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span
              className={`text-[10px] font-mono tracking-[0.18em] transition-all duration-300 ${
                isActive
                  ? 'text-amber-400 font-bold'
                  : 'text-zinc-400 group-hover:text-zinc-100'
              }`}
            >
              {section.label}
            </span>
            <div
              className={`h-[2px] rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-6 bg-gradient-to-r from-red-500 to-amber-400 shadow-[0_0_10px_#F97316]'
                  : 'w-2.5 bg-zinc-700 group-hover:w-4 group-hover:bg-amber-300'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};
