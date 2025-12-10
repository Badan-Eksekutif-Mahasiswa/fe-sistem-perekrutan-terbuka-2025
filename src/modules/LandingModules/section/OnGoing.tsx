import Calendar from "@/components/elements/Calendar";
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import Image from "next/image";
import { Chip } from "@/components/ui/chip";
import { ArrowRight, Diamond } from "lucide-react";
import Link from "next/link";
import { Event } from "@/types/event";
import { getEventStatus } from "@/lib/utils/event-transformer";

type OnGoingProps = {
  events: Event[];
  loading: boolean;
};

const OnGoing = ({ events = [], loading }: OnGoingProps) => {
  // Filter only open events
  const ongoingEvents = events.filter((event) => {
    const status = getEventStatus(
      event.openRegistration,
      event.closeRegistration
    );
    return status === "Dibuka";
  });

  return (
    <section className="grid grid-cols-[2fr_1fr] max-lg:grid-cols-1 gap-12 max-lg:gap-8 py-20 px-12 max-lg:px-10 max-md:px-8">
      <OngoingSection events={ongoingEvents} loading={loading} />
      <CalendarSection />
    </section>
  );
};
export default OnGoing;

const CalendarSection = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      <p className="text-m1 text-white text-center">Calender</p>
      <Calendar />
      <Button variant={"secondary"}>
        <SquarePen />
        Lihat Selengkapnya
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
                id={event.id}
                logo={event.logo || "/logo-clean.webp"}
                title={event.title}
                startDate={new Date(event.openRegistration)}
                endDate={new Date(event.closeRegistration)}
                restrictions={[
                  event.eventLevel,
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
  id: string;
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
      <Link className="max-lg:w-full" href={`/${id}`}>
        <Button className="max-lg:w-full" variant={"secondary"}>
          Lihat Selengkapnya <ArrowRight />
        </Button>
      </Link>
    </div>
  );
};
