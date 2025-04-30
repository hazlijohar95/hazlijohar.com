"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
function FloatingPaths({
  position
}: {
  position: number;
}) {
  const paths = Array.from({
    length: 36
  }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(15,23,42,${0.1 + i * 0.03})`,
    width: 0.5 + i * 0.03
  }));
  return <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full text-slate-950 dark:text-white" viewBox="0 0 696 316" fill="none">
                <title>Background Paths</title>
                {paths.map(path => <motion.path key={path.id} d={path.d} stroke="currentColor" strokeWidth={path.width} strokeOpacity={0.1 + path.id * 0.03} initial={{
        pathLength: 0.3,
        opacity: 0.6
      }} animate={{
        pathLength: 1,
        opacity: [0.3, 0.6, 0.3],
        pathOffset: [0, 1, 0]
      }} transition={{
        duration: 20 + Math.random() * 10,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear"
      }} />)}
            </svg>
        </div>;
}
export function BackgroundPaths({
  title = "Hazli Johar & Co.",
  subtitle = "Helping modern businesses in Malaysia grow with clarity and confidence.",
  ctaText = "BOOK A CALL",
  ctaLink = "/contact"
}: {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}) {
  const words = title.split(" ");
  return <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white">
            <div className="absolute inset-0">
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 2
      }} className="max-w-4xl mx-auto">
                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter">
                        {words.map((word, wordIndex) => <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                                {word.split("").map((letter, letterIndex) => <motion.span key={`${wordIndex}-${letterIndex}`} initial={{
              y: 100,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: wordIndex * 0.1 + letterIndex * 0.03,
              type: "spring",
              stiffness: 150,
              damping: 25
            }} className="inline-block text-transparent bg-clip-text 
                                        bg-gradient-to-r from-white to-white/80">
                                        {letter}
                                    </motion.span>)}
                            </span>)}
                    </h1>
                    
                    {subtitle && <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 1,
          duration: 1
        }} className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
                        {subtitle}
                      </motion.p>}

                    <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 1.5,
          duration: 1
        }} className="mt-8">
                      <div className="inline-block group relative bg-gradient-to-b from-white/10 to-white/5
                          p-px rounded-2xl backdrop-blur-lg 
                          overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                          
                      </div>
                    </motion.div>
                </motion.div>
            </div>
            
            {/* Bottom left metadata */}
            <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      delay: 2,
      duration: 1
    }} className="absolute bottom-8 left-8 text-left font-mono text-xs tracking-wide text-[#CCCCCC]">
              <p className="mb-1">KUALA LUMPUR, MALAYSIA</p>
              <div className="flex space-x-4">
                <span>REGISTERED CHARTERED ACCOUNTANTS FIRM</span>
                <span>SINCE 2019</span>
              </div>
            </motion.div>
            
            {/* Bottom right CTA - using existing style but with animation */}
            <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      delay: 2,
      duration: 1
    }} className="absolute bottom-8 right-8 text-right font-mono">
              <p className="text-xs tracking-wide text-[#CCCCCC] mb-1">START WITH A FREE CONSULTATION</p>
              <Link to="/contact" className="bg-white text-black px-5 py-2 font-semibold text-sm hover:bg-[#E5E5E5] rounded-none inline-block" aria-label="Start with a free consultation">
                BOOK A CALL →
              </Link>
            </motion.div>
        </div>;
}