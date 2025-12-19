import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  size: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  opacity: number;
}

const FloatingParticles = () => {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      size: Math.random() * 12 + 4,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 8 + 6,
      opacity: Math.random() * 0.4 + 0.2,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-sky-medium"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, -30, -15, -45, 0],
            x: [0, 15, -10, 5, 0],
            scale: [1, 1.2, 0.9, 1.1, 1],
            opacity: [particle.opacity, particle.opacity + 0.2, particle.opacity - 0.1, particle.opacity + 0.1, particle.opacity],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Floating bubbles rising from bottom */}
      {Array.from({ length: 15 }, (_, i) => (
        <motion.div
          key={`bubble-${i}`}
          className="absolute rounded-full border border-sky-medium/30 bg-sky-light/20"
          style={{
            width: Math.random() * 20 + 10,
            height: Math.random() * 20 + 10,
            left: `${Math.random() * 100}%`,
            bottom: -50,
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, Math.sin(i) * 50, Math.cos(i) * 30, 0],
            opacity: [0, 0.6, 0.4, 0],
            scale: [0.5, 1, 1, 0.8],
          }}
          transition={{
            duration: Math.random() * 10 + 8,
            delay: i * 1.5,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
