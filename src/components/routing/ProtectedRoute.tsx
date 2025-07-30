
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { PageTransition } from '@/components/PageTransition';
import { RouteLoader } from './RouteLoader';

interface ProtectedRouteProps {
  children: JSX.Element;
  requireAuth?: boolean;
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAuth = true,
  redirectTo = '/login'
}) => {
  const { user, isLoading, session } = useAuth();
  const location = useLocation();
  
  // Show loading state while checking authentication
  if (isLoading) {
    return <RouteLoader text="Authenticating..." variant="pulse" />;
  }
  
  // Check if user is authenticated
  const isAuthenticated = Boolean(user && session);
  
  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    // Save the attempted URL for redirect after login
    const searchParams = new URLSearchParams();
    searchParams.set('redirect', location.pathname + location.search);
    
    return (
      <Navigate 
        to={`${redirectTo}?${searchParams.toString()}`} 
        replace 
        state={{ from: location }}
      />
    );
  }
  
  // If authentication is not required but user is authenticated, redirect to dashboard
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // User is authenticated and can access the protected route
  return (
    <PageTransition variant="fade">
      {children}
    </PageTransition>
  );
};
