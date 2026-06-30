"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type AccordionProps = React.ComponentProps<typeof AccordionPrimitive.Item> & {
  variant?: "primary" | "secondary";
};

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <div className={cn("w-full", className)} />;
  }

  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={className}
      {...props}
    />
  );
}

function AccordionItem({
  className,
  variant = "primary",
  ...props
}: AccordionProps) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "mx-5 my-2 rounded-xl border-1 border-primary-300",
        variant === "primary" &&
          "text-white bg-linear-to-r from-primary-200 to-primary-400 ",
        variant === "secondary" &&
          "data-[state=open]:bg-secondary-100 data-[state=open]:border-2 data-[state=open]:border-secondary-400 data-[state=open]:text-secondary-500 text-white bg-secondary-400",
        className
      )}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring text-xl max-md:text-lg  shadow-sm px-4 data-[state=open]:bg-primary-200 data-[state=closed]:bg-linear-to-r data-[state=closed]:from-primary-200 data-[state=closed]:to-primary-400 rounded-xl cursor-pointer md:text-xl text-tertiary-5 font-semibold font-jakarta focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4  py-4 text-left transition-all outline-none  focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="pointer-events-none text-tertiary-5 size-7 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className=" data-[state=closed]:animate-accordion-up mt-2 px-4 data-[state=open]:animate-accordion-down overflow-hidden text-sm max-md:text-xs font-questrial text-md"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
