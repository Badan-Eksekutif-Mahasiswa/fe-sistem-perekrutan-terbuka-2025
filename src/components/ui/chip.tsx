import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const chipVariants = cva(
  "font-nunito inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-3 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        light: "bg-neutral-100 text-primary-400",
        dark: "bg-primary-300 text-neutral-900",
      },
      border: {
        light: "border-2 border-primary-400",
        dark: "border-2 border-primary-500",
      },
      size: {
        sm: "px-3 py-1.5 text-xs",
        md: "px-2 py-1 text-sm",
        lg: "px-5 py-2.5 text-base",
      },
    },
    defaultVariants: {
      variant: "light",
      border: "light",
      size: "md",
    },
  }
);

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      className,
      variant,
      border,
      size,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(chipVariants({ variant, border, size, className }))}
        ref={ref}
        {...props}
      >
        {leftIcon && <span className="flex items-center">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="flex items-center">{rightIcon}</span>}
      </div>
    );
  }
);
Chip.displayName = "Chip";

export { Chip, chipVariants };
