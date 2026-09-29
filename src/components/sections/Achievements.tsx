import { motion } from 'framer-motion';
import { personal } from '../../data/personal';

export default function Achievements() {
  const stats = [
    { label: "Years Experience", value: personal.stats.yearsExperience, suffix: "+" },
    { label: "Projects Completed", value: personal.stats.projectsCompleted, suffix: "+" },
    { label: "Technologies", value: personal.stats.technologies, suffix: "" },
    { label: "Professional Roles", value: personal.stats.professionalRoles, suffix: "" },
  ];

  return (
    <section className="bg-[#C85A3E] text-[#151515] py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-screen-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <span className="text-6xl md:text-8xl lg:text-[8rem] font-bold tracking-tighter leading-none mb-4">
                {stat.value}{stat.suffix}
              </span>
              <span className="text-lg md:text-xl font-bold uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
