import React from 'react';
import { Link } from 'react-router-dom';
const HeroSection = () => {
  return <section className="relative min-h-screen bg-black text-white flex flex-col">
      {/* Main headline - adjusted for fixed navbar */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-4 pt-16">
        <h1 className="font-sans font-semibold text-[32px] md:text-[56px] leading-[1.1] tracking-[-0.02em] max-w-4xl">
          
          <span className="block">Helping modern businesses in Malaysia</span>
          <span className="block">Grow with clarity and confidence.

Work with experience accountants.</span>
        </h1>
      </div>
      
      {/* Bottom left metadata */}
      <div className="absolute bottom-8 left-8 text-left font-mono text-xs tracking-wide text-[#CCCCCC]">
        <p className="mb-1">KUALA LUMPUR, MALAYSIA</p>
        <div className="flex space-x-4">
          <span>REGISTERED CHARTERED ACCOUNTANTS FIRM</span>
          <span>SINCE 2019</span>
        </div>
      </div>
      
      {/* Bottom right CTA */}
      <div className="absolute bottom-8 right-8 text-right font-mono">
        <p className="text-xs tracking-wide text-[#CCCCCC] mb-1">START WITH A FREE CONSULTATION</p>
        <Link to="/contact" className="bg-white text-black px-5 py-2 font-semibold text-sm hover:bg-[#E5E5E5] rounded-none inline-block" aria-label="Start with a free consultation">
          BOOK A CALL →
        </Link>
      </div>
    </section>;
};
export default HeroSection;