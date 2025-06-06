
"use client";

import React from "react";
import { motion } from "framer-motion";

interface FloatingPathsProps {
  position: number;
  reducedAnimations?: boolean;
}

/**
 * Animated SVG paths that create a flowing background effect
 */
const FloatingPaths: React.FC<FloatingPathsProps> = ({
  position,
  reducedAnimations = false
}) => {
  // Reduce path count on mobile for better performance
  const pathCount = reducedAnimations ? 18 : 36;
  
  const paths = Array.from({
    length: pathCount
  }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(15,23,42,${0.1 + i * 0.03})`,
    width: 0.5 + i * 0.03
  }));
  
  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full text-slate-950 dark:text-white" viewBox="0 0 696 316" fill="none">
        <title>Background Paths</title>
        {paths.map(path => (
          <motion.path 
            key={path.id} 
            d={path.d} 
            stroke="currentColor" 
            strokeWidth={path.width} 
            strokeOpacity={0.1 + path.id * 0.03} 
            initial={{
              pathLength: 0.3,
              opacity: 0.6
            }} 
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0]
            }} 
            transition={{
              duration: reducedAnimations ? 30 + Math.random() * 10 : 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear"
            }} 
          />
        ))}
      </svg>
    </div>
  );
};

export default FloatingPaths;
