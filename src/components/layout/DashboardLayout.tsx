
import React, { Suspense } from 'react';
import { ProtectedRoute } from '@/components/routing/ProtectedRoute';
import { RouteLoader } from '@/components/routing/RouteLoader';
import Dashboard from '@/pages/Dashboard';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => (
  <ProtectedRoute>
    <Suspense fallback={<RouteLoader text="Loading dashboard..." variant="pulse" />}>
      {children || <Dashboard />}
    </Suspense>
  </ProtectedRoute>
);
