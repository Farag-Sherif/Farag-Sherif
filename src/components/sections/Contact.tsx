import { motion } from 'framer-motion';
import { personal } from '../../data/personal';

export default function Contact() {
  return (
    <section id="contact" className="bg-[#151515] text-[#F4F0E8] pt-32 pb-16 px-6 lg:px-12 flex flex-col justify-between min-h-screen">
      <div className="max-w-screen-2xl mx-auto w-full flex-grow flex flex-col justify-center">
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left mb-24"
        >
          <h2 className="text-6xl md:text-[8rem] lg:text-[12rem] font-bold uppercase tracking-tighter leading-none mb-8 text-[#F4F0E8] hover:text-[#C85A3E] transition-colors duration-700">
            Let's Build <br/> 
            <span className="text-[#C85A3E]">Something</span> <br/>
            Worth Using.
          </h2>
          
          <div className="max-w-2xl mx-auto lg:mx-0 mt-16">
            <p className="text-2xl lg:text-4xl font-light text-[#F4F0E8]/80 mb-12 leading-relaxed">
              {personal.contactText}
            </p>
            <a 
              href={`mailto:${personal.email}`}
              className="inline-block text-3xl md:text-5xl font-medium border-b-2 border-[#C85A3E] pb-2 hover:text-[#C85A3E] transition-colors duration-300"
            >
              {personal.email}
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
