
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 touch-manipulation select-none active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 text-sm sm:text-base",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 text-sm sm:text-base",
        outline:
          "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground text-sm sm:text-base",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 text-sm sm:text-base",
        ghost: "hover:bg-accent hover:text-accent-foreground text-sm sm:text-base",
        link: "text-primary underline-offset-4 hover:underline text-sm sm:text-base",
        brand: "bg-white text-black hover:bg-gray-100 active:bg-gray-200 shadow-sm hover:shadow-md text-sm sm:text-base font-semibold",
        "outline-brand": "border-2 border-white text-white hover:bg-white/10 active:bg-white/20 text-sm sm:text-base font-medium",
        "ghost-brand": "text-white hover:bg-white/10 active:bg-white/20 text-sm sm:text-base font-medium",
      },
      size: {
        default: "min-h-[44px] px-4 sm:px-6 py-2 sm:py-3", // Mobile-first 44px touch target
        sm: "min-h-[36px] px-3 sm:px-4 py-1.5 sm:py-2", // Smaller but still accessible
        lg: "min-h-[48px] px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg", // Larger for primary actions
        icon: "min-h-[44px] min-w-[44px] p-0", // Perfect square touch target
        mobile: "min-h-[48px] px-6 py-3 text-base font-semibold w-full sm:w-auto", // Full-width mobile buttons
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
