"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui-legacy/button";
import { ArrowUpIcon, ClipboardListIcon } from "lucide-react";
import Link from "next/link";
import { BalonUdara } from "@/design-system";

import { Event } from "@/types/event";
import { getEventStatus } from "@/lib/utils/event-transformer";

type FAQProps = {
  event: Event;
};

const FAQ = ({ event }: FAQProps) => {
  const faqs = (event.faqs || []).filter(
    (item) => item.question?.trim() && item.answer?.trim()
  );
  const eventPath = event.eventCode;
  const isRegistrationClosed = getEventStatus(event) === "Ditutup";
  const isRegistrationUnavailable = isRegistrationClosed || !eventPath;
  const registrationButtonLabel = !eventPath ? "Slug belum tersedia" : "Pendaftaran Ditutup";

  if (faqs.length === 0) {
    return null;
  }

  return (
    <section className="flex relative mb-11 min-h-screen justify-center flex-col gap-4 px-12 max-lg:px-10 max-md:px-8">
      <BalonUdara width={128} height={160} className="absolute max-lg:hidden left-80 -top-30 animate-float" />

      <h1 className="text-center text-h1 text-neutral-50 font-jakarta">
        Frequently Asked Question
      </h1>

      <Accordion type="single" collapsible className="w-full" defaultValue="0">
        {faqs.map((item, i) => (
          <AccordionItem key={`${item.question}-${i}`} value={i.toString()}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>{item.answer}</p>
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
            style={{ boxShadow: "var(--shadow-glass)" }}
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

          {isRegistrationUnavailable ? (
            <Button
              disabled
              className="flex-1 flex bg-neutral-500 text-white border-none opacity-70 cursor-not-allowed"
              style={{ boxShadow: "var(--shadow-glass)" }}
            >
              <ClipboardListIcon className="size-6 mr-2" />
              <p className="text-m2">{registrationButtonLabel}</p>
            </Button>
          ) : (
            <Link href={`/${eventPath}/form`} className="flex-1">
              <Button
                className="w-full flex bg-marun text-white hover:bg-marun-light border-none"
                style={{ boxShadow: "var(--shadow-glass)" }}
              >
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