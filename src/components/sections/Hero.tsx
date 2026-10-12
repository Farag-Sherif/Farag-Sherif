import { memo } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineEnvelope,
  HiArrowDownRight,
  HiArrowUpRight,
  HiCommandLine,
  HiSparkles,
} from 'react-icons/hi2';
import { FaLinkedin } from 'react-icons/fa';
import {
  SiGithub,
  SiWhatsapp,
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
} from 'react-icons/si';

import { personal } from '../../data/personal';

const socials = [
  { name: 'GitHub', icon: SiGithub, href: personal.social.github },
  { name: 'LinkedIn', icon: FaLinkedin, href: personal.social.linkedin },
  { name: 'WhatsApp', icon: SiWhatsapp, href: personal.social.whatsapp },
  { name: 'Email', icon: HiOutlineEnvelope, href: personal.social.email },
] as const;

const coreBadges = [
  { name: 'React.js', icon: SiReact, color: '#61DAFB' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38BDF8' },
] as const;

const Hero = memo(function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[100dvh] bg-transparent flex flex-col justify-center px-6 md:px-12 lg:px-16 pt-28 pb-16 overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* ─── Left Column: Value Proposition & Actions ─── */}
          <div className="lg:col-span-7 space-y-7">
            {/* Availability Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex flex-wrap items-center gap-3 px-4 py-1.5 rounded-full glass-card border border-amber-500/30"
            >
              <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                Available for Frontend Roles
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-xs font-mono text-zinc-200">
                React / TypeScript / Next.js
              </span>
            </motion.div>

            {/* Bold Senior Engineer Headline */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-4xl sm:text-6xl lg:text-[4.25rem] font-heading font-bold text-white leading-[1.06] tracking-tight">
                Farag Mohammed{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400">
                  Sherif.
                </span>
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl font-heading font-medium text-zinc-100 leading-snug">
                Frontend Engineer building scalable interfaces &amp; high-performance web applications.
              </p>
            </motion.div>

            {/* Concise Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-zinc-200 leading-relaxed max-w-2xl font-normal"
            >
              {personal.bio} Focused on clean component architecture, seamless REST API integration, and pixel-accurate user experiences.
            </motion.p>

            {/* Core Stack Pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-2.5"
            >
              {coreBadges.map((item) => (
                <span
                  key={item.name}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.05] border border-amber-500/20 text-xs font-medium text-zinc-100"
                >
                  <item.icon style={{ color: item.color }} className="w-4 h-4" />
                  {item.name}
                </span>
              ))}
            </motion.div>

            {/* Primary CTAs & Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="pt-2 flex flex-wrap items-center gap-4"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-400 text-black font-bold text-sm tracking-wide shadow-[0_0_30px_rgba(249,115,22,0.45)] hover:shadow-[0_0_40px_rgba(250,204,21,0.65)] transition-all duration-300"
              >
                Explore Selected Works <HiArrowDownRight className="w-4 h-4" />
              </a>

              <a
                href={personal.resumeUrl}
                download="Farag_Sherif_CV.pdf"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl glass-card text-zinc-100 hover:text-amber-300 text-sm font-semibold tracking-wide"
              >
                Download CV <HiArrowUpRight className="w-4 h-4 text-amber-400" />
              </a>

              <div className="flex items-center gap-2.5 ml-0 sm:ml-2">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-11 h-11 rounded-xl glass-card flex items-center justify-center text-zinc-200 hover:text-amber-400 hover:border-amber-400/50 transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ─── Right Column: Interactive Developer Profile & Code Card ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="lg:col-span-5"
          >
            <div className="glass-panel rounded-3xl p-5 sm:p-6 border border-amber-500/25 relative overflow-hidden">
              {/* Window Top Bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[11px] font-mono text-zinc-300 flex items-center gap-1.5">
                  <HiCommandLine className="w-3.5 h-3.5 text-amber-400" />
                  engineer.profile.tsx
                </span>
              </div>

              {/* Developer Identity Card */}
              <div className="flex items-center gap-4 mb-5">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border border-amber-400/40 bg-zinc-900 shrink-0">
                  <img
                    src={personal.profileImage}
                    alt={personal.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-amber-400">
                    <HiSparkles className="w-3.5 h-3.5" /> Verified Frontend Engineer
                  </span>
                  <h2 className="text-lg font-bold text-white mt-0.5">
                    {personal.name}
                  </h2>
                  <p className="text-xs text-zinc-300 mt-0.5">
                    {personal.education.degree} • {personal.education.university}
                  </p>
                </div>
              </div>

              {/* Clean Live Code Architecture Preview */}
              <div className="rounded-2xl bg-[#070609]/95 border border-white/[0.08] p-4 font-mono text-xs leading-relaxed text-zinc-200 space-y-1.5">
                <div>
                  <span className="text-red-400">const</span>{' '}
                  <span className="text-amber-300">engineer</span> = {'{'}
                </div>
                <div className="pl-4">
                  <span className="text-zinc-400">focus:</span>{' '}
                  <span className="text-yellow-300">&apos;Scalable React &amp; Next.js UI&apos;</span>,
                </div>
                <div className="pl-4">
                  <span className="text-zinc-400">architecture:</span>{' '}
                  <span className="text-orange-300">
                    [&apos;TypeScript&apos;, &apos;REST APIs&apos;, &apos;Tailwind&apos;]
                  </span>,
                </div>
                <div className="pl-4">
                  <span className="text-zinc-400">projectsDelivered:</span>{' '}
                  <span className="text-red-400 font-bold">{personal.stats.projectsCompleted}+</span>,
                </div>
                <div>{'}'};</div>
              </div>

              {/* Mini Stats Grid inside Card */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="rounded-xl bg-white/[0.04] border border-white/[0.08] p-3 text-center">
                  <span className="block text-xl font-bold text-white">
                    {personal.stats.yearsExperience}+
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-300">
                    Years Exp.
                  </span>
                </div>
                <div className="rounded-xl bg-white/[0.04] border border-white/[0.08] p-3 text-center">
                  <span className="block text-xl font-bold text-amber-400">
                    {personal.stats.projectsCompleted}+
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-300">
                    Projects
                  </span>
                </div>
                <div className="rounded-xl bg-white/[0.04] border border-white/[0.08] p-3 text-center">
                  <span className="block text-xl font-bold text-red-400">
                    {personal.stats.technologies}+
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-300">
                    Tech Stack
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default Hero;
