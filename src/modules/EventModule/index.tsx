import Hero from "./sections/Hero";
import Timeline from "./sections/Timeline";
import Divisi from "./sections/Divisi";
import Testimoni from "./sections/Testimoni";
import Dokumentasi from "./sections/Dokumentasi";
import FAQ from "./sections/FAQ";
import { Event } from "@/types/event";

type EventModuleProps = {
  event: Event;
};

const EventModule = ({ event }: EventModuleProps) => {
  return (
    <main className="min-h-screen flex flex-col gap-14 overflow-hidden">
      <Hero event={event} />
      <Timeline event={event} />
      <Divisi event={event} />
      <Testimoni />
      <Dokumentasi />
      <FAQ />
    </main>
  );
};

export default EventModule;
