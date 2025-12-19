import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import FloatingParticles from '../components/FloatingParticles';
import HeroSection from '../components/HeroSection';
import BirthdayCake from '../components/BirthdayCake';
import CelebrationModal from '../components/CelebrationModal';

const NUM_CANDLES = 5;

const Index = () => {
  const [candlesLit, setCandlesLit] = useState<boolean[]>(Array(NUM_CANDLES).fill(true));
  const [showModal, setShowModal] = useState(false);
  const [hasTriggeredInitialConfetti, setHasTriggeredInitialConfetti] = useState(false);

  // Initial confetti on page load
  useEffect(() => {
    if (!hasTriggeredInitialConfetti) {
      const timer = setTimeout(() => {
        // Light initial confetti
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.3 },
          colors: ['#7dd3fc', '#38bdf8', '#0ea5e9', '#f0f9ff', '#e0f2fe'],
        });
        setHasTriggeredInitialConfetti(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredInitialConfetti]);

  const handleBlowCandle = useCallback((index: number) => {
    setCandlesLit((prev) => {
      const newState = [...prev];
      newState[index] = false;
      return newState;
    });
  }, []);

  // Check if all candles are blown
  useEffect(() => {
    const allBlown = candlesLit.every((lit) => !lit);
    if (allBlown && !candlesLit.every((lit) => lit)) {
      // Delay to let the last candle animation play
      const timer = setTimeout(() => {
        // Heavy celebration confetti
        const duration = 3000;
        const end = Date.now() + duration;

        const colors = ['#7dd3fc', '#38bdf8', '#0ea5e9', '#f0f9ff', '#e0f2fe', '#fbbf24', '#fcd34d'];

        (function frame() {
          confetti({
            particleCount: 7,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors,
          });
          confetti({
            particleCount: 7,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors,
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        })();

        // Big center burst
        setTimeout(() => {
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.5 },
            colors: colors,
          });
        }, 500);

        // Show modal after confetti starts
        setTimeout(() => {
          setShowModal(true);
        }, 1500);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [candlesLit]);

  const handleReset = useCallback(() => {
    setCandlesLit(Array(NUM_CANDLES).fill(true));
    setShowModal(false);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Floating particles background */}
      <FloatingParticles />

      {/* Main content */}
      <motion.main
        className="relative z-10 min-h-screen flex flex-col items-center justify-center py-8 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <HeroSection />
        
        <div className="mt-8 md:mt-12">
          <BirthdayCake candlesLit={candlesLit} onBlowCandle={handleBlowCandle} />
        </div>

        {/* Footer */}
        <motion.footer
          className="mt-auto pt-12 pb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <p className="text-muted-foreground text-sm font-body">
            Made with 💙 for your special day
          </p>
        </motion.footer>
      </motion.main>

      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onReset={handleReset}
      />
    </div>
  );
};

export default Index;
