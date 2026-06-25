import { useState, useEffect, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = memo(function LoadingScreen({
  onComplete,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleComplete = useCallback(() => {
    setIsVisible(false);
    // Delay callback to allow exit animation to play
    setTimeout(onComplete, 800);
  }, [onComplete]);

  useEffect(() => {
    let progressInterval: ReturnType<typeof setInterval>;
    let minimumTimer: ReturnType<typeof setTimeout>;
    let windowLoaded = document.readyState === 'complete';
    let minimumTimePassed = false;

    // Simulate progress
    progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Slow down as we approach 100 if not ready
        const increment =
          prev < 70 ? Math.random() * 8 + 2 : Math.random() * 3 + 0.5;
        return Math.min(prev + increment, windowLoaded ? 100 : 90);
      });
    }, 50);

    // Minimum 2 second display
    minimumTimer = setTimeout(() => {
      minimumTimePassed = true;
      if (windowLoaded) {
        setProgress(100);
      }
    }, 2000);

    const onWindowLoad = () => {
      windowLoaded = true;
      if (minimumTimePassed) {
        setProgress(100);
      }
    };

    if (document.readyState === 'complete') {
      windowLoaded = true;
    } else {
      window.addEventListener('load', onWindowLoad);
    }

    return () => {
      clearInterval(progressInterval);
      clearTimeout(minimumTimer);
      window.removeEventListener('load', onWindowLoad);
    };
  }, []);

  // Trigger exit when progress reaches 100
  useEffect(() => {
    if (progress >= 100) {
      const exitTimer = setTimeout(handleComplete, 400);
      return () => clearTimeout(exitTimer);
    }
  }, [progress, handleComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: 'blur(10px)',
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#030712]"
        >
          {/* Pulsing glow effect behind logo */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute w-[200px] h-[200px] rounded-full bg-gradient-to-r from-violet-600/40 to-cyan-600/40 blur-[80px]"
          />

          {/* Secondary glow ring */}
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute w-[300px] h-[300px] rounded-full border border-violet-500/20 blur-sm"
          />

          {/* FS Monogram */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative mb-12"
          >
            <motion.h1
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="text-7xl md:text-8xl font-bold font-[Space_Grotesk,sans-serif] bg-clip-text text-transparent select-none"
              style={{
                backgroundImage:
                  'linear-gradient(135deg, #8B5CF6, #06B6D4, #F43F5E, #8B5CF6)',
                backgroundSize: '300% 300%',
              }}
            >
              FS
            </motion.h1>
          </motion.div>

          {/* Progress bar container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative w-48 md:w-64"
          >
            {/* Track */}
            <div className="h-[2px] w-full bg-white/[0.08] rounded-full overflow-hidden">
              {/* Fill */}
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    'linear-gradient(90deg, #8B5CF6, #06B6D4, #F43F5E)',
                  width: `${progress}%`,
                }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Progress percentage */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-xs text-slate-500 mt-4 font-mono tracking-widest"
            >
              {Math.round(progress)}%
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default LoadingScreen;
