"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon, ClipboardListIcon } from "lucide-react";
import { AirBalloon } from "../../../../public/svgs/AirBaloon";
import { Event } from "@/types/event";
import Link from "next/link";

type FAQProps = {
  event: Event;
};

const FAQ = ({ event }: FAQProps) => {
  return (
    <section className="flex relative mb-11 min-h-screen justify-center flex-col gap-4 px-12 max-lg:px-10 max-md:px-8">
      <AirBalloon className="absolute max-lg:hidden size-32 left-80 top-0  animate-float" />

      <img
        src="/events/bg-puzzle.webp"
        alt="bg puzzle"
        className="absolute max-md:hidden left-0 opacity-30 -z-50"
      />
      <h1 className="text-center text-h1 text-neutral-50 font-jakarta">
        Frequently Asked Question
      </h1>

      <Accordion type="single" collapsible className="w-full" defaultValue="0">
        {Array.from({ length: 8 }).map((_, i) => (
          <AccordionItem key={i} value={i.toString()}>
            <AccordionTrigger>Product Information</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                Our flagship product combines cutting-edge technology with sleek
                design. Built with premium materials, it offers unparalleled
                performance and reliability.
              </p>
              <p>
                Key features include advanced processing capabilities, and an
                intuitive user interface designed for both beginners and
                experts.
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="w-full h-full flex px-4 md:px-20 py-10 flex-col justify-center gap-12 items-center">
        <h1 className="font-bold text-5xl text-white text-center">
          Ayo Join Sekarang
        </h1>

        <div className="flex flex-col sm:flex-row justify-between w-full max-w-xl gap-3 md:gap-8">
          <Button
            variant={"secondary"}
            className="flex-1 flex text-primary-500"
            onClick={() => {
              const heroSection = document.getElementById("hero-section");
              if (heroSection) {
                heroSection.scrollIntoView({ behavior: "smooth" });
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <ArrowUpIcon className="size-6 mr-2" />{" "}
            <p className="text-m2">Scroll to Top</p>
          </Button>

          {event.status === "CLOSED" ? (
            <Button className="flex-1 flex" variant={"primary"} disabled>
              <ClipboardListIcon className="size-6 mr-2" />
              <p className="text-m2">Pendaftaran Ditutup</p>
            </Button>
          ) : (
            <Link href={`/${event.id}/form`} className="flex-1 flex w-full">
              <Button className="w-full flex" variant={"primary"}>
                <ClipboardListIcon className="size-6 mr-2" />
                <p className="text-m2">Daftar</p>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};
export default FAQ;
