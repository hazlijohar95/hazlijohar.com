
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useRouteLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate route loading with realistic timing
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300); // Slightly longer for smoother feel

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return { isLoading };
};
