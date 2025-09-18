
import React, { useEffect, useRef } from 'react';
import { SEOHead } from '../components/SEOHead';
import { seoConfig } from '../data/seo-config';
import HeroSection from '../components/HeroSection';
import OptimizedExpectSection from '../components/performance/OptimizedExpectSection';
import FeaturedSpeakers from '../components/FeaturedSpeakers';
import FeaturedSessions from '../components/FeaturedSessions';
import GetTicketsCTA from '../components/GetTicketsCTA';
import FAQSection from '../components/FAQSection';
import LastYearSection from '../components/LastYearSection';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ui/ScrollToTop';
import { useIsMobile } from '@/hooks/use-mobile';
import { LazySection } from '../components/performance/LazySection';

const Index = () => {
  const isMobile = useIsMobile();
  const pageRef = useRef<HTMLDivElement>(null);

  // Enhanced performance monitoring and smooth scrolling
  useEffect(() => {
    // Performance observer for Core Web Vitals
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          }
        }
      });
      
      try {
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // Observer not supported for this entry type
      }
    }

    // Enhanced smooth scroll handler with performance optimization
    const handleHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor?.hash?.startsWith('#')) {
        e.preventDefault();
        const targetId = anchor.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const navbarHeight = 70;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
          
          // Use requestAnimationFrame for smoother scrolling
          window.requestAnimationFrame(() => {
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          });
          
          // Update URL without triggering navigation
          history.replaceState(null, '', anchor.hash);
        }
      }
    };

    document.addEventListener('click', handleHashClick, { passive: false });
    
    return () => {
      document.removeEventListener('click', handleHashClick);
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
        canonical="https://hazijohar.com/"
      />
      <Navbar />
      
      {/* Hero section - immediately visible */}
      <div id="hero" className="mobile-touch-scroll">
        <HeroSection />
      </div>
      
      {/* Lazy-loaded sections for better performance */}
      <div className="mobile-sections-container">
        <OptimizedExpectSection />
        
        <LazySection 
          id="leadership" 
          className="mobile-touch-scroll"
          threshold={0.2}
          animationDelay={100}
        >
          <FeaturedSpeakers />
        </LazySection>
        
        <LazySection 
          id="services" 
          className="mobile-touch-scroll"
          threshold={0.2}
          animationDelay={200}
        >
          <FeaturedSessions />
        </LazySection>
        
        <LazySection 
          id="contact"
          threshold={0.2}
          animationDelay={100}
        >
          <GetTicketsCTA />
        </LazySection>
        
        <LazySection 
          id="faq"
          threshold={0.2}
          animationDelay={150}
        >
          <FAQSection />
        </LazySection>
        
        <LazySection 
          id="culture"
          threshold={0.2}
          animationDelay={100}
        >
          <LastYearSection />
        </LazySection>
      </div>
      
      <ScrollToTop />
      
      {/* Preload critical resources */}
      {!isMobile && (
        <>
          <link rel="preload" as="image" href="/og-image-home.jpg" />
          <link rel="prefetch" as="document" href="/contact" />
        </>
      )}
    </div>
  );
};

export default Index;
