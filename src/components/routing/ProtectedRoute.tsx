
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { PageTransition } from '@/components/PageTransition';
import { RouteLoader } from './RouteLoader';

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <RouteLoader text="Authenticating..." variant="pulse" />;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <PageTransition variant="fade">
      {children}
    </PageTransition>
  );
};
