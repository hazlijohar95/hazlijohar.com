import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
  variant?: 'fade' | 'slide' | 'scale';
}

const pageVariants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  slide: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 }
  }
};

const transitionConfig = {
  duration: 0.4
};

export const PageTransition = ({ children, variant = 'fade' }: PageTransitionProps) => {
  const location = useLocation();
  const variants = pageVariants[variant];

  return (
    <motion.div
      key={location.pathname}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transitionConfig}
      className="w-full min-h-screen"
      style={{
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)'
      }}
    >
      {children}
    </motion.div>
  );
};