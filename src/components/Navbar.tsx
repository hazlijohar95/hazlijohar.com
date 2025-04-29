
import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-5 px-8 border-b border-[#1A1A1A] w-full">
      {/* Left menu items */}
      <div className="hidden md:flex space-x-6 font-mono uppercase tracking-wide text-white text-sm">
        <a href="#schedule" className="hover:opacity-80">Schedule</a>
        <a href="#speakers" className="hover:opacity-80">Speakers</a>
        <a href="#faq" className="hover:opacity-80">FAQ</a>
      </div>
      
      {/* Mobile menu button */}
      <div className="md:hidden text-white">
        <button className="font-mono uppercase tracking-wide text-sm">Menu</button>
      </div>
      
      {/* Center logo */}
      <div className="flex items-center font-mono text-white">
        <span className="font-bold">Vercel Ship</span>
        <span className="ml-1 bg-[#0F0F0F] text-[#AAAAAA] px-2 py-0.5 rounded-full text-xs font-mono">25</span>
      </div>
      
      {/* Right menu items */}
      <div className="hidden md:flex space-x-6 font-mono uppercase tracking-wide text-white text-sm">
        <a href="#signup" className="hover:opacity-80">Sign Up</a>
        <a href="#login" className="hover:opacity-80">Login</a>
      </div>
      
      {/* Mobile empty div for flex spacing */}
      <div className="md:hidden"></div>
    </nav>
  );
};

export default Navbar;
