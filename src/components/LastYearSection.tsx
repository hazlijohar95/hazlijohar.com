
import React from 'react';
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

  return (
    <section id="culture" className={`bg-black text-white ${styles.sectionPadding} overflow-hidden`}>
      <div className="max-w-6xl mx-auto">
        {/* Heading Block */}
        <h2 className={`text-[40px] md:text-[64px] ${styles.heading} mb-8 max-w-4xl`}>
          Inside ACME
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

        {/* Scroll Indicator for Mobile */}
        <div className="md:hidden mb-4 flex items-center justify-start">
          <div className="w-10 h-[2px] bg-white/50"></div>
          <p className="text-xs text-white/70 ml-2">SCROLL →</p>
        </div>

        {/* Auto Scrolling Image Strip - Optimized with will-change and translateZ */}
        <div className="overflow-x-auto scrollbar-hide">
          <div 
            className="flex gap-4 pb-4"
            style={{
              width: 'max-content'
            }}
          >
            {images.map((image, index) => (
              <div 
                key={index} 
                className="relative min-w-[280px] w-[280px] sm:min-w-[320px] sm:w-[320px] md:min-w-[360px] md:w-[360px] h-[400px] will-change-transform"
                style={{ transform: 'translateZ(0)' }}
              >
                <OptimizedImage 
                  src={image}
                  alt={`ACME team and culture image ${index + 1}`}
                  className="rounded-lg w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  width={360}
                  height={400}
                  loading={index < 3 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LastYearSection;
