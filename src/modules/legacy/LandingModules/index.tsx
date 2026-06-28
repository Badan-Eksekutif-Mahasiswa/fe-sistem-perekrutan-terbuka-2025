"use client";

import { useEffect, useState } from "react";
import Hero from "./section/Hero";
import About from "./section/About";
import HowTo from "./section/HowTo";
import ContactPerson from "@/components/elements/ContactPerson";
import Partners from "./section/Partners";
import FrequentlyAsked from "./section/Frequently";
import MeetTheTeam from "./section/MeetTheTeam";
import { Event } from "@/types/event";
import { BalonUdara, LogoBackground } from "@/design-system";

const LandingModules = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"
          }/event`
        );
        const result = await response.json();
        if (result.success) {
          setEvents(result.data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <main className="relative flex flex-col gap-20 pb-20 overflow-x-hidden">
      <Hero events={events} loading={loading} />
      <About />
      <HowTo />
      <Partners />
      <div className="relative overflow-hidden px-12 max-lg:px-10 max-md:px-8">
        {/* Balon kanan — 118×174px per Figma */}
        <BalonUdara width={118} height={174} className="absolute -z-10 -right-4 top-1/3 opacity-70 max-lg:hidden animate-float [animation-delay:0.5s]" />
        <ContactPerson
          title="Tertarik Buka Pendaftaran di SPT?"
          description="Hubungi contact person kami"
          contact={[
            {
              name: "Fauzan",
              method: "Line",
              link: "https://google2.com",
            },
            {
              name: "Fauzan2",
              method: "Line",
              link: "https://google.com",
            },
          ]}
        />
      </div>
      <MeetTheTeam />
      <FrequentlyAsked />
      <div className="absolute z-[-1] inset-0 flex justify-end items-end pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="translate-x-[20%] translate-y-[20%]">
          <LogoBackground
            variant="pattern"
            width={1200}
            height={1200}
            className="-rotate-75 translate-x-75 scale-140"
            opacity={0.15}
          />
        </div>
      </div>
    </main>
  );
};
export default LandingModules;
