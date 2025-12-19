import { motion } from 'framer-motion';
import Candle from './Candle';

interface BirthdayCakeProps {
  candlesLit: boolean[];
  onBlowCandle: (index: number) => void;
}

const BirthdayCake = ({ candlesLit, onBlowCandle }: BirthdayCakeProps) => {
  const allBlownOut = candlesLit.every((lit) => !lit);

  return (
    <motion.div 
      className="relative flex flex-col items-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {/* Instruction text */}
      <motion.p
        className="text-lg md:text-xl font-body text-foreground/80 mb-16 md:mb-20 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: allBlownOut ? 0 : 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {allBlownOut ? "" : "Hover or tap to blow the candles 🎂"}
      </motion.p>

      {/* Cake container */}
      <div className="relative">
        {/* Candles row */}
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 flex gap-3 md:gap-4 z-10">
          {candlesLit.map((isLit, index) => (
            <Candle
              key={index}
              index={index}
              isLit={isLit}
              onBlowOut={() => onBlowCandle(index)}
            />
          ))}
        </div>

        {/* Cake layers */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Cake glow */}
          <div className="absolute inset-0 bg-sky-medium/20 blur-xl rounded-full scale-110" />
          
          {/* Top layer - cream */}
          <div className="relative w-48 md:w-64 h-8 bg-gradient-to-b from-sky-light to-sky-soft rounded-t-2xl border-b border-sky-medium/30 shadow-card">
            {/* Cream decorations */}
            <div className="absolute -top-2 left-4 w-4 h-4 bg-sky-light rounded-full shadow-sm" />
            <div className="absolute -top-1 left-10 w-3 h-3 bg-primary/30 rounded-full" />
            <div className="absolute -top-2 right-4 w-4 h-4 bg-sky-light rounded-full shadow-sm" />
            <div className="absolute -top-1 right-10 w-3 h-3 bg-primary/30 rounded-full" />
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-5 h-5 bg-sky-light rounded-full shadow-sm" />
          </div>

          {/* Middle layer */}
          <div className="relative w-56 md:w-72 h-10 -mt-1 mx-auto bg-gradient-to-b from-primary/40 to-primary/60 rounded-sm shadow-soft">
            {/* Frosting drips */}
            <div className="absolute -top-2 left-6 w-6 h-5 bg-sky-light rounded-b-full" />
            <div className="absolute -top-3 left-16 w-4 h-6 bg-sky-soft rounded-b-full" />
            <div className="absolute -top-2 right-6 w-5 h-4 bg-sky-light rounded-b-full" />
            <div className="absolute -top-3 right-16 w-4 h-5 bg-sky-soft rounded-b-full" />
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-sky-light rounded-b-full" />
            
            {/* Decorative dots */}
            <div className="absolute top-3 left-4 w-2 h-2 bg-sky-light/80 rounded-full" />
            <div className="absolute top-4 left-12 w-1.5 h-1.5 bg-sky-light/60 rounded-full" />
            <div className="absolute top-3 right-4 w-2 h-2 bg-sky-light/80 rounded-full" />
            <div className="absolute top-4 right-12 w-1.5 h-1.5 bg-sky-light/60 rounded-full" />
          </div>

          {/* Bottom layer */}
          <div className="relative w-64 md:w-80 h-12 -mt-1 mx-auto bg-gradient-to-b from-sky-soft to-sky-medium/70 rounded-b-xl shadow-card">
            {/* Frosting drips */}
            <div className="absolute -top-2 left-8 w-5 h-4 bg-primary/40 rounded-b-full" />
            <div className="absolute -top-3 left-20 w-6 h-6 bg-primary/30 rounded-b-full" />
            <div className="absolute -top-2 right-8 w-5 h-4 bg-primary/40 rounded-b-full" />
            <div className="absolute -top-3 right-20 w-6 h-5 bg-primary/30 rounded-b-full" />
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-6 bg-primary/35 rounded-b-full" />
            
            {/* Pattern on bottom layer */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-4">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="w-3 h-3 bg-sky-light/50 rounded-full" />
              ))}
            </div>
          </div>

          {/* Cake plate */}
          <div className="w-72 md:w-96 h-4 mx-auto bg-gradient-to-b from-muted to-secondary rounded-full shadow-lg mt-1" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BirthdayCake;
