
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}

export function SectionTitle({ 
  children, 
  className,
  as: Component = 'h2' 
}: SectionTitleProps) {
  return (
    <Component className={cn(
      "text-6xl md:text-7xl font-medium leading-none",
      className
    )}>
      {children}
    </Component>
  );
}
