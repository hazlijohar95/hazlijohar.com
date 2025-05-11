
import React from 'react';
import { cn } from '@/lib/utils';
import { SectionContainerProps } from '@/types';

export function SectionContainer({
  id,
  className,
  children,
  bgColor = 'white',
  maxWidth = '7xl',
  paddingY = 'py-16 md:py-24',
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={cn(
        paddingY,
        "w-full relative overflow-hidden",
        bgColor === 'black' ? 'bg-black text-white' : 'bg-white text-black',
        className
      )}
    >
      <div className={cn(
        "container mx-auto px-4 sm:px-6 relative z-10",
        maxWidth && `max-w-${maxWidth}`
      )}>
        {children}
      </div>
    </section>
  );
}
