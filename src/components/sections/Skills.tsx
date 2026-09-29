import { motion } from 'framer-motion';
import { skills, skillCategories } from '../../data/skills';
import SkillsSphere from '../3d/SkillsSphere';

export default function Skills() {
  return (
    <section id="skills" className="bg-[#F4F0E8] text-[#151515] py-24 lg:py-48 px-6 lg:px-12">
      <div className="max-w-screen-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24 lg:mb-32 text-center"
        >
          <h2 className="text-5xl lg:text-[7rem] font-bold uppercase tracking-tighter leading-none text-[#151515] mb-6">
            Technical <br/> Arsenal.
          </h2>
        </motion.div>

        {/* 3D Visualization for Desktop */}
        <div className="hidden lg:block w-full h-[800px] bg-[#151515]/5 rounded-3xl overflow-hidden mb-32">
          <SkillsSphere />
        </div>

        {/* 2D Fallback for Mobile (and detailed view) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-12">
          {skillCategories.map((category, idx) => {
            const categorySkills = skills.filter((s) => s.category === category.key);
            
            return (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group"
              >
                <div className="mb-10 pb-4 border-b-2 border-[#151515]">
                  <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-[#151515]">
                    {category.label}
                  </h3>
                  <p className="text-sm font-medium uppercase tracking-widest text-[#C85A3E] mt-2">
                    {category.description}
                  </p>
                </div>
                
                <ul className="space-y-6">
                  {categorySkills.map((skill) => (
                    <li key={skill.name} className="flex items-center gap-4">
                      <span className="text-3xl text-[#151515] group-hover:text-[#C85A3E] transition-colors duration-300">
                        <skill.icon />
                      </span>
                      <span className="text-lg md:text-xl font-medium tracking-wide text-[#151515]">
                        {skill.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
