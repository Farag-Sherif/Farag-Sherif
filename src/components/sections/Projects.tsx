import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { HiArrowTopRightOnSquare, HiSparkles } from 'react-icons/hi2';
import { SiGithub } from 'react-icons/si';
import { projects, type Project } from '../../data/projects';
import { ProjectImage } from '../ui/ProjectImage';

const BrowserFrame = memo(function BrowserFrame({
  project,
  num,
  heightClass,
}: {
  project: Project;
  num: string;
  heightClass: string;
}) {
  const cleanLiveUrl = project.liveUrl?.trim() || '';
  const cleanGithubUrl = project.githubUrl?.trim() || '';
  const displayUrl =
    cleanLiveUrl ||
    cleanGithubUrl ||
    `https://${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.app`;

  return (
    <div className="rounded-2xl overflow-hidden border border-amber-500/20 bg-[#08070A] shadow-[0_20px_50px_rgba(0,0,0,0.75)]">
      {/* macOS / Browser Window Top Bar */}
      <div className="px-4 py-3 bg-[#110F14] border-b border-white/[0.08] flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
          {cleanLiveUrl ? (
            <a
              href={cleanLiveUrl}
              target="_blank"
              rel="noreferrer"
              className="ml-2 px-2.5 py-0.5 rounded-md bg-white/[0.05] hover:bg-amber-500/15 border border-white/[0.07] hover:border-amber-400/40 text-[11px] font-mono text-amber-300 truncate max-w-[180px] sm:max-w-[280px] transition-colors"
            >
              {displayUrl}
            </a>
          ) : (
            <span className="ml-2 px-2.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.07] text-[11px] font-mono text-zinc-200 truncate max-w-[180px] sm:max-w-[260px]">
              {displayUrl}
            </span>
          )}
        </div>
        <span className="text-xs font-mono font-bold text-amber-400 shrink-0">#{num}</span>
      </div>

      {/* Screenshot Viewport */}
      <div className={`w-full ${heightClass} relative overflow-hidden bg-[#070609]`}>
        {project.image ? (
          <ProjectImage src={project.image} alt={project.title} />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-500 uppercase text-sm font-mono tracking-widest">
            Preview Unavailable
          </div>
        )}
      </div>
    </div>
  );
});

const ProjectActionsAndStack = memo(function ProjectActionsAndStack({
  project,
}: {
  project: Project;
}) {
  const cleanLiveUrl = project.liveUrl?.trim() || '';
  const cleanGithubUrl = project.githubUrl?.trim() || '';

  return (
    <div className="space-y-6 pt-2">
      <div>
        <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-amber-400 mb-3">
          Tech Stack &amp; Tools
        </h4>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 rounded-lg bg-[#16131A] border border-amber-500/25 text-zinc-100 text-xs font-mono tracking-wide"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        {cleanLiveUrl && (
          <a
            href={cleanLiveUrl}
            target="_blank"
            rel="noreferrer"
            data-cursor-text="VIEW"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-400 text-black font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(249,115,22,0.4)] hover:shadow-[0_0_35px_rgba(250,204,21,0.6)] transition-all"
          >
            Live Preview <HiArrowTopRightOnSquare className="text-base" />
          </a>
        )}
        {cleanGithubUrl && (
          <a
            href={cleanGithubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-amber-400/30 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all"
          >
            <SiGithub className="text-base" /> Source Code
          </a>
        )}
        {!cleanLiveUrl && !cleanGithubUrl && (
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-amber-500/20 text-xs font-mono uppercase tracking-wider text-amber-300">
            Commercial / Enterprise Build
          </span>
        )}
      </div>
    </div>
  );
});

