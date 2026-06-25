import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface FloatingParticlesProps {
  className?: string;
  count?: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

const COLORS = [
  'rgba(139, 92, 246, 0.6)',   // violet
  'rgba(6, 182, 212, 0.5)',    // cyan
  'rgba(244, 63, 94, 0.4)',    // rose
  'rgba(139, 92, 246, 0.3)',   // violet dim
  'rgba(6, 182, 212, 0.3)',    // cyan dim
];

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  className = '',
  count = 20,
}) => {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: seededRandom(i * 3 + 1) * 100,
      y: seededRandom(i * 3 + 2) * 100,
      size: 2 + seededRandom(i * 3 + 3) * 4,
      duration: 15 + seededRandom(i * 7 + 5) * 25,
      delay: seededRandom(i * 11 + 7) * 10,
      color: COLORS[i % COLORS.length],
    }));
  }, [count]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
          }}
          animate={{
            y: [0, -30, 10, -20, 0],
            x: [0, 15, -10, 20, 0],
            opacity: [0.2, 0.8, 0.4, 0.7, 0.2],
            scale: [1, 1.3, 0.9, 1.15, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default React.memo(FloatingParticles);
