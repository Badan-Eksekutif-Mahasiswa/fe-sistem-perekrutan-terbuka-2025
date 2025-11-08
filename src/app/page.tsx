"use client";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Calendar from "@/components/elements/Calendar";
import { Diamond } from "lucide-react";
import { useToast } from "@/hooks/useToast";
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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

export default function Home() {
  const { show } = useToast();

  return (
    <div className="flex flex-col items-center">
      <p className="text-h1 text-white font-jakarta">Design System</p>
      <div className="px-6 space-x-6 space-y-5">
        <Input
          placeholder="Placeholder"
          icon={<Search />}
          label="Anjay gg gaming lu tai"
        />
        <Button variant={"primary"}>
          <Diamond />
          Halow Semua
        </Button>
        <Button variant={"secondary"}>
          <Diamond />
          Halow Semua
        </Button>
        <Button variant={"ghost"}>
          <Diamond />
          Halow Semua
        </Button>
        <Button variant={"destructive"}>
          <Diamond />
          Halow Semua
        </Button>
        <div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>ajfneaifneaifna</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="w-fit">
          <Countdown
            targetDate={new Date("2025-12-22T00:00:00+07:00")}
            displayDate={true}
          />
        </div>
        <div>
          <Calendar />
        </div>
        <div>
          <Tabs defaultValue="account">
            <TabsList className="w-xl">
              <TabsTrigger value="account">Tab</TabsTrigger>
              <TabsTrigger value="password">Tab</TabsTrigger>
              <TabsTrigger value="test">Tab</TabsTrigger>
              <TabsTrigger value="test2">Tab</TabsTrigger>
              <TabsTrigger value="test3">Tab</TabsTrigger>
              <TabsTrigger value="test4">Tab</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Hover</Button>
            </TooltipTrigger>
            <TooltipContent variant="primary">
              <p>Add to library</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex gap-5">
          <Button
            onClick={() =>
              show(
                "info",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porta at tortor id placerat."
              )
            }
          >
            Info
          </Button>
          <Button
            onClick={() =>
              show(
                "success",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porta at tortor id placerat."
              )
            }
          >
            Success
          </Button>
          <Button
            onClick={() =>
              show(
                "warning",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porta at tortor id placerat."
              )
            }
          >
            Warning
          </Button>
          <Button
            onClick={() =>
              show(
                "error",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porta at tortor id placerat."
              )
            }
          >
            Error
          </Button>
          <Button onClick={() => show("loading")}>Loading</Button>
        </div>

        {/* Animated Puzzle Demo Link */}
        <div className="mt-8 p-4 border border-neutral-300 rounded-lg">
          <h3 className="text-h3 text-white font-jakarta mb-2">
            New Component
          </h3>
          <p className="text-neutral-400 mb-4">
            Check out the new Animated Puzzle component with clean animations
          </p>
          <Button
            variant="primary"
            onClick={() => window.open("/puzzle-demo", "_blank")}
          >
            View Puzzle Demo
          </Button>
        </div>
      </div>
    </div>
  );
}
