import { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/layout/Navbar';
import FloatingDock from './components/layout/FloatingDock';
import CommandPalette from './components/layout/CommandPalette';
import ScrollProgress from './components/layout/ScrollProgress';
import LoadingScreen from './components/layout/LoadingScreen';
import BackToTop from './components/layout/BackToTop';
import Footer from './components/layout/Footer';
import CustomCursor from './components/effects/CustomCursor';
import SmoothScroll from './components/effects/SmoothScroll';
import Hero from './components/sections/Hero';

// Lazy load heavy sections for performance
const HeroScene = lazy(() => import('./components/3d/HeroScene'));
const About = lazy(() => import('./components/sections/About'));
const Skills = lazy(() => import('./components/sections/Skills'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Achievements = lazy(() => import('./components/sections/Achievements'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Contact = lazy(() => import('./components/sections/Contact'));

function SectionFallback() {
  return (
    <div className="flex items-center justify-center py-32">
      <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Ensure minimum loading time for animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setShowContent(true);
  };

  return (
    <>
      <CustomCursor />
      <SmoothScroll />
      <CommandPalette />

      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {(!isLoading || showContent) && (
        <>
          {/* Global 3D Background */}
          <div className="fixed inset-0 z-0 pointer-events-auto">
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
          </div>

          <ScrollProgress />
          <Navbar />
          <FloatingDock />

          <main className="relative z-10">
            {/* Hero Section */}
            <section id="home" className="relative min-h-[100dvh] overflow-hidden">
              <Hero />
            </section>

            <Suspense fallback={<SectionFallback />}>
              <About />
            </Suspense>

            <Suspense fallback={<SectionFallback />}>
              <Skills />
            </Suspense>

            <Suspense fallback={<SectionFallback />}>
              <Experience />
            </Suspense>

            <Suspense fallback={<SectionFallback />}>
              <Achievements />
            </Suspense>

            <Suspense fallback={<SectionFallback />}>
              <Projects />
            </Suspense>

            <Suspense fallback={<SectionFallback />}>
              <Contact />
            </Suspense>
          </main>

          <Footer />
          <BackToTop />
        </>
      )}
    </>
  );
}
