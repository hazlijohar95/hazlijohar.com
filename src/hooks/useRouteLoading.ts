
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useRouteLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate route loading time for smooth transitions
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return { isLoading };
};
