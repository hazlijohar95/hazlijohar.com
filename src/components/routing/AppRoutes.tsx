
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import { PageTransition } from '@/components/PageTransition';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PublicRoute } from './PublicRoute';
import { RouteLoader } from './RouteLoader';

// Lazy load pages for better performance
const Index = lazy(() => import('@/pages/Index'));
const Contact = lazy(() => import('@/pages/Contact'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const ProfilePage = lazy(() => import('@/pages/dashboard/ProfilePage'));
const SettingsPage = lazy(() => import('@/pages/dashboard/SettingsPage'));
const NotificationsPage = lazy(() => import('@/pages/dashboard/NotificationsPage'));

export const AppRoutes = () => (
    <Routes>
      <Route path="/" element={<StandardLayout />} errorElement={<RouteErrorBoundary />}>
        <Route index element={
          <PageTransition variant="fade">
            <Index />
          </PageTransition>
        } />
        <Route path="contact" element={
          <PageTransition variant="slide">
            <Contact />
          </PageTransition>
        } />
        <Route path="culture" element={
          <PageTransition variant="fade">
            <Index />
          </PageTransition>
        } />
        <Route path="login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        <Route path="*" element={
          <PageTransition variant="scale">
            <NotFound />
          </PageTransition>
        } />
      </Route>
      
      <Route path="/dashboard" element={<DashboardLayout />} errorElement={<RouteErrorBoundary />}>
        <Route index element={<Outlet />} />
        <Route path="profile" element={
          <Suspense fallback={<RouteLoader text="Loading profile..." />}>
            <ProfilePage />
          </Suspense>
        } />
        <Route path="settings" element={
          <Suspense fallback={<RouteLoader text="Loading settings..." />}>
            <SettingsPage />
          </Suspense>
        } />
        <Route path="notifications" element={
          <Suspense fallback={<RouteLoader text="Loading notifications..." />}>
            <NotificationsPage />
          </Suspense>
        } />
      </Route>
    </Routes>
  );
