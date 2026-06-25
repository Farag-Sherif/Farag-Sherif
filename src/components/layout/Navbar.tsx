import { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMiniBars3BottomRight, HiXMark } from 'react-icons/hi2';

const NAV_LINKS = [
  { label: 'Home', href: 'hero' },
  { label: 'About', href: 'about' },
  { label: 'Skills', href: 'skills' },
  { label: 'Experience', href: 'experience' },
  { label: 'Projects', href: 'projects' },
  { label: 'Contact', href: 'contact' },
] as const;

type NavLink = (typeof NAV_LINKS)[number];

const Navbar = memo(function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Track scroll position for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for active section tracking
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_LINKS.forEach((link) => {
      const el = document.getElementById(link.href);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(link.href);
            }
          });
        },
        {
          rootMargin: '-20% 0px -60% 0px',
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileOpen(false);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`md:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'backdrop-blur-xl bg-white/[0.03] border-b border-white/[0.08] shadow-lg shadow-black/10'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div
          className={`mx-auto max-w-7xl flex items-center justify-between transition-all duration-500 ${
            scrolled ? 'px-6 py-3' : 'px-6 py-5'
          } lg:px-8`}
        >
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="relative group cursor-pointer"
          >
            <span className="text-xl font-bold bg-gradient-to-r from-violet-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent font-[Space_Grotesk,sans-serif] tracking-tight">
              Farag Sherif
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-violet-500 to-cyan-500 group-hover:w-full transition-all duration-500" />
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <DesktopNavLink
                key={link.href}
                link={link}
                isActive={activeSection === link.href}
                onClick={scrollToSection}
              />
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative z-50 p-2 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <HiXMark className="w-6 h-6" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <HiMiniBars3BottomRight className="w-6 h-6" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#030712]/95 backdrop-blur-2xl"
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full gap-2">
              {NAV_LINKS.map((link, index) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onClick={() => scrollToSection(link.href)}
                  className={`text-3xl font-[Space_Grotesk,sans-serif] font-medium px-8 py-3 rounded-xl transition-colors duration-300 cursor-pointer ${
                    activeSection === link.href
                      ? 'bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}

              {/* Decorative gradient orb */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.15, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 blur-[120px] pointer-events-none"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

interface DesktopNavLinkProps {
  link: NavLink;
  isActive: boolean;
  onClick: (href: string) => void;
}

const DesktopNavLink = memo(function DesktopNavLink({
  link,
  isActive,
  onClick,
}: DesktopNavLinkProps) {
  return (
    <button
      onClick={() => onClick(link.href)}
      className="relative px-4 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer group"
    >
      <span
        className={`transition-colors duration-300 ${
          isActive
            ? 'bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent'
            : 'text-slate-400 group-hover:text-slate-200'
        }`}
      >
        {link.label}
      </span>

      {/* Active indicator */}
      <motion.span
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-violet-500 via-cyan-500 to-violet-500 rounded-full"
        initial={false}
        animate={{
          width: isActive ? '60%' : '0%',
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Hover glow */}
      <span className="absolute inset-0 rounded-lg bg-white/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
});

export default Navbar;