const ProjectCaseStudy = memo(function ProjectCaseStudy({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const num = String(index + 1).padStart(2, '0');
  // 0: Text Left, Image Right
  // 1: Image Left, Text Right
  // 2: Image Top, Text Bottom
  const layoutMode = index % 3;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65 }}
      className="glass-panel rounded-3xl p-6 sm:p-9 lg:p-11 group hover:border-amber-400/45 transition-all duration-500"
    >
      {/* ─── LAYOUT 1: Text Left, Image Right (index % 3 === 0) ─── */}
      {layoutMode === 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-lg bg-red-500/15 border border-red-500/30 text-xs font-mono font-bold text-red-400">
                CASE STUDY #{num}
              </span>
              {project.featured && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-400/30 text-xs font-mono text-amber-300">
                  <HiSparkles className="w-3.5 h-3.5" /> Featured Work
                </span>
              )}
            </div>

            <h3 className="text-2xl sm:text-4xl font-heading font-bold text-white tracking-tight leading-tight group-hover:text-amber-300 transition-colors">
              {project.title}
            </h3>

            <p className="text-base sm:text-lg text-zinc-200 leading-relaxed font-normal">
              {project.description}
            </p>

            <ProjectActionsAndStack project={project} />
          </div>

          <div className="lg:col-span-6">
            <BrowserFrame
              project={project}
              num={num}
              heightClass="h-[260px] sm:h-[340px] lg:h-[400px]"
            />
          </div>
        </div>
      )}

      {/* ─── LAYOUT 2: Image Left, Text Right (index % 3 === 1) ─── */}
      {layoutMode === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <BrowserFrame
              project={project}
              num={num}
              heightClass="h-[260px] sm:h-[340px] lg:h-[400px]"
            />
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-lg bg-orange-500/15 border border-orange-500/30 text-xs font-mono font-bold text-orange-400">
                CASE STUDY #{num}
              </span>
              {project.featured && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-400/30 text-xs font-mono text-amber-300">
                  <HiSparkles className="w-3.5 h-3.5" /> Featured Work
                </span>
              )}
            </div>

            <h3 className="text-2xl sm:text-4xl font-heading font-bold text-white tracking-tight leading-tight group-hover:text-amber-300 transition-colors">
              {project.title}
            </h3>

            <p className="text-base sm:text-lg text-zinc-200 leading-relaxed font-normal">
              {project.description}
            </p>

            <ProjectActionsAndStack project={project} />
          </div>
        </div>
      )}

      {/* ─── LAYOUT 3: Image Top, Text Bottom (index % 3 === 2) ─── */}
      {layoutMode === 2 && (
        <div className="space-y-8">
          <BrowserFrame
            project={project}
            num={num}
            heightClass="h-[260px] sm:h-[380px] lg:h-[480px]"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-xs font-mono font-bold text-amber-300">
                  CASE STUDY #{num}
                </span>
                {project.featured && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-red-500/15 border border-red-500/30 text-xs font-mono text-red-300">
                    <HiSparkles className="w-3.5 h-3.5" /> Featured Spotlight
                  </span>
                )}
              </div>

              <h3 className="text-2xl sm:text-4xl font-heading font-bold text-white tracking-tight leading-tight group-hover:text-amber-300 transition-colors">
                {project.title}
              </h3>

              <p className="text-base sm:text-lg text-zinc-200 leading-relaxed font-normal">
                {project.description}
              </p>
            </div>

            <div className="lg:col-span-5 lg:pl-6 lg:border-l lg:border-white/[0.08]">
              <ProjectActionsAndStack project={project} />
            </div>
          </div>
        </div>
      )}
    </motion.article>
  );
});

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll
    ? projects
    : projects.filter((p) => p.featured);

  return (
    <section
      id="projects"
      className="relative bg-transparent text-zinc-100 py-24 lg:py-32 px-6 md:px-12 lg:px-16 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header + Filter Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="space-y-4 max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-xs font-mono uppercase tracking-widest text-amber-400">
              04 // Selected Works &amp; Case Studies
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold tracking-tight text-white leading-tight">
              Production-ready web apps &amp;{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400">
                digital platforms.
              </span>
            </h2>
          </div>

          {/* Toggle Featured vs All Projects */}
          <div className="inline-flex p-1.5 rounded-2xl bg-[#0D0B10]/95 border border-amber-500/25 self-start md:self-auto shadow-lg">
            <button
              onClick={() => setShowAll(false)}
              className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                !showAll
                  ? 'bg-gradient-to-r from-red-600 to-amber-500 text-black font-bold shadow-[0_0_15px_rgba(249,115,22,0.45)]'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              Featured ({projects.filter((p) => p.featured).length})
            </button>
            <button
              onClick={() => setShowAll(true)}
              className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                showAll
                  ? 'bg-gradient-to-r from-red-600 to-amber-500 text-black font-bold shadow-[0_0_15px_rgba(249,115,22,0.45)]'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              All Works ({projects.length})
            </button>
          </div>
        </motion.div>

        {/* Alternating 3-Layout Case Studies Stack */}
        <div className="space-y-10 lg:space-y-14">
          {displayedProjects.map((project, idx) => (
            <ProjectCaseStudy key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
