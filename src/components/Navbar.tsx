
import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isInverted, setIsInverted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Get the height of the hero section to determine when to invert
      const heroHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      
      // Invert when scrolling past hero section
      setIsInverted(scrollPosition > heroHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 z-50 flex justify-between items-center py-5 px-8 border-b transition-colors duration-300 ease-in-out w-full ${
      isInverted ? 'bg-white text-black border-[#E5E5E5]' : 'bg-black text-white border-[#1A1A1A]'
    }`}>
      {/* Left menu items */}
      <div className="hidden md:flex space-x-6 font-mono uppercase tracking-wide text-sm">
        <a href="#schedule" className="hover:opacity-80">Schedule</a>
        <a href="#speakers" className="hover:opacity-80">Speakers</a>
        <a href="#faq" className="hover:opacity-80">FAQ</a>
      </div>
      
      {/* Mobile menu button */}
      <div className="md:hidden">
        <button className="font-mono uppercase tracking-wide text-sm">Menu</button>
      </div>
      
      {/* Center logo */}
      <div className="flex items-center font-mono">
        <span className="font-bold">Vercel Ship</span>
        <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-mono ${
          isInverted ? 'bg-[#F5F5F5] text-[#555555]' : 'bg-[#0F0F0F] text-[#AAAAAA]'
        }`}>25</span>
      </div>
      
      {/* Right menu items */}
      <div className="hidden md:flex space-x-6 font-mono uppercase tracking-wide text-sm">
        <a href="#signup" className="hover:opacity-80">Sign Up</a>
        <a href="#login" className="hover:opacity-80">Login</a>
      </div>
      
      {/* Mobile empty div for flex spacing */}
      <div className="md:hidden"></div>
    </nav>
  );
};

export default Navbar;
