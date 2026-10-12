import { motion } from 'framer-motion';
import { HiOutlineBriefcase } from 'react-icons/hi2';
import { experiences } from '../../data/experience';

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative bg-transparent text-zinc-100 py-24 lg:py-32 px-6 md:px-12 lg:px-16"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="space-y-4 max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-xs font-mono uppercase tracking-widest text-amber-400">
              03 // Career Trajectory
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold tracking-tight text-white leading-tight">
              Professional experience &amp;{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400">
                industry roles.
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-300 max-w-md">
            Delivering production web applications, leading technical tracks, and mentoring developers.
          </p>
        </motion.div>

        {/* Timeline Cards */}
        <div className="relative border-l border-amber-500/30 pl-6 sm:pl-10 space-y-6">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="relative group"
            >
              {/* Timeline Indicator Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-7 w-3.5 h-3.5 rounded-full bg-amber-400 ring-4 ring-[#060608] group-hover:scale-125 transition-transform shadow-[0_0_15px_#F97316]" />

              <div className="glass-panel rounded-3xl p-6 sm:p-8 hover:border-amber-400/45 transition-all">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-1">
                      <HiOutlineBriefcase className="w-4 h-4" />
                      {exp.company}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {exp.role}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg bg-orange-500/15 border border-orange-500/30 text-xs font-mono text-amber-300">
                      {exp.type}
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08] text-xs font-mono text-zinc-200">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                </div>

                <p className="text-sm sm:text-base leading-relaxed text-zinc-200 font-normal">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
