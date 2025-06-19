
import React, { Suspense } from 'react';
import { ProtectedRoute } from '@/components/routing/ProtectedRoute';
import { RouteLoader } from '@/components/routing/RouteLoader';
import Dashboard from '@/pages/Dashboard';

export const DashboardLayout = () => (
  <ProtectedRoute>
    <Suspense fallback={<RouteLoader text="Loading dashboard..." variant="pulse" />}>
      <Dashboard />
    </Suspense>
  </ProtectedRoute>
);
