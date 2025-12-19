import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <motion.div 
      className="text-center px-4 mb-8 md:mb-12"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h1
        className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-tight"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Happiest{" "}
        <span className="text-gradient">21st</span>
        {" "}Birthday
        <br />
        <motion.span
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <span className="text-gradient">Didi</span>!!
        </motion.span>
      </motion.h1>

      <motion.div
        className="mt-6 flex justify-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {["🎈", "🎁", "🎊", "✨", "🎂"].map((emoji, index) => (
          <motion.span
            key={index}
            className="text-2xl md:text-3xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 1 + index * 0.1,
              type: "spring",
              stiffness: 400,
            }}
            whileHover={{ scale: 1.3, rotate: 10 }}
          >
            {emoji}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
