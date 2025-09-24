import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center text-white hover:cursor-pointer font-jakarta font-bold text-lg justify-center gap-2 whitespace-nowrap rounded-md transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary:
          "bg-secondary-400 hover:bg-secondary-300 active:bg-primary-100 disabled:bg-secondary-400",
        secondary:
          "bg-primary-400 hover:bg-primary-300 active:bg-primary-500 disabled:bg-primary-400 disabled:opacity-50",
        tertiary:
          "border-2 text-primary-300 border-primary-300 bg-neutral-100  hover:bg-secondary-100/40 active:bg-secondary-100/80 disabled:border-neutral-600 disabled:text-neutral-600",
      },
      size: {
        primary: "gap-3 px-5 py-2.5 rounded-sm has-[>svg]:px-3",
        // sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        // lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "primary",
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
