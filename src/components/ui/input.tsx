"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-primary-300 font-jakarta border-primary-300 selection:bg-primary placeholder-primary-200  selection:text-primary-300 dark:bg-input/30  h-9 w-full min-w-0 rounded-md border-1 bg-transparent px-3 py-1 text-primary-300 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-neutral-500 md:text-sm",
        "aria-invalid:border-red-300 aria-invalid:bg-red-100 ",
        className
      )}
      {...props}
    />
  );
}

export { Input };
