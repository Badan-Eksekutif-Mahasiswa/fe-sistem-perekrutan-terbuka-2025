import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center text-xl hover:cursor-pointer font-jakarta font-bold text-lg justify-center gap-2 whitespace-nowrap rounded-md transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary:
          "bg-linear-to-r text-neutral-100 from-primary-200 to-primary-400 border-1 border-primary-300 hover:border-primary-400 active:border-primary-500 hover:bg-linear-to-r hover:from-primary-200 hover:to-primary-500 active:bg-linear-to-r active:from-primary-300 active:to-primary-500 disabled:bg-primary-400 disabled:opacity-50",
        secondary:
          "bg-linear-to-r text-neutral-100 from-secondary-200 to-secondary-400 border-1 border-secondary-300 hover:border-secondary-400 active:border-secondary-500 hover:bg-linear-to-r hover:from-secondary-200 hover:to-secondary-500 active:bg-linear-to-r active:from-secondary-300 active:to-secondary-500 disabled:bg-secondary-400",
        tertiary:
          "border-2 text-primary-300 border-primary-300 bg-neutral-100 border-2 hover:bg-[#a4a4a4]/40 active:bg-[#a4a4a4]/80 disabled:border-neutral-600 disabled:text-neutral-600",
        red: "bg-linear-to-r text-neutral-100 from-red-200 to-red-400 border border-red-400 hover:border-red-400 active:border-red-500 hover:bg-linear-to-r hover:from-red-200 hover:to-red-500 active:bg-linear-to-r active:from-red-400 active:to-red-500 ",
      },
      size: {
        primary: "gap-3 px-5 py-2.5 rounded-xl has-[>svg]:px-3",
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
