import { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMiniBars3BottomRight, HiXMark } from 'react-icons/hi2';

const NAV_LINKS = [
  { label: 'Home', href: 'hero' },
  { label: 'About', href: 'about' },
  { label: 'Experience', href: 'experience' },
  { label: 'Skills', href: 'skills' },
  { label: 'Projects', href: 'projects' },
  { label: 'Contact', href: 'contact' },
] as const;

const Navbar = memo(function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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
      {/* ─── Desktop & Mobile Navbar ─── */}
      <AnimatePresence>
        {visible && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
              scrolled
                ? 'bg-background/90 backdrop-blur-md border-b border-muted/10'
                : 'bg-transparent'
            }`}
          >
            <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
              {/* Logo / Name */}
              <button
                onClick={() => scrollToSection('hero')}
                className="text-lg md:text-xl font-heading font-semibold text-foreground tracking-tight hover:text-accent transition-colors"
              >
                Farag Sherif
              </button>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-8">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm font-medium tracking-wide text-muted hover:text-foreground transition-colors uppercase"
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden p-2 text-foreground"
                aria-label="Open menu"
              >
                <HiMiniBars3BottomRight className="w-6 h-6" />
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] md:hidden bg-background"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-end">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-foreground"
                  aria-label="Close menu"
                >
                  <HiXMark className="w-8 h-8" />
                </button>
              </div>
              <div className="flex flex-col items-center justify-center flex-1 gap-8">
                {NAV_LINKS.map((link, index) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    onClick={() => scrollToSection(link.href)}
                    className="text-3xl font-heading font-medium text-foreground hover:text-accent transition-colors uppercase tracking-widest"
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
