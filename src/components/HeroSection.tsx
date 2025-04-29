
import React from 'react';
import Navbar from './Navbar';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-black text-white flex flex-col">
      {/* Navbar is now fixed, so we add padding to prevent content from hiding underneath */}
      <div className="pt-20"></div>
      
      {/* Main headline */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-4">
        <h1 className="font-sans font-semibold text-[32px] md:text-[56px] leading-[1.1] tracking-[-0.02em] max-w-4xl">
          <span className="block">Vercel's one-day</span>
          <span className="block">event for developers</span>
          <span className="block">and business leaders</span>
        </h1>
      </div>
      
      {/* Bottom left metadata */}
      <div className="absolute bottom-8 left-8 text-left font-mono text-xs tracking-wide text-[#CCCCCC]">
        <p className="mb-1">NEW YORK CITY AND ONLINE</p>
        <div className="flex space-x-4">
          <span>JUNE 25, 2025</span>
          <span>THE GLASSHOUSE</span>
        </div>
      </div>
      
      {/* Bottom right CTA */}
      <div className="absolute bottom-8 right-8 text-right font-mono">
        <p className="text-xs tracking-wide text-[#CCCCCC] mb-1">EARLY BIRD TICKETS</p>
        <p className="mb-3">
          <span className="text-white font-semibold text-lg">$350</span>
          <span className="line-through text-[#555555] ml-2">$600</span>
        </p>
        <button className="bg-white text-black px-5 py-2 font-semibold text-sm hover:bg-[#E5E5E5] rounded-none">
          GET TICKETS →
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
