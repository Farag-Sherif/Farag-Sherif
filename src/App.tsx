import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import CommandPalette from './components/layout/CommandPalette';
import ScrollProgress from './components/layout/ScrollProgress';
import BackToTop from './components/layout/BackToTop';
import Footer from './components/layout/Footer';
import CustomCursor from './components/effects/CustomCursor';
import SmoothScroll from './components/effects/SmoothScroll';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Achievements from './components/sections/Achievements';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import GlobalCanvas from './components/3d/GlobalCanvas';
import { SideProgress } from './components/layout/SideProgress';

export default function App() {
  const [gpuReady, setGpuReady] = useState(false);
  const [minDelayDone, setMinDelayDone] = useState(false);

  const is3DReady = gpuReady && minDelayDone;

  const handle3DReady = useCallback(() => {
    setGpuReady(true);
  }, []);

  // Ensure a smooth minimum showcase time for the FS loader + safety fallback
  useEffect(() => {
    const minTimer = window.setTimeout(() => {
      setMinDelayDone(true);
    }, 850);

    const safetyTimer = window.setTimeout(() => {
      setGpuReady(true);
      setMinDelayDone(true);
    }, 3500);

    return () => {
      window.clearTimeout(minTimer);
      window.clearTimeout(safetyTimer);
    };
  }, []);

  useEffect(() => {
    if (!is3DReady) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [is3DReady]);

  return (
    <>
      {/* 3D Background Canvas mounts immediately and compiles shaders */}
      <GlobalCanvas onReady={handle3DReady} />

      {/* Full-Screen FS Monogram Gatekeeper Loader */}
      <AnimatePresence>
        {!is3DReady && (
          <motion.div
            key="webgl-gate-loader"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.04,
              transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
            }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#060608] px-6 select-none overflow-hidden"
          >
            {/* Ambient Crimson/Orange/Gold Spotlight Centered on FS */}
            <div
              className="absolute w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-35"
              style={{
                background:
                  'radial-gradient(circle, rgba(239,68,68,0.45) 0%, rgba(249,115,22,0.28) 45%, rgba(250,204,21,0.12) 70%, transparent 85%)',
              }}
            />

            <div className="relative z-10 flex flex-col items-center gap-7 max-w-xs w-full text-center">
              {/* Precision-Aligned FS Monogram Crest */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Outer Rotated Diamond Frame */}
                <motion.div
                  animate={{ rotate: [45, 225, 405] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-2 rounded-3xl border border-red-500/25 pointer-events-none"
                />

                {/* SVG Concentric Orbital Rings Converging on FS */}
                <svg
                  className="absolute inset-0 w-full h-full -rotate-90"
                  viewBox="0 0 128 128"
                >
                  <defs>
                    <linearGradient id="fsRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#EF4444" />
                      <stop offset="50%" stopColor="#F97316" />
                      <stop offset="100%" stopColor="#FACC15" />
                    </linearGradient>
                  </defs>

                  {/* Subtle Track Circle */}
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="1.5"
                  />

                  {/* Spinning Gradient Arc */}
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="url(#fsRingGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="110 250"
                    className="origin-center animate-spin"
                    style={{ animationDuration: '1.8s' }}
                  />

                  {/* Inner Dashed Tech Ring */}
                  <circle
                    cx="64"
                    cy="64"
                    r="46"
                    fill="none"
                    stroke="rgba(250, 204, 21, 0.28)"
                    strokeWidth="1"
                    strokeDasharray="4 6"
                    className="origin-center animate-spin"
                    style={{ animationDuration: '6s', animationDirection: 'reverse' }}
                  />
                </svg>

                {/* Central Obsidian Glass Core Housing "FS" */}
                <motion.div
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="relative w-20 h-20 rounded-2xl bg-gradient-to-b from-[#16131C] to-[#09080C] border border-amber-400/40 shadow-[0_0_35px_rgba(249,115,22,0.35)] flex flex-col items-center justify-center"
                >
                  {/* Top Corner Glow Accents */}
                  <span className="absolute top-1.5 left-1.5 w-1.5 h-1.5 border-t border-l border-amber-400/70" />
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 border-t border-r border-amber-400/70" />
                  <span className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 border-b border-l border-red-500/70" />
                  <span className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 border-b border-r border-red-500/70" />

                  {/* FS Monogram */}
                  <div className="flex items-baseline justify-center leading-none">
                    <span className="font-heading text-3xl font-black tracking-tighter bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(249,115,22,0.45)]">
                      FS
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 ml-0.5 shadow-[0_0_8px_#FACC15]" />
                  </div>

                  {/* Micro Frontend Code Tag under FS */}
                  <span className="mt-1 text-[9px] font-mono font-semibold tracking-widest text-zinc-400">
                    &lt;/&gt;
                  </span>
                </motion.div>
              </div>

              {/* Name & Status Typography */}
              <div className="space-y-1.5">
                <h2 className="text-sm font-heading font-bold uppercase tracking-[0.35em] text-white">
                  Farag Sherif
                </h2>
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-400">
                  Frontend Engineering Universe
                </p>
              </div>

              {/* Animated Progress Bar */}
              <div className="w-48 h-1 rounded-full bg-white/[0.07] overflow-hidden">
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '0%' }}
                  transition={{ duration: 0.85, ease: 'easeInOut' }}
                  className="h-full w-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.6)]"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CustomCursor />
      <SmoothScroll />
      <CommandPalette />

      <div
        className={`transition-opacity duration-700 ${
          is3DReady ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ScrollProgress />
        <SideProgress />
        <Navbar />

        <main className="relative z-10">
          <section id="home" className="relative min-h-[100dvh] overflow-hidden">
            <Hero />
          </section>

          <div>
            <About />
          </div>

          <div>
            <Skills />
          </div>

          <div>
            <Experience />
          </div>

          <div>
            <Achievements />
          </div>

          <div>
            <Projects />
          </div>

          <div>
            <Contact />
          </div>
        </main>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}

