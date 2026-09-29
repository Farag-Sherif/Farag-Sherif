import { motion } from 'framer-motion';
import { personal } from '../../data/personal';

export default function About() {
  return (
    <section id="about" className="bg-[#151515] text-[#F4F0E8] py-24 lg:py-48 px-6 lg:px-12">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        
        <motion.div 
          className="lg:col-span-5 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="w-full aspect-[4/5] bg-[#F4F0E8]/5 overflow-hidden">
            <img 
              src={personal.profileImage} 
              alt={personal.name} 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-700" 
            />
          </div>
          <div className="absolute -bottom-8 -right-8 w-64 h-64 border border-[#C85A3E] hidden md:block" />
        </motion.div>

        <motion.div 
          className="lg:col-span-7 space-y-12"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-none">
            I don't just build websites. <br/>
            <span className="text-[#C85A3E]">I craft digital experiences.</span>
          </h2>
          
          <div className="space-y-8 text-xl lg:text-3xl font-light leading-snug text-[#F4F0E8]/90">
            {personal.about.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="pt-8 flex items-center gap-8">
            <a 
              href={personal.resumeUrl} 
              target="_blank" 
              rel="noreferrer"
              className="inline-block px-8 py-4 bg-[#C85A3E] text-[#151515] font-bold uppercase tracking-widest hover:bg-[#F4F0E8] transition-colors duration-300"
            >
              Download Résumé
            </a>
            <div className="text-sm font-medium uppercase tracking-widest text-[#F4F0E8]/50">
              <span className="block text-[#C85A3E]">Based In</span>
              {personal.location}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
