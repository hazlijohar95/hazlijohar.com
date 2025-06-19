
import { useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

export const useMobileOptimizations = () => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (isMobile) {
      // Prevent zoom on inputs
      const viewport = document.querySelector('meta[name=viewport]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
      }
      
      // Optimize touch interactions with proper typing
      document.body.style.touchAction = 'manipulation';
      (document.body.style as any).webkitTouchCallout = 'none';
      (document.body.style as any).webkitUserSelect = 'none';
      
      // iOS specific optimizations
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        (document.body.style as any).webkitOverflowScrolling = 'touch';
        (document.documentElement.style as any).webkitTextSizeAdjust = '100%';
      }
    }
    
    return () => {
      if (isMobile) {
        const viewport = document.querySelector('meta[name=viewport]');
        if (viewport) {
          viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
        }
      }
    };
  }, [isMobile]);
  
  return isMobile;
};
