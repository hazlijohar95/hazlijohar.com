
import React, { useState, useEffect } from 'react';
import { useScrollObserver } from '../hooks/useScrollObserver';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const [isWhiteBackground, setIsWhiteBackground] = useState(false);
  const { isIntersecting } = useScrollObserver(['hero', 'speakers', 'sessions', 'tickets']);
  
  useEffect(() => {
    // Use the intersection data to determine navbar background
    if ((isIntersecting['speakers'] && !isIntersecting['sessions']) || 
        (isIntersecting['tickets'])) {
      // We're in the speakers section or tickets section (black background)
      setIsWhiteBackground(false);
    } else if (isIntersecting['sessions']) {
      // We're in the sessions section (white background)
      setIsWhiteBackground(true);
    } else if (!isIntersecting['hero']) {
      // We're past the hero section but not yet at speakers section
      setIsWhiteBackground(true);
    } else {
      // We're in the hero section
      setIsWhiteBackground(false);
    }
  }, [isIntersecting]);
  
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
        <a href="#speakers" className="hover:opacity-80 transition-opacity">Speakers</a>
        <a href="#sessions" className="hover:opacity-80 transition-opacity">Sessions</a>
        <a href="#faq" className="hover:opacity-80 transition-opacity">FAQ</a>
      </div>
      
      {/* Mobile menu button */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger aria-label="Open menu">
            <button className="font-mono uppercase tracking-wide text-sm flex items-center">
              <Menu className="mr-2" size={18} /> Menu
            </button>
          </SheetTrigger>
          <SheetContent 
            side="left" 
            className={`${isWhiteBackground ? 'bg-white text-black' : 'bg-black text-white'} border-r-[1px] ${isWhiteBackground ? 'border-[#EBEBEB]' : 'border-[#1A1A1A]'}`}
          >
            <div className="flex flex-col mt-10 space-y-6 font-mono uppercase tracking-wide text-sm">
              <a href="#speakers" className="hover:opacity-80 transition-opacity">Speakers</a>
              <a href="#sessions" className="hover:opacity-80 transition-opacity">Sessions</a>
              <a href="#faq" className="hover:opacity-80 transition-opacity">FAQ</a>
              <div className="pt-6 border-t border-[#333333]">
                <a href="#signup" className="hover:opacity-80 transition-opacity">Sign Up</a>
              </div>
              <a href="#login" className="hover:opacity-80 transition-opacity">Login</a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      {/* Center logo */}
      <div className="flex items-center font-mono">
        <a href="#hero" className="font-bold">Vercel Ship</a>
        <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-mono ${
          isWhiteBackground 
            ? 'bg-[#F5F5F5] text-[#666666]'
            : 'bg-[#0F0F0F] text-[#AAAAAA]'
        }`}>25</span>
      </div>
      
      {/* Right menu items */}
      <div className="hidden md:flex space-x-6 font-mono uppercase tracking-wide text-sm">
        <a href="#signup" className="hover:opacity-80 transition-opacity">Sign Up</a>
        <a href="#login" className="hover:opacity-80 transition-opacity">Login</a>
      </div>
      
      {/* Mobile empty div for flex spacing */}
      <div className="md:hidden"></div>
    </nav>
  );
};

export default Navbar;
