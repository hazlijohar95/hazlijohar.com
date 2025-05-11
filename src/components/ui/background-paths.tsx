
"use client";

import React from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import FloatingPaths from "./FloatingPaths";
import HeroTypography from "./HeroTypography";
import { Link } from "react-router-dom";

export interface BackgroundPathsProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  onBookCall?: () => void;
  reducedAnimations?: boolean;
}

export function BackgroundPaths({
  title = "Hazli Johar & Co.",
  subtitle = "Helping modern businesses in Malaysia grow with clarity and confidence.",
  ctaText = "BOOK A CALL",
  ctaLink = "/contact",
  onBookCall,
  reducedAnimations = false
}: BackgroundPathsProps) {
  const isMobile = useIsMobile();
  
  // Use reduced animations flag or fallback to isMobile check
  const shouldReduceAnimations = reducedAnimations || isMobile;

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden z-10 bg-transparent text-white">
      <div className="absolute inset-0 z-10 pointer-events-none">
        <FloatingPaths position={1} reducedAnimations={shouldReduceAnimations} />
        <FloatingPaths position={-1} reducedAnimations={shouldReduceAnimations} />
      </div>

      <div className="relative z-20 container mx-auto px-4 md:px-6 text-center">
        <HeroTypography 
          title={title}
          subtitle={subtitle}
          reducedAnimations={shouldReduceAnimations}
          onBookCall={onBookCall}
          ctaText={ctaText}
        />
      </div>
      
      {/* Bottom left metadata */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: shouldReduceAnimations ? 1 : 2,
          duration: shouldReduceAnimations ? 0.5 : 1
        }} 
        className={`absolute ${isMobile ? 'bottom-20 left-4 text-xs' : 'bottom-8 left-8 text-sm'} text-left font-mono tracking-wide text-[#CCCCCC]`}
      >
        <p className="mb-1">KUALA LUMPUR, MALAYSIA</p>
        <div className={`flex ${isMobile ? 'flex-col space-y-1' : 'space-x-4'}`}>
          <span>REGISTERED CHARTERED ACCOUNTANTS FIRM</span>
          <span>SINCE 2019</span>
        </div>
      </motion.div>
      
      {/* Bottom right CTA - using existing style but with animation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: shouldReduceAnimations ? 1 : 2,
          duration: shouldReduceAnimations ? 0.5 : 1
        }} 
        className={`absolute ${isMobile ? 'bottom-4 right-4 text-xs' : 'bottom-8 right-8 text-sm'} text-right font-mono`}
      >
        <p className="text-xs tracking-wide text-[#CCCCCC] mb-1">START WITH A FREE CONSULTATION</p>
        <button 
          onClick={onBookCall}
          className="bg-white text-black px-5 py-2 font-semibold text-sm hover:bg-[#E5E5E5] rounded-none inline-block mobile-tap-target" 
          aria-label="Start with a free consultation"
        >
          {ctaText} →
        </button>
      </motion.div>
    </div>
  );
}

// Add the Cal.com type definition for TypeScript
declare global {
  interface Window {
    Cal?: any;
  }
}
