import { useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

/**
 * Returns a number between 0 and 1 representing
 * how far the user has scrolled down the page.
 */
export function useScrollProgress(): number {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setProgress(latest);
  });

  return progress;
}

export default useScrollProgress;
