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
        "bg-gradient-card-blue overflow-hidden inline-flex h-11 items-center justify-center rounded-lg",
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
      className={cn(
        "group relative py-2 inline-flex w-full items-center justify-center text-neutral-100",
        className
      )}
      {...props}
    >
      {/* Inactive Top line indicator */}
      <div
        className={cn(
          "absolute top-0 left-0 h-[5px] w-full",
          "bg-gradient-page group-data-[state=active]:opacity-0"
        )}
      />

      {/* Active Top line indicator */}
      <div
        className={cn(
          "absolute top-0 left-0 h-[5px] w-full opacity-0",
          "bg-linear-to-r from-marun-light to-marun",
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
