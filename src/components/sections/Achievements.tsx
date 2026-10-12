import { motion } from 'framer-motion';
import { personal } from '../../data/personal';

export default function Achievements() {
  const stats = [
    {
      label: 'Years of Experience',
      value: personal.stats.yearsExperience,
      suffix: '+',
      detail: 'Building modern web apps',
    },
    {
      label: 'Projects Delivered',
      value: personal.stats.projectsCompleted,
      suffix: '+',
      detail: 'Commercial & open-source',
    },
    {
      label: 'Core Technologies',
      value: personal.stats.technologies,
      suffix: '+',
      detail: 'React, TS, Next.js & tools',
    },
    {
      label: 'Industry Roles',
      value: personal.stats.professionalRoles,
      suffix: '',
      detail: 'Engineering & leadership',
    },
  ];

  return (
    <section
      id="achievements"
      className="relative bg-transparent text-zinc-100 py-12 px-6 md:px-12 lg:px-16"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between"
            >
              <span className="text-3xl sm:text-5xl font-heading font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400">
                {stat.value}
                {stat.suffix}
              </span>
              <div className="mt-3">
                <span className="block text-sm font-semibold text-white">
                  {stat.label}
                </span>
                <span className="block text-xs text-zinc-300 mt-0.5">
                  {stat.detail}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
