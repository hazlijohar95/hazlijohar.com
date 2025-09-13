
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
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden z-10 bg-transparent text-white mobile-viewport">
      <div className="absolute inset-0 z-10 pointer-events-none">
        <FloatingPaths position={1} reducedAnimations={shouldReduceAnimations} />
        <FloatingPaths position={-1} reducedAnimations={shouldReduceAnimations} />
      </div>

      <div className="relative z-20 container mx-auto mobile-content-safe text-center">
        <HeroTypography
          title={title}
          subtitle={subtitle}
          reducedAnimations={shouldReduceAnimations}
          onBookCall={onBookCall}
          ctaText={ctaText}
        />
      </div>

      {/* Bottom left metadata - Enhanced mobile positioning */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: shouldReduceAnimations ? 1 : 2,
          duration: shouldReduceAnimations ? 0.5 : 1
        }}
        className={`absolute text-left font-mono tracking-wide text-[#CCCCCC] ${
          isMobile
            ? 'bottom-24 left-4 text-xs leading-relaxed safe-area-left'
            : 'bottom-8 left-8 text-sm safe-area-left'
        }`}
      >
        <p className="mb-2 font-medium">KUALA LUMPUR, MALAYSIA</p>
        <div className={`flex ${isMobile ? 'flex-col space-y-1 text-xs' : 'space-x-4'}`}>
          <span>REGISTERED CHARTERED ACCOUNTANTS FIRM</span>
          <span>SINCE 2019</span>
        </div>
      </motion.div>

      {/* Bottom right CTA - Enhanced mobile optimization */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: shouldReduceAnimations ? 1 : 2,
          duration: shouldReduceAnimations ? 0.5 : 1
        }}
        className={`absolute text-right font-mono ${
          isMobile
            ? 'bottom-4 right-4 text-xs safe-area-right safe-area-bottom'
            : 'bottom-8 right-8 text-sm safe-area-right safe-area-bottom'
        }`}
      >
        <p className="text-xs tracking-wide text-[#CCCCCC] mb-3">
          START WITH A FREE CONSULTATION
        </p>
        <button
          onClick={onBookCall}
          className={`bg-white text-black font-semibold hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 shadow-lg hover:shadow-xl touch-manipulation select-none ${
            isMobile
              ? 'px-6 py-3 text-sm min-h-[48px] rounded-lg mobile-tap-target'
              : 'px-5 py-2 text-sm min-h-[44px] rounded-none'
          }`}
          aria-label="Start with a free consultation - opens calendar booking"
        >
          {ctaText} →
        </button>
      </motion.div>
    </div>
  );
}

// Cal.com type definitions for TypeScript
interface CalConfig {
  layout?: string;
  origin?: string;
}

interface CalNamespace {
  (action: string, config?: CalConfig): void;
}

interface CalInstance {
  (elementOrSelector: string, config: {
    elementOrSelector?: string;
    config?: CalConfig;
    calLink?: string;
  }): void;
  ns: {
    [key: string]: CalNamespace;
  };
}

declare global {
  interface Window {
    Cal?: CalInstance;
  }
}
