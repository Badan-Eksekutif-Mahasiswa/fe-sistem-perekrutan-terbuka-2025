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
        "bg-linear-to-r from-primary-200 overflow-hidden to-primary-400 inline-flex h-9  items-center justify-center rounded-lg p-[3px]",
        "font-jakarta text-m3",
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "group relative py-2 inline-flex w-full items-center justify-center text-neutral-100 ",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 scale-[1.05] opacity-0  ",
          "bg-[linear-gradient(to_bottom,rgba(229,209,110,1),rgba(21,21,21,0.0))]",
          "group-data-[state=active]:opacity-100"
        )}
      />

      <div
        className={cn(
          "absolute top-0 scale-[1.05] left-0 h-[3px] w-full rounded-full opacity-0 ",
          "bg-linear-to-r from-secondary-200 to-secondary-400",
          "group-data-[state=active]:opacity-100"
        )}
      />

      <span className="relative z-10">{children}</span>
    </TabsPrimitive.Trigger>
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
