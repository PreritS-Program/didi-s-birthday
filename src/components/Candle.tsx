import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CandleProps {
  isLit: boolean;
  onBlowOut: () => void;
  index: number;
}

const Candle = ({ isLit, onBlowOut, index }: CandleProps) => {
  const [showSmoke, setShowSmoke] = useState(false);

  const handleBlowOut = () => {
    if (isLit) {
      setShowSmoke(true);
      onBlowOut();
      setTimeout(() => setShowSmoke(false), 1200);
    }
  };

  return (
    <div 
      className="relative flex flex-col items-center cursor-pointer group"
      onMouseEnter={handleBlowOut}
      onClick={handleBlowOut}
    >
      {/* Candle stick */}
      <motion.div 
        className="relative"
        initial={{ scale: 0, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: index * 0.1 + 0.5, type: "spring", stiffness: 300 }}
      >
        {/* Smoke particles */}
        <AnimatePresence>
          {showSmoke && (
            <>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 -translate-x-1/2 rounded-full bg-muted-foreground/30"
                  style={{
                    width: 6 + i * 2,
                    height: 6 + i * 2,
                    top: -10,
                  }}
                  initial={{ y: 0, opacity: 0.8, scale: 1 }}
                  animate={{ 
                    y: -40 - i * 10, 
                    opacity: 0, 
                    scale: 2,
                    x: (i % 2 === 0 ? 1 : -1) * (10 + i * 5),
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: 0.8 + i * 0.2, 
                    delay: i * 0.1,
                    ease: "easeOut" 
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Flame */}
        <AnimatePresence>
          {isLit && (
            <motion.div
              className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ 
                scale: 0, 
                opacity: 0,
                transition: { duration: 0.3 }
              }}
            >
              {/* Outer flame glow */}
              <motion.div
                className="absolute w-6 h-8 rounded-full bg-gradient-to-t from-amber-400/40 to-transparent blur-sm"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0.8, 0.6],
                }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Main flame */}
              <motion.div
                className="relative w-3 h-5 bg-gradient-to-t from-amber-500 via-amber-400 to-yellow-200 rounded-full"
                style={{
                  borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                }}
                animate={{
                  scaleY: [1, 1.15, 0.95, 1.1, 1],
                  scaleX: [1, 0.95, 1.05, 0.98, 1],
                }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Inner flame core */}
                <motion.div
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-2.5 bg-gradient-to-t from-sky-100 to-yellow-100 rounded-full"
                  style={{
                    borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                  }}
                  animate={{
                    scaleY: [1, 0.9, 1.1, 1],
                    opacity: [0.9, 1, 0.8, 0.9],
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wick */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-foreground/70 rounded-full" />

        {/* Candle body */}
        <div className="w-4 h-12 bg-gradient-to-b from-sky-light via-primary/20 to-sky-soft rounded-sm shadow-sm">
          {/* Drip effect */}
          <div className="absolute top-0 left-0 w-1.5 h-3 bg-sky-light/80 rounded-b-full" />
          <div className="absolute top-0 right-0 w-1 h-2 bg-sky-soft/90 rounded-b-full" />
        </div>
      </motion.div>
    </div>
  );
};

export default Candle;
