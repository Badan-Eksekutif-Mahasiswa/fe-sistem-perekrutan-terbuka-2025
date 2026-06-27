"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui-legacy/button";
import { ArrowUpIcon, ClipboardListIcon } from "lucide-react";
import { BalonUdara } from "@/design-system";

import { Event } from "@/types/event";

type FAQProps = {
  event: Event;
};

const FAQ = ({ event }: FAQProps) => {
  return (
    <section className="flex relative mb-11 min-h-screen justify-center flex-col gap-4 px-12 max-lg:px-10 max-md:px-8">
      <BalonUdara width={128} height={160} className="absolute max-lg:hidden left-80 -top-30 animate-float" />


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
            className="flex-1 flex bg-gradient-card-blue backdrop-blur-md text-white border-none hover:brightness-110"
            style={{ boxShadow: 'var(--shadow-glass)' }}
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

          <Button
            className="flex-1 flex bg-marun text-white hover:bg-marun-light border-none"
            style={{ boxShadow: 'var(--shadow-glass)' }}
          >
            <ClipboardListIcon className="size-6 mr-2" />
            <p className="text-m2">Daftar</p>
          </Button>
        </div>
      </div>
    </section>
  );
};
export default FAQ;
