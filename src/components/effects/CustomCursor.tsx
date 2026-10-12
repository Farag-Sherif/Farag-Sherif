import React, { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const SPRING_CONFIG = { damping: 25, stiffness: 350, mass: 0.2 };
const SLOW_SPRING = { damping: 30, stiffness: 200, mass: 0.5 };

const INTERACTIVE_SELECTORS =
  'a, button, [role="button"], input, textarea, select, [data-cursor-hover]';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const dotX = useSpring(cursorX, SPRING_CONFIG);
  const dotY = useSpring(cursorY, SPRING_CONFIG);

  const ringX = useSpring(cursorX, SLOW_SPRING);
  const ringY = useSpring(cursorY, SLOW_SPRING);

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
    const interactiveEl = target.closest(INTERACTIVE_SELECTORS);
    if (interactiveEl) {
      setIsHovering(true);
      const text = interactiveEl.getAttribute('data-cursor-text');
      if (text) {
        setHoverText(text);
      } else {
        setHoverText('');
      }
    }
  }, []);

  const handleMouseOut = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest(INTERACTIVE_SELECTORS)) {
      setIsHovering(false);
      setHoverText('');
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
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          width: 48,
          height: 48,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 9998,
          backgroundColor:
            isHovering && hoverText ? 'rgba(250, 204, 21, 0.92)' : 'transparent',
          border:
            isHovering && !hoverText
              ? '1px solid rgba(249, 115, 22, 0.8)'
              : '1px solid rgba(250, 204, 21, 0.28)',
        }}
        animate={{
          scale: isHovering ? (hoverText ? 1.5 : 1.2) : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {isHovering && hoverText && (
          <span className="text-[#060608] text-[8px] font-bold tracking-widest uppercase">
            {hoverText}
          </span>
        )}
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          x: dotX,
          y: dotY,
          width: 7,
          height: 7,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 9999,
          backgroundColor: '#FACC15',
          boxShadow: '0 0 14px rgba(249, 115, 22, 0.9)',
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      />
    </>
  );
};

export default React.memo(CustomCursor);
