import React, { useState, useEffect, useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface LazySectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  threshold?: number;
  rootMargin?: string;
  fallback?: React.ReactNode;
  animationDelay?: number;
}

export const LazySection: React.FC<LazySectionProps> = ({
  children,
  className = '',
  id,
  threshold = 0.1,
  rootMargin = '50px',
  fallback = <div className="animate-pulse bg-muted/20 h-64 rounded-lg" />,
  animationDelay = 0
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const entry = useIntersectionObserver(ref, {
    threshold,
    rootMargin,
    freezeOnceVisible: true
  });

  useEffect(() => {
    if (entry?.isIntersecting && !isVisible) {
      setIsVisible(true);
      
      // Add animation delay if specified
      if (animationDelay > 0) {
        setTimeout(() => {
          setShouldAnimate(true);
        }, animationDelay);
      } else {
        setShouldAnimate(true);
      }
    }
  }, [entry?.isIntersecting, isVisible, animationDelay]);

  return (
    <section
      ref={ref}
      id={id}
      className={`transition-all duration-700 ${
        shouldAnimate 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {isVisible ? children : fallback}
    </section>
  );
};