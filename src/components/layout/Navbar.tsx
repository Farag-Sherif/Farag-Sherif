import { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMiniBars3BottomRight, HiXMark, HiArrowUpRight } from 'react-icons/hi2';
import { personal } from '../../data/personal';

const NAV_LINKS = [
  { label: 'Home', href: 'hero' },
  { label: 'About', href: 'about' },
  { label: 'Skills', href: 'skills' },
  { label: 'Experience', href: 'experience' },
  { label: 'Projects', href: 'projects' },
  { label: 'Contact', href: 'contact' },
] as const;

const Navbar = memo(function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
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
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4 pointer-events-none">
        <div
          className={`max-w-6xl mx-auto pointer-events-auto rounded-2xl transition-all duration-300 px-5 py-3.5 flex items-center justify-between ${
            scrolled
              ? 'bg-[#0C0B0E]/90 backdrop-blur-xl border border-amber-500/20 shadow-[0_12px_40px_rgba(0,0,0,0.75)]'
              : 'bg-[#0C0B0E]/65 backdrop-blur-md border border-white/[0.08]'
          }`}
        >
          {/* Brand Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 via-orange-500 to-amber-400 flex items-center justify-center text-xs font-mono font-bold text-black shadow-[0_0_20px_rgba(249,115,22,0.45)]">
              &lt;FS/&gt;
            </span>
            <div>
              <span className="block text-sm font-heading font-semibold text-white tracking-tight group-hover:text-amber-400 transition-colors">
                Farag Sherif
              </span>
              <span className="block text-[10px] font-mono text-zinc-400 tracking-wider uppercase">
                Frontend Engineer
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="px-3.5 py-2 rounded-xl text-xs font-medium tracking-wider text-zinc-300 hover:text-amber-300 hover:bg-white/[0.05] transition-all uppercase cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600/20 to-amber-500/20 hover:from-red-600/35 hover:to-amber-500/35 border border-amber-400/35 text-amber-300 text-xs font-semibold tracking-wider uppercase transition-all"
            >
              Résumé <HiArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 rounded-xl bg-white/[0.05] text-white"
            aria-label="Open menu"
          >
            <HiMiniBars3BottomRight className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] md:hidden bg-[#060608]/95 backdrop-blur-2xl"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center">
                <span className="text-sm font-mono uppercase tracking-widest text-amber-400">
                  Navigation
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-xl bg-white/[0.06] text-white"
                  aria-label="Close menu"
                >
                  <HiXMark className="w-7 h-7" />
                </button>
              </div>
              <div className="flex flex-col items-center justify-center flex-1 gap-6">
                {NAV_LINKS.map((link, index) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ duration: 0.3, delay: index * 0.06 }}
                    onClick={() => scrollToSection(link.href)}
                    className="text-2xl font-heading font-semibold text-zinc-200 hover:text-amber-400 transition-colors uppercase tracking-widest"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default Navbar;
