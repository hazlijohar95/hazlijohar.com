
import React, { useState, useEffect } from 'react';
import { BackgroundPaths } from './ui/background-paths';
import { BackgroundPathsProps } from '@/types';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroSection = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const isMobile = useIsMobile();
  
  const heroProps: BackgroundPathsProps = {
    title: "HAZLI JOHAR & CO.",
    subtitle: "Helping modern businesses in Malaysia grow with clarity and confidence.",
    ctaText: "BOOK A CALL",
    ctaLink: "/contact",
    reducedAnimations: isMobile // Pass flag to reduce animations on mobile
  };

  // Function to open the calendar modal
  const handleOpenCalendar = () => {
    setShowCalendar(true);
    
    // Load Cal.com script only when needed
    setTimeout(() => {
      if (window.Cal) {
        window.Cal("init", "30min", {origin:"https://cal.com"});
        window.Cal.ns["30min"]("inline", {
          elementOrSelector:"#my-cal-inline",
          config: {"layout": isMobile ? "mobile_view" : "month_view"},
          calLink: "hazli-johar-cynco/30min",
        });
        window.Cal.ns["30min"]("ui", {"hideEventTypeDetails":false,"layout": isMobile ? "mobile_view" : "month_view"});
      }
    }, 100);
  };

  // Function to close the calendar modal
  const handleCloseCalendar = () => {
    setShowCalendar(false);
  };

  return (
    <div className="relative">
      <BackgroundPaths 
        {...heroProps}
        onBookCall={handleOpenCalendar}
      />
      
      {/* Cal.com Calendar Modal - Optimized for mobile */}
      {showCalendar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`bg-white rounded-lg shadow-xl w-full ${isMobile ? 'h-[95vh] max-w-[95vw] m-2' : 'max-w-4xl h-[90vh]'} flex flex-col`}>
            <div className="flex items-center justify-between border-b p-4">
              <h3 className="text-xl font-bold">Schedule a Call</h3>
              <Button variant="ghost" onClick={handleCloseCalendar} className="mobile-tap-target">
                ✕
              </Button>
            </div>
            <div className="flex-1 p-4 overflow-hidden">
              <div style={{width:"100%", height:"100%", overflow:"scroll"}} id="my-cal-inline"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Add the Cal.com type definition for TypeScript
declare global {
  interface Window {
    Cal?: any;
  }
}

export default HeroSection;
