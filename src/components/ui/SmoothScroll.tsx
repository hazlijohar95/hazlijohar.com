
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SmoothScrollProps {
  children: React.ReactNode;
  behavior?: 'smooth' | 'instant';
  offset?: number;
}

export const SmoothScroll = ({ 
  children, 
  behavior = 'smooth',
  offset = 70 
}: SmoothScrollProps) => {
  const location = useLocation();

  useEffect(() => {
    // Handle hash navigation (for anchor links)
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        const yPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({
          top: yPosition,
          behavior: behavior
        });
        return;
      }
    }

    // Scroll to top on route change with smooth behavior
    window.scrollTo({
      top: 0,
      behavior: behavior
    });
  }, [location.pathname, location.hash, behavior, offset]);

  // Add smooth scrolling CSS for better browser support
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return <>{children}</>;
};
