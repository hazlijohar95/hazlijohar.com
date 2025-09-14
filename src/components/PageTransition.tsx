
import React from 'react';
import * as FramerMotion from 'framer-motion';
const { motion, AnimatePresence } = FramerMotion;
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
  variant?: 'fade' | 'slide' | 'scale';
}

const pageVariants = {
  fade: {
    initial: { opacity: 0 },
    enter: { 
      opacity: 1,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  },
  slide: {
    initial: { opacity: 0, x: 20 },
    enter: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    enter: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    exit: { 
      opacity: 0, 
      scale: 1.05,
      transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  }
};

export const PageTransition = ({ children, variant = 'fade' }: PageTransitionProps) => {
  const location = useLocation();
  const variants = pageVariants[variant];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
        className="w-full min-h-screen"
        style={{ 
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)'
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
