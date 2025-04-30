
import React from 'react';
import { cn } from '@/lib/utils';
import { OptimizedImageProps } from '@/types';

export const OptimizedImage = ({
  src,
  alt,
  className,
  width,
  height,
  loading = "lazy"
}: OptimizedImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("object-cover", className)}
      width={width}
      height={height}
      loading={loading}
    />
  );
};
