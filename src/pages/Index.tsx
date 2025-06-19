
import React, { useEffect, useRef } from 'react';
import { SEOHead } from '../components/SEOHead';
import { seoConfig } from '../data/seo-config';
import HeroSection from '../components/HeroSection';
import ExpectSection from '../components/ExpectSection';
import FeaturedSpeakers from '../components/FeaturedSpeakers';
import FeaturedSessions from '../components/FeaturedSessions';
import GetTicketsCTA from '../components/GetTicketsCTA';
import FAQSection from '../components/FAQSection';
import LastYearSection from '../components/LastYearSection';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ui/ScrollToTop';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  const pageRef = useRef<HTMLDivElement>(null);

  // Add smooth scrolling behavior with optimized performance
  useEffect(() => {
    // Track sections for animation triggers
    const observedSections = document.querySelectorAll('section');
    
    // Create intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Add animation classes when section comes into view
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            // Stop observing after animation is triggered
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );
    
    // Observe all sections except hero (which is already visible)
    observedSections.forEach((section) => {
      if (section.id !== 'hero') {
        observer.observe(section);
      }
    });
    
    // Handle smooth scroll for anchor links
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
      observer.disconnect();
    };
  }, []);
  
  return (
    <div className="relative" ref={pageRef}>
      <SEOHead 
        title={seoConfig.home.title}
        description={seoConfig.home.description}
        keywords={seoConfig.home.keywords}
        image={seoConfig.home.image}
        url={seoConfig.home.url}
        canonical="https://hjc-malaysia.com/"
      />
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
      
      {/* Scroll to top button */}
      <ScrollToTop />
      
      {/* Preload critical assets for better performance */}
      {!isMobile && (
        <div className="hidden">
          <link rel="preload" as="image" href="/placeholder.svg" />
        </div>
      )}
    </div>
  );
};

export default Index;
