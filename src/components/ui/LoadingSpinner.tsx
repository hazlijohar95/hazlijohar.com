
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
  variant?: 'default' | 'dots' | 'pulse';
}

export const LoadingSpinner = ({ 
  size = 'md', 
  className, 
  text,
  variant = 'default'
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  if (variant === 'dots') {
    return (
      <div className={cn(
        "flex flex-col items-center justify-center space-y-3",
        className
      )}>
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                "bg-white rounded-full animate-pulse",
                size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'
              )}
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1.4s'
              }}
            />
          ))}
        </div>
        {text && (
          <p className={cn(
            "text-white/70 animate-pulse font-mono",
            textSizeClasses[size]
          )}>
            {text}
          </p>
        )}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={cn(
        "flex flex-col items-center justify-center space-y-3",
        className
      )}>
        <div className={cn(
          "bg-white/20 rounded-full animate-pulse",
          sizeClasses[size]
        )} />
        {text && (
          <p className={cn(
            "text-white/70 animate-pulse font-mono",
            textSizeClasses[size]
          )}>
            {text}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={cn(
      "flex flex-col items-center justify-center space-y-3",
      className
    )}>
      <div className={cn(
        "border-4 border-t-white border-r-white/30 border-b-white/30 border-l-white/30 rounded-full animate-spin",
        sizeClasses[size]
      )} />
      {text && (
        <p className={cn(
          "text-white/70 animate-pulse font-mono",
          textSizeClasses[size]
        )}>
          {text}
        </p>
      )}
    </div>
  );
};
