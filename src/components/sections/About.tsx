import { memo, useEffect, useRef, useState, useCallback } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { HiAcademicCap } from 'react-icons/hi2';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import { personal } from '../../data/personal';

/* ---------- Animation variants ---------- */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ---------- Animated counter ---------- */
interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  label: string;
}

const AnimatedCounter = memo(function AnimatedCounter({
  target,
  suffix = '+',
  label,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let frame: number;
    const duration = 2000; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <GlassCard
        hover
        className="group flex flex-col items-center justify-center p-6 text-center h-full"
      >
        <div ref={ref} className="relative">
          <span
            className="text-4xl md:text-5xl font-bold font-heading
                       bg-gradient-to-r from-violet-400 to-cyan-400
                       bg-clip-text text-transparent"
          >
            {count}
            {suffix}
          </span>
        </div>
        <span className="mt-2 text-sm text-slate-400 font-medium">{label}</span>
      </GlassCard>
    </motion.div>
  );
});

/* ---------- Stats config ---------- */
const stats = [
  { target: personal.stats.yearsExperience, label: 'Years Experience' },
  { target: personal.stats.projectsCompleted, label: 'Projects Completed' },
  { target: personal.stats.technologies, label: 'Technologies' },
  { target: personal.stats.professionalRoles, label: 'Professional Roles' },
] as const;

/* ---------- About component ---------- */
const About = memo(function About() {
  const handleImageError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      e.currentTarget.style.display = 'none';
    },
    [],
  );

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <SectionHeading subtitle="About Me" title="Who I Am" />

        {/* Two-column layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-20 items-center"
        >
          {/* Left — Image */}
          <motion.div variants={fadeUp} className="flex justify-center">
            <div className="relative">
              {/* Glow behind image */}
              <div
                className="absolute inset-0 -z-10 scale-110 rounded-3xl opacity-40 blur-3xl"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(139,92,246,0.35) 0%, rgba(6,182,212,0.2) 50%, transparent 80%)',
                }}
              />

              {/* Gradient border frame */}
              <div className="relative rounded-2xl p-[2px] bg-gradient-to-br from-violet-500/60 via-fuchsia-500/30 to-cyan-500/60">
                <div className="rounded-2xl bg-[#030712] p-2">
                  <motion.div
                    animate={{ y: [-8, 8, -8] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="overflow-hidden rounded-xl"
                  >
                    <img
                      src={personal.profileImage}
                      alt={personal.name}
                      onError={handleImageError}
                      className="aspect-square w-full max-w-[260px] sm:max-w-[320px] object-cover object-top md:max-w-[380px]"
                      loading="eager"
                    />
                  </motion.div>
                </div>
              </div>

              {/* Decorative dots */}
              <div className="absolute -bottom-6 -right-6 grid grid-cols-3 gap-2 opacity-30">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-2 w-2 rounded-full bg-violet-500"
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Text content */}
          <motion.div variants={containerVariants} className="space-y-5">
            {personal.about.map((paragraph, index) => (
              <motion.p
                key={index}
                variants={fadeUp}
                className="text-base leading-relaxed text-slate-400"
              >
                {paragraph}
              </motion.p>
            ))}

            {/* Education card */}
            <motion.div variants={fadeUp}>
              <GlassCard
                hover
                className="mt-8 flex items-center gap-4 p-5"
              >
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl
                             bg-gradient-to-br from-violet-500/20 to-cyan-500/20
                             border border-violet-500/20"
                >
                  <HiAcademicCap className="h-7 w-7 text-violet-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-100 font-heading">
                    {personal.education.degree}
                  </h4>
                  <p className="text-sm text-slate-400">
                    {personal.education.university} &middot;{' '}
                    {personal.education.faculty}
                  </p>
                  <p className="mt-0.5 text-xs text-violet-400 font-medium">
                    {personal.education.period}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {stats.map((stat) => (
            <AnimatedCounter
              key={stat.label}
              target={stat.target}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

export default About;
