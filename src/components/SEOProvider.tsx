
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';

interface SEOProviderProps {
  children: React.ReactNode;
}

export const SEOProvider: React.FC<SEOProviderProps> = ({ children }) => {
  return <HelmetProvider>{children}</HelmetProvider>;
};
