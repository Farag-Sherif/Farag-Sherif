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
          'linear-gradient(90deg, #8B5CF6 0%, #06B6D4 50%, #F43F5E 100%)',
        transformOrigin: '0%',
      }}
    />
  );
});

export default ScrollProgress;
