"use client";

import { useEffect, useState } from "react";
import Hero from "./section/Hero";
import About from "./section/About";
import HowTo from "./section/HowTo";
import ContactPerson from "@/components/elements/ContactPerson";
import Partners from "./section/Partners";
import FrequentlyAsked from "./section/Frequently";
import { Event } from "@/types/event";

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
    <main className="flex flex-col gap-20 pb-20">
      <Hero events={events} loading={loading} />
      <About />
      <HowTo />
      <Partners />
      <div className="px-12 max-lg:px-10 max-md:px-8">
        <ContactPerson
          title="Contact Person"
          description="Reach out to our team for questions or support."
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
      <FrequentlyAsked />
    </main>
  );
};
export default LandingModules;
