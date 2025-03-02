import { motion } from 'framer-motion';

interface AnimatedGradientTextProps {
  text: string;
  className?: string;
}

export default function AnimatedGradientText({ text, className = '' }: AnimatedGradientTextProps) {
  return (
    <motion.h1
      className={`text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {text}
    </motion.h1>
  );
}
