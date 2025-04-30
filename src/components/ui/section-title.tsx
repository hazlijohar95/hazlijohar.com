
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
      "text-7xl md:text-8xl font-medium leading-[0.95]",
      className
    )}>
      {children}
    </Component>
  );
}
