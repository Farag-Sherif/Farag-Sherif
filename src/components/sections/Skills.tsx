import { useState, useMemo, memo, lazy, Suspense } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import { skills, skillCategories, type Skill } from '../../data/skills';

const SkillsSphere = lazy(() => import('../3d/SkillsSphere'));

/* ---------- Animation variants ---------- */
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
  exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.3 } },
};



/* ---------- Skill card ---------- */
interface SkillCardProps {
  skill: Skill;
  index: number;
}

const SkillCard = memo(function SkillCard({ skill, index }: SkillCardProps) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
    >
      <GlassCard hover className="group p-6">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl
                       border transition-colors duration-300"
            style={{
              borderColor: `${skill.color}25`,
              backgroundColor: `${skill.color}10`,
            }}
          >
            <skill.icon
              className="h-7 w-7 transition-transform duration-300 group-hover:scale-110"
              style={{ color: skill.color }}
            />
          </div>

          {/* Name & proficiency */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-semibold text-slate-100 font-heading">
                {skill.name}
              </h4>
              <span
                className="text-sm font-semibold"
                style={{ color: skill.color }}
              >
                {skill.proficiency}%
              </span>
            </div>

            {/* Proficiency bar */}
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.proficiency}%` }}
                transition={{ duration: 1.2, delay: index * 0.08 + 0.3, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${skill.color}90, ${skill.color})`,
                  boxShadow: `0 0 12px ${skill.color}40`,
                }}
              />
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
});

/* ---------- Skills component ---------- */
const Skills = memo(function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('frontend');

  // Filtered skills for active category
  const filteredSkills = useMemo(
    () => skills.filter((s) => s.category === activeCategory),
    [activeCategory],
  );

  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <SectionHeading subtitle="My Skills" title="Technologies I Work With" />

        {/* 3D Skills Sphere Centerpiece */}
        <div className="mb-16">
          <Suspense fallback={<div className="h-[400px] w-full animate-pulse rounded-2xl bg-white/5 md:h-[600px]" />}>
            <SkillsSphere />
          </Suspense>
        </div>

        {/* Category tabs */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          {skillCategories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key)}
              className={`relative rounded-full px-6 py-2.5 text-sm font-semibold
                         transition-all duration-300 ${
                           activeCategory === cat.key
                             ? 'text-white shadow-lg shadow-violet-500/20'
                             : 'border border-white/[0.08] bg-white/[0.03] text-slate-400 hover:border-white/[0.15] hover:text-slate-200'
                         }`}
            >
              {/* Active indicator with layoutId */}
              {activeCategory === cat.key && (
                <motion.div
                  layoutId="active-skill-tab"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Skill cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredSkills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Marquee keyframes */}
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right linear infinite;
        }
      `}</style>
    </section>
  );
});

export default Skills;
