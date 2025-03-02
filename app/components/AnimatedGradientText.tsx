import { motion } from "framer-motion";
import { cn } from "~/lib/utils";

export function AnimatedGradientText({ 
  children, 
  className 
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={cn(
        "inline-block bg-gradient-to-r from-purple-600 via-black to-purple-600 bg-[200%_auto] animate-gradient bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </motion.span>
  );
}
