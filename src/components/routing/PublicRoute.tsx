
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { PageTransition } from '@/components/PageTransition';
import { RouteLoader } from './RouteLoader';

interface PublicRouteProps {
  children: JSX.Element;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <RouteLoader text="Loading..." variant="dots" />;
  }
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <PageTransition variant="slide">
      {children}
    </PageTransition>
  );
};
