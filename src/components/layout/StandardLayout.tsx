
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { SmoothScroll } from '@/components/ui/SmoothScroll';
import { RouteLoader } from '@/components/routing/RouteLoader';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';
import Footer from '@/components/Footer';

export const StandardLayout = () => {
  useMobileOptimizations();

  return (
    <SmoothScroll>
      <Suspense fallback={<RouteLoader variant="dots" />}>
        <Outlet />
      </Suspense>
      <Footer />
    </SmoothScroll>
  );
};
