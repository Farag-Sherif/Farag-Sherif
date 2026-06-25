import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring } from 'framer-motion';
import { personal } from '../../data/personal';
import { HiOutlineCalendarDays, HiOutlineFolderOpen, HiOutlineCpuChip, HiOutlineBriefcase } from 'react-icons/hi2';
import GlassCard from '../ui/GlassCard';

function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [hasStarted, setHasStarted] = useState(false);
  const springValue = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  useEffect(() => {
    if (inView && !hasStarted) {
      setHasStarted(true);
      springValue.set(value);
    }
  }, [inView, hasStarted, springValue, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toString();
      }
    });
  }, [springValue]);

  return <span ref={ref}>0</span>;
}

export default function Achievements() {
  const { stats } = personal;

  const statItems = [
    { label: 'Years of Experience', value: stats.yearsExperience, icon: HiOutlineCalendarDays },
    { label: 'Projects Completed', value: stats.projectsCompleted, icon: HiOutlineFolderOpen },
    { label: 'Technologies', value: stats.technologies, icon: HiOutlineCpuChip },
    { label: 'Professional Roles', value: stats.professionalRoles, icon: HiOutlineBriefcase },
  ];

  return (
    <div className="w-full relative z-10 py-12 border-y border-white/5 bg-white/[0.01]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statItems.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard className="p-6 text-center flex flex-col items-center justify-center h-full">
                  <div className="mb-4 p-3 rounded-full bg-white/5 text-cyan-400">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-4xl font-bold text-white mb-2 flex items-center justify-center font-heading">
                    <AnimatedCounter value={stat.value} />
                    <span className="text-violet-400 ml-1">+</span>
                  </h3>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
