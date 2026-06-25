import React, { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const SPRING_CONFIG = { damping: 25, stiffness: 250, mass: 0.5 };
const RING_SPRING_CONFIG = { damping: 20, stiffness: 150, mass: 0.8 };

const INTERACTIVE_SELECTORS =
  'a, button, [role="button"], input, textarea, select, [data-cursor-hover]';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const dotX = useSpring(cursorX, SPRING_CONFIG);
  const dotY = useSpring(cursorY, SPRING_CONFIG);

  const ringX = useSpring(cursorX, RING_SPRING_CONFIG);
  const ringY = useSpring(cursorY, RING_SPRING_CONFIG);

  useEffect(() => {
    const isTouch =
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window;
    setIsTouchDevice(isTouch);
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      if (!isVisible) setIsVisible(true);
    },
    [cursorX, cursorY, isVisible]
  );

  const handleMouseOver = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest(INTERACTIVE_SELECTORS)) {
      setIsHovering(true);
    }
  }, []);

  const handleMouseOut = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest(INTERACTIVE_SELECTORS)) {
      setIsHovering(false);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.documentElement.removeEventListener(
        'mouseleave',
        handleMouseLeave
      );
      document.documentElement.removeEventListener(
        'mouseenter',
        handleMouseEnter
      );
    };
  }, [
    isTouchDevice,
    handleMouseMove,
    handleMouseOver,
    handleMouseOut,
    handleMouseLeave,
    handleMouseEnter,
  ]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Main dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          x: dotX,
          y: dotY,
          width: 8,
          height: 8,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 9999,
          backgroundColor: '#8B5CF6',
          boxShadow: '0 0 12px rgba(139, 92, 246, 0.8)',
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />

      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          width: 40,
          height: 40,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 9998,
          border: '1.5px solid transparent',
          backgroundClip: 'padding-box',
          backgroundImage:
            'linear-gradient(#030712, #030712), linear-gradient(135deg, #8B5CF6, #06B6D4, #F43F5E)',
          backgroundOrigin: 'border-box',
        }}
        animate={{
          scale: isHovering ? 1.8 : 1,
          opacity: isVisible ? 0.6 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />

      {/* Gradient ring using a pseudo-element approach with an additional element */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          width: 40,
          height: 40,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 9997,
          background:
            'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(6, 182, 212, 0.1), rgba(244, 63, 94, 0.1))',
          filter: 'blur(8px)',
        }}
        animate={{
          scale: isHovering ? 2.2 : 1,
          opacity: isVisible ? 0.5 : 0,
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      />
    </>
  );
};

export default React.memo(CustomCursor);
