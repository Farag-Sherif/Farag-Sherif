import { memo } from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  subtitle: string;
  title: string;
  description?: string;
}

const SectionHeading = memo(function SectionHeading({
  subtitle,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="text-center mb-16 md:mb-20">
      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-sm uppercase tracking-[0.2em] text-violet-400 font-medium mb-4"
      >
        {subtitle}
      </motion.p>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          duration: 0.6,
          delay: 0.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent font-[Space_Grotesk,sans-serif] leading-tight"
      >
        {title}
      </motion.h2>

      {/* Description */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="text-lg text-slate-400 max-w-2xl mx-auto mt-6 leading-relaxed"
        >
          {description}
        </motion.p>
      )}

      {/* Decorative gradient line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-violet-500 to-transparent origin-center"
      />
    </div>
  );
});

export default SectionHeading;
