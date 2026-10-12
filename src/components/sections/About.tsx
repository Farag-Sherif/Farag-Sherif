import { motion } from 'framer-motion';
import {
  HiOutlineCodeBracketSquare,
  HiOutlineCpuChip,
  HiOutlineBolt,
  HiOutlineAcademicCap,
  HiOutlineMapPin,
} from 'react-icons/hi2';
import { personal } from '../../data/personal';

const ENGINEERING_PILLARS = [
  {
    icon: HiOutlineCodeBracketSquare,
    title: 'Modular UI Architecture',
    description:
      'Building scalable, reusable React & Next.js component systems with strict TypeScript contracts and maintainable state patterns.',
    accent: 'text-amber-400',
  },
  {
    icon: HiOutlineCpuChip,
    title: 'API & Data Integration',
    description:
      'Connecting complex RESTful APIs, authentication flows, and dynamic multilingual content into seamless user interfaces.',
    accent: 'text-orange-400',
  },
  {
    icon: HiOutlineBolt,
    title: 'Performance & UX Polish',
    description:
      'Optimizing Core Web Vitals, code splitting, responsive layouts, and fluid micro-interactions across all devices.',
    accent: 'text-red-400',
  },
] as const;

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-transparent text-zinc-100 py-24 lg:py-32 px-6 md:px-12 lg:px-16"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl space-y-4"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-xs font-mono uppercase tracking-widest text-amber-400">
            01 // About &amp; Engineering Philosophy
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold tracking-tight text-white leading-tight">
            Bridging clean frontend architecture with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400">
              intuitive digital products.
            </span>
          </h2>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Narrative Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 glass-panel rounded-3xl p-7 sm:p-10 space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4 text-base sm:text-lg text-zinc-200 leading-relaxed font-normal">
              {personal.about.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <HiOutlineMapPin className="w-5 h-5 text-amber-400" />
                <span className="text-sm text-zinc-200">{personal.location}</span>
              </div>
              <a
                href={personal.resumeUrl}
                download="Farag_Sherif_CV.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600/20 to-amber-500/20 hover:from-red-600/35 hover:to-amber-500/35 border border-amber-400/35 text-amber-300 text-xs font-semibold uppercase tracking-wider transition-all"
              >
                Download Full Résumé
              </a>
            </div>
          </motion.div>

          {/* Full Uncropped Portrait & Academic Side Bento Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6"
          >
            {/* Full Uncropped Square Portrait Container */}
            <div className="w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#141118] via-[#0D0B10] to-[#08070A] border border-amber-500/25 relative flex items-end justify-center pt-4 px-4">
              {/* Warm radial spotlight behind portrait */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 50% 45%, rgba(249, 115, 22, 0.22) 0%, rgba(239, 68, 68, 0.08) 45%, transparent 75%)',
                }}
              />
              <img
                src={personal.profileImage}
                alt={personal.name}
                className="relative z-10 w-full max-w-[320px] h-auto object-contain block"
              />
              <span className="absolute top-3 right-3 z-20 px-3 py-1 rounded-lg bg-[#060608]/85 backdrop-blur-md border border-amber-500/30 text-xs font-mono text-amber-300">
                {personal.shortName}
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-orange-400">
                <HiOutlineAcademicCap className="w-4 h-4" />
                Academic Background
              </div>
              <h3 className="text-xl font-bold text-white">
                {personal.education.degree}
              </h3>
              <p className="text-sm text-zinc-200">
                {personal.education.faculty} — {personal.education.university}
              </p>
              <span className="inline-block px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-amber-300">
                {personal.education.period}
              </span>
            </div>
          </motion.div>

          {/* 3 Engineering Pillars Row */}
          {ENGINEERING_PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="lg:col-span-4 glass-card rounded-3xl p-7 space-y-3"
            >
              <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-amber-500/20 flex items-center justify-center">
                <pillar.icon className={`w-6 h-6 ${pillar.accent}`} />
              </div>
              <h3 className="text-lg font-bold text-white">{pillar.title}</h3>
              <p className="text-sm text-zinc-200 leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
