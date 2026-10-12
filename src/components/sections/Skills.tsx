import { motion } from 'framer-motion';
import { skills, skillCategories } from '../../data/skills';

export default function Skills() {
  return (
    <section
      id="skills"
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
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-xs font-mono uppercase tracking-widest text-amber-400">
              02 // Technical Stack &amp; Ecosystem
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold tracking-tight text-white leading-tight">
              Modern tools engineered for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400">
                production scale.
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-300 max-w-md">
            Type-safe frontend development, component-driven styling, and version-controlled workflows.
          </p>
        </motion.div>

        {/* 4 Category Bento Cards with Proficiency Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, idx) => {
            const categorySkills = skills.filter((s) => s.category === category.key);

            return (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="glass-panel rounded-3xl p-7 sm:p-8"
              >
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {category.label}
                    </h3>
                    <p className="text-xs text-zinc-300 mt-1">
                      {category.description}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-xs font-mono text-amber-300">
                    {categorySkills.length} Skills
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {categorySkills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] transition-all space-y-2.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="text-xl"
                            style={{ color: skill.color }}
                          >
                            <skill.icon />
                          </span>
                          <span className="text-sm font-semibold text-white">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-amber-300">
                          {skill.proficiency}%
                        </span>
                      </div>

                      {/* Crimson -> Orange -> Gold Progress Bar */}
                      <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
