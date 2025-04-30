
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionContainerProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  bgColor?: 'black' | 'white';
}

export function SectionContainer({
  id,
  className,
  children,
  bgColor = 'white',
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-24 px-4 md:px-8 lg:px-12",
        bgColor === 'black' ? 'bg-black text-white' : 'bg-white text-black',
        className
      )}
    >
      {children}
    </section>
  );
}
