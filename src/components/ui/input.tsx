import { TriangleAlert } from "lucide-react";
import * as React from "react";
import { Label } from "./label";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  label?: string;
  error?: string;
  prefix?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, error, label, prefix, ...props }, ref) => {
    const clonedIcon = icon
      ? React.cloneElement(
          icon as React.ReactElement,
          {
            className: "absolute left-3 text-primary-300 top-1/2 transform -translate-y-1/2 w-4",
          } as React.SVGProps<SVGSVGElement>
        )
      : null;

    return (
      <div className="space-y-1">
        <Label className="text-neutral-50 font-jakarta">{label}</Label>
        <div className="relative">
          {icon && clonedIcon}
          {prefix && (
            <div className="absolute left-3 md:mt-0 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
              <span className="text-neutral-900 dark:text-neutral-100 font-jakarta text-sm">
                {prefix}
              </span>
              <div className="h-4 w-[1px] bg-neutral-900 dark:bg-neutral-100"></div>
            </div>
          )}
          <input
            type={type}
            className={cn(
              "disabled:opacity-40 px-3 py-3 text-primary-300 focus:ring-2 focus:ring-offset-0 focus:ring-primary-100  flex w-full font-jakarta rounded-xl border-2 font-normal bg-neutral-50 hover:bg-neutral-100 focus:bg-neutral-200 text-p5 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-primary-300 focus-visible:outline-none disabled:cursor-not-allowed  transition-all duration-500",
              icon ? "pl-8" : prefix ? "pl-12" : "pl-3",
              error
                ? "border-red-400 text-red-400"
                : "border-primary-300 hover:border-primary-400 focus:border-primary-[#C3D1A7]/10",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <div className="flex gap-2 items-center text-red-400">
            <TriangleAlert className="w-4" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
