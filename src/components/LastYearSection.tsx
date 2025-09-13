
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { OptimizedImage } from './ui/optimized-image';
import { styles } from '@/styles/common-styles';
import { Link } from 'react-router-dom';

const LastYearSection = () => {
  // Use all the provided event images for the gallery
  const images = [
    "/lovable-uploads/5f5d890e-a100-4297-b370-816b451001f4.png",
    "/lovable-uploads/475501a4-73b7-45cd-bffb-1421996c89ee.png",
    "/lovable-uploads/b80fa1aa-36a2-41cf-a757-778a3fca6268.png",
    "/lovable-uploads/1000ff1f-cecb-42b1-bf73-c77fcac101e1.png",
    "/lovable-uploads/d6a39dce-eb67-429d-8a4d-8791de158f2e.png",
    "/lovable-uploads/54066d34-8e3e-40cf-b02e-54271ca7839a.png",
  ];

  // Double the images array for seamless infinite scroll
  const duplicatedImages = [...images, ...images];

  // State for controlling animation
  const [isHovered, setIsHovered] = useState(false);

  // Calculate the total width needed for one set of images
  const imageWidth = 360; // width per image including gap
  const gap = 16; // gap between images
  const totalWidth = images.length * (imageWidth + gap);

  return (
    <section id="culture" className={`bg-black text-white ${styles.sectionPadding} overflow-hidden`}>
      <div className="max-w-6xl mx-auto">
        {/* Heading Block */}
        <h2 className={`text-[40px] md:text-[64px] ${styles.heading1} mb-8 max-w-4xl`}>
          Inside HJC
          <span className="block mt-2 text-xl md:text-2xl font-normal">Go behind the scenes — meet the people, see the work, and hear what clients say.</span>
        </h2>

        {/* Button */}
        <Link 
          to="/culture" 
          className="inline-flex items-center gap-2 bg-white text-black font-mono text-sm tracking-wide uppercase px-4 py-2 hover:scale-105 transition-transform mb-16"
        >
          EXPLORE OUR CULTURE
          <span className="text-xs">↗</span>
        </Link>

        {/* Beautiful Auto-Sliding Gallery */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="flex gap-4 pb-4"
            animate={{
              x: isHovered ? 0 : -totalWidth
            }}
            transition={{
              duration: isHovered ? 0 : 60, // 60 seconds for one complete cycle
              ease: "linear",
              repeat: isHovered ? 0 : Infinity,
              repeatType: "loop"
            }}
            style={{
              width: 'max-content'
            }}
          >
            {duplicatedImages.map((image, index) => (
              <motion.div
                key={index}
                className="relative min-w-[280px] w-[280px] sm:min-w-[320px] sm:w-[320px] md:min-w-[360px] md:w-[360px] h-[400px]"
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <OptimizedImage
                  src={image}
                  alt={`HJC team and culture image ${(index % images.length) + 1}`}
                  className="rounded-lg w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer"
                  width={360}
                  height={400}
                  loading={index < 6 ? "eager" : "lazy"}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Subtle gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-black to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-black to-transparent pointer-events-none z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default LastYearSection;
