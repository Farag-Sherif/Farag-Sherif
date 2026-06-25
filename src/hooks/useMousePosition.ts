import { useState, useEffect, useCallback, useRef } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

/**
 * Tracks mouse position normalized to [-1, 1] range.
 * Returns { x: 0, y: 0 } on touch devices.
 * Throttled to ~60fps for performance.
 */
export function useMousePosition(throttleMs: number = 16): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const isTouchDevice = useRef(false);
  const lastUpdate = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    isTouchDevice.current =
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window);
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (isTouchDevice.current) return;

      const now = Date.now();
      if (now - lastUpdate.current < throttleMs) return;
      lastUpdate.current = now;

      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = (event.clientY / window.innerHeight) * 2 - 1;
        setPosition({ x, y });
        rafId.current = null;
      });
    },
    [throttleMs]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleMouseMove]);

  return position;
}

export default useMousePosition;
