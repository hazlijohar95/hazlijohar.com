
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookText, BarChartBig, Wrench, Users } from 'lucide-react';
import { SectionContainer } from './ui/section-container';
import { SectionTitle } from './ui/section-title';
import { styles } from '@/styles/common-styles';
import { CardProps } from '@/types';
import '../App.css';

const Card = ({ icon, title, description }: CardProps) => (
  <motion.div
    className="w-full max-w-[460px] bg-black text-white p-12 flex flex-col justify-between h-[580px] group transition-all duration-500"
    whileHover={{
      backgroundColor: "#111",
      scale: 1.02,
      boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.05)"
    }}
    transition={{ duration: 0.3 }}
  >
    <div>
      <motion.div
        className="text-white mb-20"
        whileHover={{
          scale: 1.1,
          rotate: 3,
          transition: { duration: 0.3 }
        }}
      >
        {icon}
      </motion.div>
      <motion.h3
        className="font-semibold text-4xl leading-tight text-white mb-6"
        whileHover={{
          color: "rgba(255, 255, 255, 0.9)",
          transition: { duration: 0.3 }
        }}
      >
        {title}
      </motion.h3>
      <motion.p
        className="text-base font-mono opacity-70 leading-relaxed"
        whileHover={{
          opacity: 0.9,
          transition: { duration: 0.3 }
        }}
      >
        {description}
      </motion.p>
    </div>

    {/* Subtle accent line that appears on hover */}
    <motion.div
      className="w-12 h-px bg-white/20 mt-8"
      whileHover={{
        width: 80,
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        transition: { duration: 0.5 }
      }}
    />
  </motion.div>
);

const expectCards: CardProps[] = [
  {
    icon: <BookText className="stroke-[1.5]" size={40} />,
    title: "Expert-Led Advisory",
    description: "Work directly with licensed professionals who understand your industry's unique challenges and opportunities. Get strategic insights that drive real business growth."
  },
  {
    icon: <BarChartBig className="stroke-[1.5]" size={40} />,
    title: "Real-Time Financial Intelligence",
    description: "Access cloud-based reporting that provides actionable insights whenever you need them. Make informed decisions with accurate, up-to-date financial data."
  },
  {
    icon: <Wrench className="stroke-[1.5]" size={40} />,
    title: "Smart Process Automation",
    description: "Streamline your operations from bookkeeping to payroll with intelligent automation tools. Focus on growing your business while we handle the routine tasks."
  },
  {
    icon: <Users className="stroke-[1.5]" size={40} />,
    title: "Scalable Partnership",
    description: "Whether you're a startup or scaling enterprise, our services grow with your ambitions. Get the right level of support at every stage of your journey."
  }
];

const ExpectSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-advance to next card every 15 seconds (60 seconds total for 4 cards)
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % expectCards.length);
    }, 15000); // 15 seconds per card

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <SectionContainer id="expect" className="bg-[#fcfcfc] py-32 overflow-hidden">
      <div className="container mx-auto px-0">
        <div className="flex flex-col lg:flex-row">
          {/* Enhanced title section with proper spacing */}
          <div className="lg:w-1/3 pl-8 md:pl-24 lg:pl-36 mb-20 lg:mb-0 flex-shrink-0">
            <div className="animate-fade-in-up sticky top-32">
              <SectionTitle className="text-black mb-8 pr-8">
                What you<br />can expect
              </SectionTitle>
              <div className="max-w-sm">
                <p className="font-mono text-sm text-[#666] leading-relaxed mb-6">
                  Professional services designed to transform how you manage your business finances and operations.
                </p>
                <div className="w-16 h-px bg-black/20"></div>
              </div>
            </div>
          </div>

          {/* Auto-sliding cards section - one card at a time */}
          <div className="lg:w-2/3 flex justify-center items-center lg:ml-8">
            <div
              className="relative w-full max-w-[480px] h-[580px]"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut"
                }}
                className="absolute inset-0"
              >
                <Card
                  icon={expectCards[currentIndex].icon}
                  title={expectCards[currentIndex].title}
                  description={expectCards[currentIndex].description}
                />
              </motion.div>

              {/* Card indicators */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {expectCards.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'bg-black' : 'bg-black/30'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>

              {/* Progress bar */}
              <div className="absolute -bottom-16 left-0 right-0 h-px bg-black/20">
                <motion.div
                  className="h-full bg-black"
                  initial={{ width: "0%" }}
                  animate={{
                    width: isHovered ? "0%" : "100%"
                  }}
                  transition={{
                    duration: isHovered ? 0.3 : 15, // 15 seconds per card
                    ease: "linear",
                    repeat: isHovered ? 0 : Infinity,
                    repeatType: "restart"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced bottom section with stats */}
        <div className="mt-20 px-8 md:px-24 lg:px-36">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
              <div className="font-mono text-3xl font-bold text-black mb-2">98%</div>
              <div className="font-mono text-xs text-[#666] uppercase tracking-wide">Client Satisfaction</div>
            </div>
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
              <div className="font-mono text-3xl font-bold text-black mb-2">24/7</div>
              <div className="font-mono text-xs text-[#666] uppercase tracking-wide">Cloud Access</div>
            </div>
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.7s', animationFillMode: 'both' }}>
              <div className="font-mono text-3xl font-bold text-black mb-2">100+</div>
              <div className="font-mono text-xs text-[#666] uppercase tracking-wide">Businesses Served</div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default ExpectSection;
