import { lazy, Suspense } from 'react';
import Navbar from './components/layout/Navbar';
import CommandPalette from './components/layout/CommandPalette';
import ScrollProgress from './components/layout/ScrollProgress';
import BackToTop from './components/layout/BackToTop';
import Footer from './components/layout/Footer';
import CustomCursor from './components/effects/CustomCursor';
import SmoothScroll from './components/effects/SmoothScroll';
import Hero from './components/sections/Hero';
import GlobalCanvas from './components/3d/GlobalCanvas';
import { SideProgress } from './components/layout/SideProgress';

// Lazy load heavy sections for performance
const About = lazy(() => import('./components/sections/About'));
const Skills = lazy(() => import('./components/sections/Skills'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Achievements = lazy(() => import('./components/sections/Achievements'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Contact = lazy(() => import('./components/sections/Contact'));

function SectionFallback() {
  return (
    <div className="flex items-center justify-center py-32">
      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <>
      <GlobalCanvas />
      <CustomCursor />
      <SmoothScroll />
      <CommandPalette />

      <ScrollProgress />
      <SideProgress />
      <Navbar />

      <main className="relative z-10">
        <section id="home" className="relative min-h-[100dvh] overflow-hidden">
          <Hero />
        </section>

        <div>
          <Suspense fallback={<SectionFallback />}>
            <About />
          </Suspense>
        </div>

        <div>
          <Suspense fallback={<SectionFallback />}>
            <Skills />
          </Suspense>
        </div>

        <div>
          <Suspense fallback={<SectionFallback />}>
            <Experience />
          </Suspense>
        </div>

        <div>
          <Suspense fallback={<SectionFallback />}>
            <Achievements />
          </Suspense>
        </div>

        <div>
          <Suspense fallback={<SectionFallback />}>
            <Projects />
          </Suspense>
        </div>

        <div>
          <Suspense fallback={<SectionFallback />}>
            <Contact />
          </Suspense>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
