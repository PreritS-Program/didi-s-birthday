import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './ui/button';

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
}

const CelebrationModal = ({ isOpen, onClose, onReset }: CelebrationModalProps) => {
  const handleGoBack = () => {
    onReset();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-gradient-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Sparkles background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary/60 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 3,
                }}
              />
            ))}
          </div>

          {/* Modal content */}
          <motion.div
            className="relative z-10 max-w-lg w-full text-center"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Close button */}
            <motion.button
              className="absolute -top-2 right-0 md:top-0 md:-right-12 p-2 rounded-full bg-secondary/80 hover:bg-secondary text-foreground/70 hover:text-foreground transition-colors"
              onClick={handleGoBack}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Main message */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.h2
                className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                A very Happy Birthday
                <br />
                <span className="text-gradient">Didi!!</span>{" "}
                <span className="inline-block">💙</span>
              </motion.h2>

              <motion.p
                className="font-body text-lg md:text-xl text-muted-foreground mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Wishing you all the joy and happiness today! 🎉
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Button
                  onClick={handleGoBack}
                  variant="celebration"
                  size="lg"
                  className="font-body text-lg px-8 py-6"
                >
                  Go Back
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CelebrationModal;
