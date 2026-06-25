import { useState, useCallback, useRef, memo, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowTopRightOnSquare } from 'react-icons/hi2';
import { SiGithub } from 'react-icons/si';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects, projectCategories, type Project } from '../../data/projects';
import SectionHeading from '../ui/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

/* ─── Project Card with 3D tilt ─── */
const ProjectCard = memo(function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const hasLiveUrl = project.liveUrl && project.liveUrl.trim() !== "" && project.liveUrl !== "YOUR_LIVE_URL";
  const hasGithubUrl = project.githubUrl && project.githubUrl.trim() !== "" && project.githubUrl !== "YOUR_GITHUB_URL";

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setTilt({ x: rotateX, y: rotateY });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        layout: { duration: 0.4 },
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl
                   transition-colors duration-300 hover:border-white/[0.12] hover:bg-white/[0.06] flex flex-col h-full"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered
            ? 'transform 0.1s ease-out'
            : 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      >
        {/* Image */}
        <div className="relative h-48 sm:h-56 overflow-hidden flex-shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 flex flex-col flex-grow">
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">{project.title}</h3>
          <p className="mt-2 line-clamp-3 text-xs sm:text-sm leading-relaxed text-slate-400 font-body flex-grow">
            {project.description}
          </p>

          {/* Tech stack pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-violet-500/20 bg-violet-500/10
                           px-3 py-1 text-xs font-medium text-violet-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Bottom buttons */}
          <div className="mt-5 flex gap-3">
            {hasLiveUrl || hasGithubUrl ? (
              <>
                {hasLiveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl
                               bg-gradient-to-r from-violet-500 to-cyan-500
                               px-4 py-2.5 text-sm font-semibold text-white
                               shadow-lg shadow-violet-500/25"
                  >
                    <HiArrowTopRightOnSquare className="text-base" />
                    Live Demo
                  </a>
                )}
                {hasGithubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl
                               border border-white/20 bg-white/5
                               px-4 py-2.5 text-sm font-semibold text-white"
                  >
                    <SiGithub className="text-base" />
                    Code
                  </a>
                )}
              </>
            ) : (
              <div className="flex w-full items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] px-4 py-2.5 text-sm font-bold tracking-widest text-slate-500 opacity-70 cursor-not-allowed">
                SOON
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
});

/* ─── Projects Section ─── */
const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const filteredProjects = projects.filter(
    (p) => activeCategory === 'all' || p.category === activeCategory,
  );

  useLayoutEffect(() => {
    // If not enough items or mobile view, disable GSAP horizontal scroll
    if (!sectionRef.current || !trackRef.current || window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      const scrollTrack = trackRef.current;
      if (!scrollTrack) return;
      
      const scrollWidth = scrollTrack.scrollWidth;
      const amountToScroll = scrollWidth - window.innerWidth;

      if (amountToScroll > 0) {
        gsap.to(scrollTrack, {
          x: -amountToScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'center center',
            end: `+=${amountToScroll}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <section id="projects" ref={sectionRef} className="relative min-h-[100dvh] flex flex-col justify-center pt-16 pb-32 md:pt-20 md:pb-80 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20 mb-6 md:mb-8 w-full">
        <SectionHeading subtitle="My Works" title="Featured Projects" />

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12 flex flex-wrap justify-center gap-3"
        >
          {projectCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`relative rounded-full px-6 py-2.5 text-sm font-semibold transition-colors duration-300
                ${
                  activeCategory === cat.key
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white border border-white/10 bg-white/[0.03]'
                }`}
            >
              {activeCategory === cat.key && (
                <motion.div
                  layoutId="activeProjectTab"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/25"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Projects Container: Vertical on mobile, Horizontal GSAP on desktop */}
        <div 
          ref={trackRef} 
          className="flex flex-col md:flex-row gap-8 md:w-max"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                key={project.id} 
                className="w-full md:w-[600px] flex-shrink-0"
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Projects;
