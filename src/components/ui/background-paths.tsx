
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

function FloatingPaths({
  position,
  reducedAnimations = false
}: {
  position: number;
  reducedAnimations?: boolean;
}) {
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
  
  return <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full text-slate-950 dark:text-white" viewBox="0 0 696 316" fill="none">
                <title>Background Paths</title>
                {paths.map(path => <motion.path 
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
                    duration: reducedAnimations ? 30 + Math.random() * 10 : 20 + Math.random() * 10, // slower on mobile
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear"
                  }} 
                />)}
            </svg>
        </div>;
}

export function BackgroundPaths({
  title = "Hazli Johar & Co.",
  subtitle = "Helping modern businesses in Malaysia grow with clarity and confidence.",
  ctaText = "BOOK A CALL",
  ctaLink = "/contact",
  onBookCall,
  reducedAnimations = false
}: {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  onBookCall?: () => void;
  reducedAnimations?: boolean;
}) {
  const words = title.split(" ");
  const isMobile = useIsMobile();
  
  // Use reduced animations flag or fallback to isMobile check
  const shouldReduceAnimations = reducedAnimations || isMobile;

  return <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white">
            <div className="absolute inset-0">
                <FloatingPaths position={1} reducedAnimations={shouldReduceAnimations} />
                <FloatingPaths position={-1} reducedAnimations={shouldReduceAnimations} />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                <motion.div 
                  initial={{
                    opacity: 0
                  }} 
                  animate={{
                    opacity: 1
                  }} 
                  transition={{
                    duration: shouldReduceAnimations ? 1 : 2
                  }} 
                  className="max-w-4xl mx-auto"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tighter">
                        {words.map((word, wordIndex) => <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                                {word.split("").map((letter, letterIndex) => <motion.span 
                                    key={`${wordIndex}-${letterIndex}`} 
                                    initial={{
                                      y: 100,
                                      opacity: 0
                                    }} 
                                    animate={{
                                      y: 0,
                                      opacity: 1
                                    }} 
                                    transition={{
                                      delay: shouldReduceAnimations 
                                        ? wordIndex * 0.05 + letterIndex * 0.01 // faster on mobile
                                        : wordIndex * 0.1 + letterIndex * 0.03,
                                      type: "spring",
                                      stiffness: shouldReduceAnimations ? 200 : 150,
                                      damping: shouldReduceAnimations ? 20 : 25
                                    }} 
                                    className="inline-block text-transparent bg-clip-text 
                                        bg-gradient-to-r from-white to-white/80"
                                >
                                    {letter}
                                </motion.span>)}
                            </span>)}
                    </h1>
                    
                    {subtitle && <motion.p 
                      initial={{
                        opacity: 0,
                        y: 20
                      }} 
                      animate={{
                        opacity: 1,
                        y: 0
                      }} 
                      transition={{
                        delay: shouldReduceAnimations ? 0.5 : 1,
                        duration: shouldReduceAnimations ? 0.5 : 1
                      }} 
                      className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto"
                    >
                        {subtitle}
                    </motion.p>}
                      
                    {/* New "Tell us your problem" button */}
                    <motion.div 
                      initial={{
                        opacity: 0,
                        y: 20
                      }} 
                      animate={{
                        opacity: 1,
                        y: 0
                      }} 
                      transition={{
                        delay: shouldReduceAnimations ? 0.7 : 1.5,
                        duration: shouldReduceAnimations ? 0.5 : 1
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
            </div>
            
            {/* Bottom left metadata */}
            <motion.div 
              initial={{
                opacity: 0
              }} 
              animate={{
                opacity: 1
              }} 
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
              initial={{
                opacity: 0
              }} 
              animate={{
                opacity: 1
              }} 
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
        </div>;
}

export interface BackgroundPathsProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  onBookCall?: () => void;
  reducedAnimations?: boolean;
}

// Add the Cal.com type definition for TypeScript
declare global {
  interface Window {
    Cal?: any;
  }
}
