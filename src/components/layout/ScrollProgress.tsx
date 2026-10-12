import { memo } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = memo(function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left"
      style={{
        scaleX,
        background:
          'linear-gradient(90deg, #EF4444 0%, #F97316 50%, #FACC15 100%)',
        transformOrigin: '0%',
      }}
    />
  );
});

export default ScrollProgress;
