import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Countdown from "@/components/elements/Countdown";

export default function Home() {
  return (
    <>
      <p className="text-secondary-500 font-jakarta">Hello SPT</p>
      <div className="px-6 space-x-6">
        <Input placeholder="Placeholder" />
        <Button variant={"primary"}>Halow Semua</Button>
        <Button variant={"secondary"}>Halow Semua</Button>
        <Button variant={"tertiary"}>Halow Semua</Button>
        <Button variant={"red"}>Halow Semua</Button>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>Halooww</DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Billing
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Keyboard shortcuts
                  <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="bg-black w-fit">
          <Countdown
            targetDate={new Date("2025-12-22T00:00:00+07:00")}
            displayDate={true}
          />
        </div>
      </div>
    </>
  );
}
