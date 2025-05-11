
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface HeroTypographyProps {
  title: string;
  subtitle?: string;
  reducedAnimations?: boolean;
  onBookCall?: () => void;
  ctaText?: string;
}

/**
 * Animated hero section typography with title, subtitle and CTA
 */
const HeroTypography: React.FC<HeroTypographyProps> = ({
  title,
  subtitle,
  reducedAnimations = false,
  onBookCall,
  ctaText = "BOOK A CALL"
}) => {
  const words = title.split(" ");
  
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: reducedAnimations ? 1 : 2 }} 
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tighter">
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block mr-4 last:mr-0">
            {word.split("").map((letter, letterIndex) => (
              <motion.span 
                key={`${wordIndex}-${letterIndex}`} 
                initial={{ y: 100, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{
                  delay: reducedAnimations 
                    ? wordIndex * 0.05 + letterIndex * 0.01 
                    : wordIndex * 0.1 + letterIndex * 0.03,
                  type: "spring",
                  stiffness: reducedAnimations ? 200 : 150,
                  damping: reducedAnimations ? 20 : 25
                }} 
                className="inline-block text-transparent bg-clip-text 
                    bg-gradient-to-r from-white to-white/80"
              >
                {letter}
              </motion.span>
            ))}
          </span>
        ))}
      </h1>
      
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{
            delay: reducedAnimations ? 0.5 : 1,
            duration: reducedAnimations ? 0.5 : 1
          }} 
          className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
        
      {/* "Tell us your problem" button */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{
          delay: reducedAnimations ? 0.7 : 1.5,
          duration: reducedAnimations ? 0.5 : 1
        }} 
        className="mt-8"
      >
        <Link 
          to="/contact" 
          className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 font-semibold 
            text-lg rounded-sm hover:bg-gray-100 transition-colors mobile-tap-target"
        >
          Tell us your problem
          <span className="text-lg">→</span>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default HeroTypography;
