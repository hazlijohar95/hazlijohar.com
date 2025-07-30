
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { PageTransition } from '@/components/PageTransition';
import { RouteLoader } from './RouteLoader';

interface PublicRouteProps {
  children: JSX.Element;
  redirectTo?: string;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ 
  children, 
  redirectTo = '/dashboard'
}) => {
  const { user, isLoading, session } = useAuth();
  const location = useLocation();
  
  // Show loading state while checking authentication
  if (isLoading) {
    return <RouteLoader text="Loading..." variant="pulse" />;
  }
  
  // Check if user is authenticated
  const isAuthenticated = Boolean(user && session);
  
  // If user is authenticated, redirect to dashboard (or specified route)
  if (isAuthenticated) {
    // Check if there's a redirect parameter in the URL
    const searchParams = new URLSearchParams(location.search);
    const redirectParam = searchParams.get('redirect');
    
    if (redirectParam && redirectParam.startsWith('/')) {
      return <Navigate to={redirectParam} replace />;
    }
    
    return <Navigate to={redirectTo} replace />;
  }
  
  // User is not authenticated, show the public page
  return (
    <PageTransition variant="fade">
      {children}
    </PageTransition>
  );
};
