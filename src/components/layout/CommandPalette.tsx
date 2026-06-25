import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiMagnifyingGlass,
  HiXMark,
  HiArrowRight,
  HiCommandLine,
} from 'react-icons/hi2';

const COMMANDS = [
  { id: 'hero', title: 'Home', category: 'Navigation' },
  { id: 'about', title: 'About Me', category: 'Navigation' },
  { id: 'skills', title: 'Skills & Tools', category: 'Navigation' },
  { id: 'experience', title: 'Experience', category: 'Navigation' },
  { id: 'projects', title: 'Featured Projects', category: 'Navigation' },
  { id: 'contact', title: 'Contact', category: 'Navigation' },
  { id: 'theme', title: 'Toggle Theme (Coming Soon)', category: 'Actions' },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // focus input
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const filteredCommands = COMMANDS.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase())
  );

  const executeCommand = (id: string) => {
    setIsOpen(false);
    if (id === 'theme') return;

    const el = document.getElementById(id);
    if (el) {
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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-32 sm:pt-48">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-[#030712]/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0F172A] shadow-2xl mx-4"
          >
            {/* Header / Input */}
            <div className="flex items-center border-b border-white/10 px-4">
              <HiMagnifyingGlass className="h-5 w-5 text-slate-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search or jump to... (Esc to close)"
                className="w-full bg-transparent p-4 text-sm text-white placeholder-slate-400 outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 hover:bg-white/5"
              >
                <HiXMark className="h-5 w-5 text-slate-400" />
              </button>
            </div>

            {/* Results list */}
            <div className="max-h-80 overflow-y-auto p-2">
              {filteredCommands.length === 0 ? (
                <div className="p-4 text-center text-sm text-slate-500">
                  No results found.
                </div>
              ) : (
                filteredCommands.map((cmd) => (
                  <button
                    key={cmd.id}
                    onClick={() => executeCommand(cmd.id)}
                    className="group flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <div className="flex items-center gap-3">
                      <HiCommandLine className="h-4 w-4 text-violet-400" />
                      <span>{cmd.title}</span>
                    </div>
                    <HiArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </button>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 bg-white/[0.02] p-3 text-xs text-slate-500 flex justify-between">
              <span>Use arrows to navigate</span>
              <span>cmd+k to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
