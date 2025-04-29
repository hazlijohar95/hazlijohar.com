
import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isWhiteBackground, setIsWhiteBackground] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Get hero height minus some offset to trigger the transition earlier
      const heroHeight = window.innerHeight - 100;
      setIsWhiteBackground(window.scrollY > heroHeight);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-5 px-8 border-b transition-colors duration-300 ease-in-out ${
        isWhiteBackground 
          ? 'bg-white text-black border-[#EBEBEB]' 
          : 'bg-black text-white border-[#1A1A1A]'
      }`}
    >
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
          isWhiteBackground 
            ? 'bg-[#F5F5F5] text-[#666666]'
            : 'bg-[#0F0F0F] text-[#AAAAAA]'
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
