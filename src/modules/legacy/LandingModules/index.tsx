"use client";

import { useEffect, useState } from "react";
import Hero from "./section/Hero";
import About from "./section/About";
import HowTo from "./section/HowTo";
import Partners from "./section/Partners";
import FrequentlyAsked from "./section/Frequently";
import MeetTheTeam from "./section/MeetTheTeam";
import { Event } from "@/types/event";
import { LogoBackground } from "@/design-system";
import { BACKEND_URL } from "@/lib/api/config";

const LandingModules = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/event`);
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
      <FrequentlyAsked />
      <MeetTheTeam />
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
