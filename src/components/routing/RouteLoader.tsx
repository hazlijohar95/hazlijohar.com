
import React from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface RouteLoaderProps {
  text?: string;
  variant?: "default" | "dots" | "pulse";
}

export const RouteLoader = ({ text = "Loading...", variant = "default" }: RouteLoaderProps) => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <LoadingSpinner size="lg" text={text} variant={variant} />
  </div>
);
