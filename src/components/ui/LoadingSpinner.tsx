
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

export const LoadingSpinner = ({ 
  size = 'md', 
  className, 
  text = 'Loading...' 
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={cn(
      "flex flex-col items-center justify-center space-y-2",
      className
    )}>
      <div className={cn(
        "border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin",
        sizeClasses[size]
      )} />
      {text && (
        <p className="text-sm text-white/70 animate-pulse">{text}</p>
      )}
    </div>
  );
};
