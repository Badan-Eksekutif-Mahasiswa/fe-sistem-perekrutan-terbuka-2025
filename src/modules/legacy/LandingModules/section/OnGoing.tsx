import Calendar from "@/components/elements/Calendar";
import Button from "@/design-system/components/atoms/Button";
import Image from "next/image";
import BalonUdara from "@/design-system/components/atoms/BalonUdara";
import { Chip } from "@/components/ui/chip";
import { Diamond } from "lucide-react";
import { Event } from "@/types/event";
import { getEventStatus } from "@/lib/utils/event-transformer";

type OnGoingProps = {
  events: Event[];
  loading: boolean;
};

const OnGoing = ({ events = [], loading }: OnGoingProps) => {
  const ongoingEvents = events.filter((event) => getEventStatus(event) === "Dibuka");

  return (
    <section className="relative overflow-hidden grid grid-cols-[2fr_1fr] max-lg:grid-cols-1 gap-12 max-lg:gap-8 py-20 px-12 max-lg:px-10 max-md:px-8">
      <BalonUdara width={85} height={125} className="absolute -z-10 -left-4 top-6 opacity-70 max-lg:hidden animate-float [animation-delay:1s]" />
      {/* Balon kanan — 118×174px per Figma */}
      <BalonUdara width={118} height={174} className="absolute -z-10 -right-4 bottom-10 opacity-70 max-lg:hidden animate-float [animation-delay:2.5s]" />
      <OngoingSection events={ongoingEvents} loading={loading} />
      <CalendarSection events={events} />
    </section>
  );
};
export default OnGoing;

const CalendarSection = ({ events }: { events: Event[] }) => {
  const activeEvents = events.filter((event) => getEventStatus(event) === "Dibuka");
  const availableRanges = activeEvents.map((event) => ({
    start: new Date(event.registrationOpen),
    end: new Date(event.registrationClose),
    label: event.title,
    available: true,
  }));

  return (
    <div className="w-full flex flex-col gap-2">
      <p className="text-m1 text-white text-center">Calendar</p>
      <Calendar availableRanges={availableRanges} />
      <Button variant="external" href="/event">
        Cek Pendaftaran Lainnya
      </Button>
    </div>
  );
};

const OngoingSection = ({
  events,
  loading,
}: {
  events: Event[];
  loading: boolean;
}) => {
  return (
    <div className="w-full flex flex-col gap-2 font-jakarta text-neutral-50">
      <h1 className="text-h1">Pendaftaran Ongoing</h1>
      <p className="text-m4">
        Lorem ipsum et volutpat at massa eget ut urna tellus sapien purus
        viverra id interdum egestas sed sed adipiscing neque et quisque vivamus
        consectetur.
      </p>
      <div className="rounded-3xl border border-primary-300 w-full p-6 max-lg:p-4 flex flex-col gap-2 bg-gradient-card-blur">
        <p className="text-h4">Ayo Daftar sebelum ketinggalan!</p>
        <div className="max-h-80 max-lg:max-h-80 overflow-y-auto flex flex-col gap-3">
          {loading ? (
            <div className="text-center py-8 text-neutral-400">
              Memuat data...
            </div>
          ) : events.length > 0 ? (
            events.map((event) => (
              <EventCard
                key={event.id}
                id={event.eventCode || undefined}
                logo={event.logo ?? "/assets/logo-bem-ui.png"}
                title={event.title}
                startDate={new Date(event.registrationOpen)}
                endDate={new Date(event.registrationClose)}
                restrictions={[
                  ...(event.eventLevel ? [event.eventLevel] : []),
                  event.typeOfEvent === "ORGANISASI"
                    ? "Organisasi"
                    : event.typeOfEvent === "KEPANITIAAN"
                    ? "Kepanitiaan"
                    : "UKM",
                ]}
              />
            ))
          ) : (
            <div className="text-center py-8 text-neutral-400">
              Tidak ada pendaftaran yang sedang dibuka saat ini
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EventCard = ({
  id,
  logo,
  title,
  startDate,
  endDate,
  restrictions,
}: {
  id?: string;
  logo: string;
  title: string;
  startDate: Date;
  endDate: Date;
  restrictions: string[];
}) => {
  return (
    <div className="rounded-4xl max-lg:text-center p-4 flex max-lg:flex-col justify-between gap-6 bg-gradient-card items-center">
      <div className="flex max-lg:flex-col gap-6 items-center">
        <div className="relative size-20 max-lg:size-25">
          <Image src={logo} alt={title} className="object-contain" fill />
        </div>
        <div className="flex flex-col gap-1 text-neutral-50 font-jakarta">
          <h1 className="text-h4">{title}</h1>
          <p className="text-m4">
            {startDate.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}{" "}
            -{" "}
            {endDate.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>

          <div className="flex gap-1 flex-wrap max-lg:justify-center">
            {restrictions.length > 0 &&
              restrictions.map((res) => (
                <Chip key={res} leftIcon={<Diamond className="stroke-3" />}>
                  {res}
                </Chip>
              ))}
          </div>
        </div>
      </div>
      {id ? (
        <Button className="max-lg:w-full" variant="external" href={`/${id}`}>
          Selengkapnya
        </Button>
      ) : (
        <Button className="max-lg:w-full cursor-not-allowed opacity-60" variant="external" disabled>
          Slug belum tersedia
        </Button>
      )}
    </div>
  );
};