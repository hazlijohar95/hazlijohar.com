
import React, { useState } from 'react';
import { BackgroundPaths } from './ui/background-paths';
import { BackgroundPathsProps } from '@/types';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import TurbulenceBackground from './ui/TurbulenceBackground';

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
    <div className="relative mobile-viewport">
      {/* Add the turbulence background */}
      <TurbulenceBackground />

      <BackgroundPaths
        {...heroProps}
        onBookCall={handleOpenCalendar}
      />

      {/* Cal.com Calendar Modal - Enhanced mobile optimization */}
      {showCalendar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div
            className={`bg-white rounded-xl shadow-2xl w-full flex flex-col ${
              isMobile
                ? 'mobile-modal-safe max-w-[95vw] max-h-[90vh] m-4'
                : 'max-w-4xl max-h-[85vh] mx-8'
            }`}
          >
            <div className="flex items-center justify-between border-b p-4 sm:p-6 min-h-[64px]">
              <h3 className="mobile-heading-md text-black font-semibold">Schedule a Call</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCloseCalendar}
                className="mobile-tap-target text-black hover:bg-gray-100 rounded-full"
                aria-label="Close calendar"
              >
                ✕
              </Button>
            </div>
            <div className="flex-1 p-4 sm:p-6 overflow-hidden">
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  overflow: "auto",
                  WebkitOverflowScrolling: "touch" // iOS smooth scrolling
                }}
                id="my-cal-inline"
                className="rounded-lg"
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Cal.com type definitions for TypeScript
interface CalConfig {
  layout?: string;
  origin?: string;
  hideEventTypeDetails?: boolean;
}

interface CalNamespace {
  (action: string, config?: CalConfig): void;
  (elementOrSelector: string, config: {
    elementOrSelector?: string;
    config?: CalConfig;
    calLink?: string;
  }): void;
}

interface CalInstance {
  (action: string, calLink?: string, options?: { origin?: string }): void;
  ns: {
    [key: string]: CalNamespace;
  };
}

declare global {
  interface Window {
    Cal?: CalInstance;
  }
}

export default HeroSection;
