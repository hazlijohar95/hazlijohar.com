
import React from 'react';
import { cn } from '@/lib/utils';
import { SectionTitleProps } from '@/types';

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
