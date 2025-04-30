
import React, { useEffect, useRef } from 'react';
import HeroSection from '../components/HeroSection';
import ExpectSection from '../components/ExpectSection';
import FeaturedSpeakers from '../components/FeaturedSpeakers';
import FeaturedSessions from '../components/FeaturedSessions';
import GetTicketsCTA from '../components/GetTicketsCTA';
import FAQSection from '../components/FAQSection';
import LastYearSection from '../components/LastYearSection';
import Navbar from '../components/Navbar';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  const pageRef = useRef<HTMLDivElement>(null);

  // Add smooth scrolling behavior with optimized performance
  useEffect(() => {
    let lastScrollPosition = 0;
    const handleHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        e.preventDefault();
        const targetId = anchor.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const navbarHeight = 70; // Approximate navbar height
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Update URL without page jump
          history.pushState(null, '', anchor.hash);
        }
      }
    };

    // Add passive event listener for better scroll performance
    document.addEventListener('click', handleHashClick, { passive: false });
    
    return () => {
      document.removeEventListener('click', handleHashClick);
    };
  }, []);
  
  return (
    <div className="relative" ref={pageRef}>
      <Navbar />
      <div id="hero" className="mobile-touch-scroll">
        <HeroSection />
      </div>
      <div className="mobile-sections-container">
        <ExpectSection />
        <div id="leadership" className="mobile-touch-scroll">
          <FeaturedSpeakers />
        </div>
        <div id="services" className="mobile-touch-scroll">
          <FeaturedSessions />
        </div>
        <div id="contact">
          <GetTicketsCTA />
        </div>
        <div id="faq">
          <FAQSection />
        </div>
        <div id="culture">
          <LastYearSection />
        </div>
      </div>
    </div>
  );
};

export default Index;
