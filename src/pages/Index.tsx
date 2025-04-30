
import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import ExpectSection from '../components/ExpectSection';
import FeaturedSpeakers from '../components/FeaturedSpeakers';
import FeaturedSessions from '../components/FeaturedSessions';
import GetTicketsCTA from '../components/GetTicketsCTA';
import FAQSection from '../components/FAQSection';
import LastYearSection from '../components/LastYearSection';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Index = () => {
  // Add smooth scrolling behavior
  useEffect(() => {
    const handleHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        e.preventDefault();
        const targetId = anchor.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
          });
          
          // Update URL without page jump
          history.pushState(null, '', anchor.hash);
        }
      }
    };
    
    document.addEventListener('click', handleHashClick);
    
    return () => {
      document.removeEventListener('click', handleHashClick);
    };
  }, []);
  
  return (
    <div className="relative">
      <Navbar />
      <div id="hero">
        <HeroSection />
      </div>
      <ExpectSection />
      <div id="leadership">
        <FeaturedSpeakers />
      </div>
      <div id="services">
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
      <Footer />
    </div>
  );
};

export default Index;
