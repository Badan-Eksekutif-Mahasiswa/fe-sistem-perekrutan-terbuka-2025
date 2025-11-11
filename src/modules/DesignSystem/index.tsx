"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Diamond,
  Palette,
  Layout,
  Type,
  MousePointer,
} from "lucide-react";
import Calendar from "@/components/elements/Calendar";
import { useToast } from "@/hooks/useToast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Countdown from "@/components/elements/Countdown";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function DesignSystem() {
  const { show } = useToast();

  const ComponentSection = ({
    title,
    description,
    icon: Icon,
    children,
  }: {
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    children: React.ReactNode;
  }) => (
    <section className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-primary-300/20 rounded-lg">
          <Icon className="w-6 h-6 text-primary-100" />
        </div>
        <div>
          <h2 className="text-h3  font-jakarta">{title}</h2>
          <p className="text-p5 text-neutral-300">{description}</p>
        </div>
      </div>
      <div className="bg-neutral-100/5 rounded-xl p-6 border border-neutral-100/10">
        {children}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen py-20 text-white">
      {/* Header */}
      <header className="py-12 text-center border-b border-neutral-100/10">
        <h1 className="text-h1  font-jakarta">Design System</h1>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="space-y-16">
          {/* Form Components */}
          <ComponentSection
            title="Form Components"
            description="Input fields, selects, and form controls"
            icon={Type}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-jakarta">Input Fields</h4>
                <Input
                  placeholder="Search something..."
                  icon={<Search />}
                  label="Input with Icon"
                />
                <Input placeholder="Enter your name" label="Standard Input" />
              </div>
              <div className="space-y-4">
                <h4 className="font-jakarta">Select Dropdown</h4>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </ComponentSection>

          {/* Buttons */}
          <ComponentSection
            title="Buttons"
            description="Primary, secondary, and specialized button variants"
            icon={MousePointer}
          >
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-m3  font-jakarta">Button Variants</h4>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">
                    <Diamond />
                    Primary Button
                  </Button>
                  <Button variant="secondary">
                    <Diamond />
                    Secondary Button
                  </Button>
                  <Button variant="ghost">
                    <Diamond />
                    Ghost Button
                  </Button>
                  <Button variant="destructive">
                    <Diamond />
                    Destructive Button
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-m3  font-jakarta">Toast Notifications</h4>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="ghost"
                    onClick={() =>
                      show(
                        "info",
                        "This is an informational message with helpful details."
                      )
                    }
                  >
                    Info Toast
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() =>
                      show("success", "Operation completed successfully!")
                    }
                  >
                    Success Toast
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() =>
                      show(
                        "warning",
                        "Please check your input before proceeding."
                      )
                    }
                  >
                    Warning Toast
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() =>
                      show(
                        "error",
                        "An error occurred while processing your request."
                      )
                    }
                  >
                    Error Toast
                  </Button>
                  <Button variant="ghost" onClick={() => show("loading")}>
                    Loading Toast
                  </Button>
                </div>
              </div>
            </div>
          </ComponentSection>

          {/* Navigation & Layout */}
          <ComponentSection
            title="Navigation & Layout"
            description="Tabs, accordions, and interactive components"
            icon={Layout}
          >
            <div className="space-y-8">
              <div className="space-y-4">
                <h4 className="text-m3  font-jakarta">Tabs Component</h4>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="w-full max-w-md">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="pricing">Pricing</TabsTrigger>
                    <TabsTrigger value="support">Support</TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="overview"
                    className="mt-4 p-4 bg-neutral-100/5 rounded-lg"
                  >
                    <p className="text-p4 text-neutral-200">
                      Overview content goes here.
                    </p>
                  </TabsContent>
                  <TabsContent
                    value="features"
                    className="mt-4 p-4 bg-neutral-100/5 rounded-lg"
                  >
                    <p className="text-p4 text-neutral-200">
                      Features content goes here.
                    </p>
                  </TabsContent>
                  <TabsContent
                    value="pricing"
                    className="mt-4 p-4 bg-neutral-100/5 rounded-lg"
                  >
                    <p className="text-p4 text-neutral-200">
                      Pricing content goes here.
                    </p>
                  </TabsContent>
                  <TabsContent
                    value="support"
                    className="mt-4 p-4 bg-neutral-100/5 rounded-lg"
                  >
                    <p className="text-p4 text-neutral-200">
                      Support content goes here.
                    </p>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-4">
                <h4 className="text-m3  font-jakarta">Accordion Component</h4>
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  defaultValue="item-1"
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Product Information</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                      <p>
                        Our flagship product combines cutting-edge technology
                        with sleek design. Built with premium materials, it
                        offers unparalleled performance and reliability.
                      </p>
                      <p>
                        Key features include advanced processing capabilities,
                        and an intuitive user interface designed for both
                        beginners and experts.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Shipping Details</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                      <p>
                        We offer worldwide shipping through trusted courier
                        partners. Standard delivery takes 3-5 business days,
                        while express shipping ensures delivery within 1-2
                        business days.
                      </p>
                      <p>
                        All orders are carefully packaged and fully insured.
                        Track your shipment in real-time through our dedicated
                        tracking portal.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Return Policy</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                      <p>
                        We stand behind our products with a comprehensive 30-day
                        return policy. If you&apos;re not completely satisfied,
                        simply return the item in its original condition.
                      </p>
                      <p>
                        Our hassle-free return process includes free return
                        shipping and full refunds processed within 48 hours of
                        receiving the returned item.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </ComponentSection>

          {/* Interactive Elements */}
          <ComponentSection
            title="Interactive Elements"
            description="Tooltips, calendars, and specialized components"
            icon={MousePointer}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-m3  font-jakarta">Tooltip</h4>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="secondary">Hover for Tooltip</Button>
                  </TooltipTrigger>
                  <TooltipContent variant="primary">
                    <p>This is a helpful tooltip message</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              <div className="w-full space-y-4 flex flex-col items-center">
                <h4 className="text-m3  font-jakarta">Countdown Timer</h4>
                <div className="w-fit">
                  <Countdown
                    targetDate={new Date("2025-12-31T23:59:59+07:00")}
                    displayDate={true}
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <h4 className="text-m3  font-jakarta">Calendar Component</h4>
              <div className="flex justify-center">
                <Calendar />
              </div>
            </div>
            <div className="mt-8 space-y-4">
              <h4 className="text-m3  font-jakarta">Card Component</h4>
              <Card className="w-lg">
                <CardHeader>
                  <CardTitle>Lorem Ipsum</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src="/placeholder-1.webp"
                    alt="placeholder"
                    className="object-fill"
                  />
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Doloremque sit facere molestias dicta porro impedit, maxime
                    tempore quibusdam ratione laudantium unde optio quo fugit,
                    neque qui! Possimus error odit libero!
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="flex-1" variant={"secondary"}>
                    <Diamond />
                    Button
                    <Diamond />
                  </Button>
                  <Button className="flex-1" variant={"primary"}>
                    <Diamond />
                    Button
                    <Diamond />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </ComponentSection>
        </div>
      </main>
    </div>
  );
}
