"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-linear-to-r from-primary-200 overflow-hidden  to-primary-400 inline-flex h-9  items-center justify-center rounded-lg p-[3px]",
        "font-jakarta text-m3",
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <div className="relative w-full max-w-80 text-center">
      <TabsPrimitive.Trigger
        data-slot="tabs-trigger"
        className={cn(
          "py-2 inline-flex h-[calc(100%-1px)] flex-1 text-neutral-100 items-center justify-center px-2 whitespace-nowrap focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          "before:content-[''] before:absolute before:top-0 before:left-0 before:w-[111%] before:-ml-[5%] data-[state=active]:w-[110%] data-[state=active]:-ml-[4.5%] before:h-[3px] before:rounded-full before:bg-linear-to-r before:from-secondary-200 before:to-secondary-400 before:opacity-0 data-[state=active]:before:opacity-100 data-[state=active]:rounded-t-xs data-[state=active]:bg-[linear-gradient(to_bottom,rgba(229,209,110,1),rgba(21,21,21,0.0))]",
          className
        )}
        {...props}
      />
    </div>
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
