import { useEffect, useCallback } from 'react';
import { useIsMobile, useIsIOS } from '@/hooks/use-mobile';

export const useMobileOptimizations = () => {
  const isMobile = useIsMobile();
  const isIOS = useIsIOS();

  // Enhanced haptic feedback for supported devices
  const triggerHaptic = useCallback((type: 'light' | 'medium' | 'heavy' = 'light') => {
    if (navigator.vibrate) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30]
      };
      navigator.vibrate(patterns[type]);
    }
  }, []);

  useEffect(() => {
    if (isMobile) {
      // Enhanced viewport configuration
      const viewport = document.querySelector('meta[name=viewport]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
      }

      // Optimize touch interactions
      document.body.style.touchAction = 'manipulation';
      (document.body.style as any).webkitTouchCallout = 'none';
      (document.body.style as any).webkitUserSelect = 'none';
      document.body.style.userSelect = 'none';

      // iOS specific optimizations
      if (isIOS) {
        (document.body.style as any).webkitOverflowScrolling = 'touch';
        (document.documentElement.style as any).webkitTextSizeAdjust = '100%';

        // Disable iOS double-tap zoom
        let lastTouchEnd = 0;
        const preventZoom = (e: TouchEvent) => {
          const now = new Date().getTime();
          if (now - lastTouchEnd <= 300) {
            e.preventDefault();
          }
          lastTouchEnd = now;
        };

        document.addEventListener('touchend', preventZoom, { passive: false });

        // iOS safe area support
        document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);

        // Update viewport height on orientation change
        const updateViewportHeight = () => {
          setTimeout(() => {
            document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);
          }, 100);
        };

        window.addEventListener('orientationchange', updateViewportHeight);
        window.addEventListener('resize', updateViewportHeight);
      }

      // Android specific optimizations
      if (/Android/.test(navigator.userAgent)) {
        // Prevent overscroll on Android
        document.body.style.overscrollBehavior = 'none';

        // Android keyboard handling
        const handleResize = () => {
          const vh = window.innerHeight * 0.01;
          document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        window.addEventListener('resize', handleResize);
        handleResize();
      }

      // General mobile optimizations
      // Prevent text selection on UI elements
      const style = document.createElement('style');
      style.textContent = `
        .mobile-tap-target {
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          user-select: none;
        }

        /* Enhanced mobile scrolling */
        .mobile-scroll {
          -webkit-overflow-scrolling: touch;
          overflow-scrolling: touch;
        }

        /* Prevent iOS bounce scrolling on fixed elements */
        .mobile-fixed {
          position: fixed;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
      `;
      document.head.appendChild(style);

      // Performance optimizations for mobile
      // Reduce motion preference handling
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        document.documentElement.style.setProperty('--animation-duration', '0s');
        document.documentElement.style.setProperty('--transition-duration', '0s');
      }
    }

    return () => {
      if (isMobile) {
        const viewport = document.querySelector('meta[name=viewport]');
        if (viewport) {
          viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, viewport-fit=cover');
        }
      }
    };
  }, [isMobile, isIOS]);

  return {
    isMobile,
    isIOS,
    triggerHaptic
  };
};