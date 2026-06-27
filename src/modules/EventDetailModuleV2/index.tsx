import Hero from "./sections/Hero";
import Timeline from "./sections/Timeline";
import Divisi from "./sections/Divisi";
import Testimoni from "./sections/Testimoni";
import Dokumentasi from "./sections/Dokumentasi";
import FAQ from "./sections/FAQ";
import { Event } from "@/types/event";
import LogoBackground from "@/design-system/components/atoms/LogoBackground";

type EventModuleProps = {
  event: Event;
};

const EventDetailModuleV2 = ({ event }: EventModuleProps) => {
  return (
    <main className="min-h-screen flex flex-col overflow-hidden relative">
      <Hero event={event} />
      <div className="bg-gradient-page flex flex-col gap-14 relative z-0 overflow-hidden">
        <Timeline event={event} />
        <Divisi event={event} />
        <Testimoni event={event} />
        <Dokumentasi event={event} />
        <FAQ event={event} />

        {/* Decorative background */}
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
      </div>
    </main>
  );
};

export default EventDetailModuleV2;
