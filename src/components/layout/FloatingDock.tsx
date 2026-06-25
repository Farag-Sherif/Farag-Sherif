import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import {
  HiHome,
  HiUser,
  HiCommandLine,
  HiBriefcase,
  HiSparkles,
  HiEnvelope,
} from 'react-icons/hi2';

const NAV_LINKS = [
  { label: 'Home', href: 'hero', icon: HiHome },
  { label: 'About', href: 'about', icon: HiUser },
  { label: 'Skills', href: 'skills', icon: HiCommandLine },
  { label: 'Experience', href: 'experience', icon: HiBriefcase },
  { label: 'Projects', href: 'projects', icon: HiSparkles },
  { label: 'Contact', href: 'contact', icon: HiEnvelope },
];

export default function FloatingDock() {
  const mouseX = useMotionValue(Infinity);
  const [activeSection, setActiveSection] = useState('hero');

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries.filter((entry) => entry.isIntersecting);
        if (visibleSections.length > 0) {
          // Sort by intersection ratio or just take the first one
          visibleSections.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          setActiveSection(visibleSections[0].target.id);
        }
      },
      { threshold: 0.2, rootMargin: '-20% 0px -40% 0px' }
    );

    NAV_LINKS.forEach((link) => {
      const el = document.getElementById(link.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      // If lenis is available globally, use it for smooth scrolling
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: -50 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 hidden md:block">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex h-16 items-center gap-4 rounded-full border border-white/10 bg-[#030712]/80 px-4 pb-3 pt-3 backdrop-blur-xl shadow-2xl"
      >
        {NAV_LINKS.map((link) => (
          <DockIcon
            key={link.href}
            mouseX={mouseX}
            link={link}
            isActive={activeSection === link.href}
            onClick={() => scrollToSection(link.href)}
          />
        ))}
      </motion.div>
    </div>
  );
}

function DockIcon({
  mouseX,
  link,
  isActive,
  onClick,
}: {
  mouseX: any;
  link: typeof NAV_LINKS[0];
  isActive: boolean;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);

  // Calculate distance from cursor to icon center
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Calculate icon size based on distance
  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <div className="relative flex items-center justify-center">
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 2, scale: 0.8 }}
            className="absolute -top-12 rounded-md border border-white/10 bg-[#030712]/90 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md"
          >
            {link.label}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={ref}
        style={{ width, height: width }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onClick}
        className={`relative flex items-center justify-center rounded-full transition-colors duration-300 ${
          isActive || hovered
            ? 'bg-gradient-to-br from-violet-500/20 to-cyan-500/20 text-white'
            : 'bg-white/5 text-slate-400 hover:text-white'
        }`}
      >
        {isActive && (
          <motion.div
            layoutId="activeDockIcon"
            className="absolute inset-0 rounded-full border border-violet-500/50 bg-violet-500/10"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}
        <link.icon className="relative z-10 text-xl transition-all" />
      </motion.button>
    </div>
  );
}
