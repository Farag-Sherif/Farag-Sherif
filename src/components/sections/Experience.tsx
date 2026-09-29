import { motion } from 'framer-motion';
import { experiences } from '../../data/experience';

export default function Experience() {
  return (
    <section id="experience" className="bg-[#151515] text-[#F4F0E8] py-24 lg:py-48 px-6 lg:px-12">
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <h2 className="text-5xl lg:text-8xl font-bold uppercase tracking-tighter leading-none text-[#F4F0E8]">
            Career <br/> <span className="text-[#C85A3E]">Trajectory</span>
          </h2>
          <p className="text-lg lg:text-xl font-light max-w-md text-[#F4F0E8]/70">
            A chronological timeline of roles, responsibilities, and professional growth in the engineering space.
          </p>
        </motion.div>

        <div className="relative border-l-2 border-[#F4F0E8]/20 pl-8 md:pl-16 space-y-24 md:space-y-32">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[35px] md:-left-[67px] top-2 md:top-4 w-4 h-4 bg-[#C85A3E] rounded-full group-hover:scale-150 transition-transform duration-500 shadow-[0_0_15px_#C85A3E]" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                <div className="lg:col-span-4">
                  <div className="sticky top-24">
                    <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-[#F4F0E8] mb-2">
                      {exp.role}
                    </h3>
                    <p className="text-xl md:text-2xl font-light text-[#C85A3E] mb-4">
                      {exp.company}
                    </p>
                    <div className="flex items-center gap-4 text-sm font-medium uppercase tracking-widest text-[#F4F0E8]/60">
                      <span>{exp.startDate} &mdash; {exp.endDate}</span>
                      <span className="w-1.5 h-1.5 bg-[#F4F0E8]/60 rounded-full" />
                      <span>{exp.type}</span>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-8 lg:pt-2">
                  <p className="text-lg md:text-2xl leading-relaxed font-light text-[#F4F0E8]/80 group-hover:text-[#F4F0E8] transition-colors duration-500">
                    {exp.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
