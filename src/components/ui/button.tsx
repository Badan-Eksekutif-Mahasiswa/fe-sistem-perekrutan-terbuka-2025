import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center text-m3 shadow-lg font-jakarta justify-center gap-2 whitespace-nowrap rounded-xl font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r hover:border-primary-400 hover:from-primary-300 from-primary-200 to-primary-400 active:to-primary-500 border-2 border-primary-300 text-primary-foreground",
        destructive:
          "bg-gradient-to-r from-red-200 to-red-400 hover:from-black/60 active:from-black/70 border-2 border-red-300 text-white",
        secondary:
          "bg-gradient-to-r from-secondary-200 hover:from-secondary-300 to-secondary-400 active:from-secondary-300 hover:border-secondary-400 active:to-secondary-500 border-2 border-secondary-300 text-primary-foreground",
        ghost:
          "hover:bg-accent/80 bg-accent border-2 border-primary-400 text-primary-400 hover:text-accent-foreground active:bg-accent/30 dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        stroke:
          "bg-none hover:border-white/70  border-2 border-white text-primary-foreground",
      },
      size: {
        default: "px-4 py-2 has-[>svg]:px-3",
        sm: "rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        md: "rounded-md gap-1.5 py-1 px-4 has-[>svg]:px-2.5",
        lg: "rounded-md px-8 has-[>svg]:px-4",
        xl: "rounded-md px-4 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
