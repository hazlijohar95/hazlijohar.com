
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { SmoothScroll } from '@/components/ui/SmoothScroll';
import { RouteLoader } from '@/components/routing/RouteLoader';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';
import Footer from '@/components/Footer';

interface StandardLayoutProps {
  children?: React.ReactNode;
}

export const StandardLayout = ({ children }: StandardLayoutProps) => {
  useMobileOptimizations();

  return (
    <SmoothScroll>
      <Suspense fallback={<RouteLoader variant="dots" />}>
        {children || <Outlet />}
      </Suspense>
      <Footer />
    </SmoothScroll>
  );
};
