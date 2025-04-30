
// Component Props Types

export interface NavbarProps {
  transparent?: boolean;
}

export interface SectionContainerProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  bgColor?: 'black' | 'white';
}

export interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}

export interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface BackgroundPathsProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface FormProps {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

// Image optimization types
export interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
}
