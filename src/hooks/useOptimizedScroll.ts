
import { useEffect, useCallback, useRef } from 'react';

interface UseOptimizedScrollOptions {
  throttleMs?: number;
  rootMargin?: string;
}

export const useOptimizedScroll = ({ 
  throttleMs = 16, 
  rootMargin = '0px' 
}: UseOptimizedScrollOptions = {}) => {
  const scrollRef = useRef<number>(0);
  const ticking = useRef<boolean>(false);

  const updateScrollPosition = useCallback(() => {
    scrollRef.current = window.scrollY;
    ticking.current = false;
  }, []);

  const requestTick = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(updateScrollPosition);
      ticking.current = true;
    }
  }, [updateScrollPosition]);

  useEffect(() => {
    const handleScroll = () => requestTick();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [requestTick]);

  // Intersection Observer for better performance
  const createObserver = useCallback((callback: IntersectionObserverCallback) => new IntersectionObserver(callback, {
      root: null,
      rootMargin,
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
    }), [rootMargin]);

  return {
    scrollY: scrollRef.current,
    createObserver
  };
};
