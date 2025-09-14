import * as React from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

export interface InputProps extends React.ComponentProps<"input"> {
  error?: boolean;
  mobileOptimized?: boolean;
}

const UIInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, mobileOptimized = true, ...props }, ref) => {
    const isMobile = useIsMobile();

    // Prevent zoom on focus for iOS devices
    const handleFocus = React.useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      if (isMobile && mobileOptimized) {
        // Ensure font-size is at least 16px to prevent zoom on iOS
        e.target.style.fontSize = '16px';
      }
      props.onFocus?.(e);
    }, [isMobile, mobileOptimized, props]);

    const handleBlur = React.useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      if (isMobile && mobileOptimized) {
        // Reset font-size after blur
        e.target.style.fontSize = '';
      }
      props.onBlur?.(e);
    }, [isMobile, mobileOptimized, props]);

    return (
      <input
        type={type}
        className={cn(
          // Base styles with mobile-first approach
          "flex w-full rounded-lg border-2 bg-background ring-offset-background transition-all duration-200 touch-manipulation",
          // Mobile-optimized sizing (minimum 44px height for touch targets)
          "min-h-[44px] px-4 py-3 text-base",
          // Desktop sizing
          "sm:min-h-[40px] sm:px-3 sm:py-2 sm:text-sm",
          // Border and focus states
          error
            ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20"
            : "border-input focus-visible:border-primary focus-visible:ring-primary/20",
          // Focus styles
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          // File input styles
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          // Placeholder styles
          "placeholder:text-muted-foreground",
          // Disabled styles
          "disabled:cursor-not-allowed disabled:opacity-50",
          // Enhanced mobile styles when optimized
          mobileOptimized && isMobile && "text-base leading-normal",
          className
        )}
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
        // Mobile keyboard optimizations
        inputMode={type === "email" ? "email" : type === "tel" ? "tel" : type === "number" ? "numeric" : undefined}
        autoComplete={
          type === "email" ? "email" :
          type === "password" ? "current-password" :
          type === "tel" ? "tel" :
          props.autoComplete
        }
        {...props}
      />
    )
  }
)
UIInput.displayName = "Input"

export { UIInput as Input }
