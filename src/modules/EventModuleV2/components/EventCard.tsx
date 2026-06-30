import Image from "next/image";
import { BookmarkIcon } from "lucide-react";
import { Button } from "@/components/ui-legacy/button";
import { DiamondIcon, ArrowRightIcon } from "lucide-react";
import type { EventType } from "../type";
import Link from "next/link";

type EventCardProps = {
  event: EventType;
};

const EventCard = ({ event }: EventCardProps) => {
  const eventPath = event.eventCode;
  const formattedDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const displayDate = `${formattedDate(event.startedAt)} - ${formattedDate(
    event.closedAt
  )}`;

  return (
    <div className="bg-gradient-card-glass backdrop-blur-sm rounded-xl p-6 items-start  border-1 border-primary-300">
      {/* Desktop Version */}
      <div className="w-full max-md:hidden flex flex-col gap-4">
        <div className="flex w-full flex-row gap-6">
          <div className="relative w-40 h-34">
            <Image
              src={event.logo || "/assets/logo-bem-ui.png"}
              alt="Logo"
              layout="fill"
            />
          </div>
          <div className="flex flex-col w-full text-start gap-2">
            <div className="w-full flex justify-between">
              <h3 className="text-h3">{event.title}</h3>
              <div className="flex flex-row  gap-3 items-center">
                <div
                  className={`${
                    event.status === "Dibuka"
                      ? "bg-primary-500"
                      : event.status === "Ditutup"
                      ? "bg-red-400"
                      : "bg-secondary-500"
                  } h-fit w-fit rounded-2xl px-3 py-1 text-m3`}
                >
                  <p>{event.status}</p>
                </div>
                <BookmarkIcon />
              </div>
            </div>
            <p className="text-m4 ">{displayDate}</p>
            <p className="text-p5">{event.desc}</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-2 ">
            {event.categories.map((c, i) => (
              <Button
                key={i}
                variant="ghost"
                size={"md"}
                className="rounded-full"
              >
                <DiamondIcon /> {c}
              </Button>
            ))}
          </div>
          {eventPath ? (
          <Link href={`/${eventPath}`}>
            <Button variant={"secondary"} className="h-fit">
              <p className="text-primary-500 text-m3">Selengkapnya</p>
              <ArrowRightIcon className="size-4 text-primary-500" />
            </Button>
          </Link>
          ) : (
            <Button variant={"secondary"} className="h-fit cursor-not-allowed opacity-60" disabled>
              <p className="text-primary-500 text-m3">Slug belum tersedia</p>
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Version */}
      <div className="w-full space-y-4 md:hidden">
        <div className="flex items-start gap-2 flex-col">
          <div className="flex w-full text-center gap-3 items-center flex-wrap justify-between">
            <p className="text-p5">{displayDate}</p>
            <div className="flex flex-row  gap-3 items-center">
              <div
                className={`${
                  event.status === "Dibuka"
                    ? "bg-primary-500"
                    : event.status === "Ditutup"
                    ? "bg-red-400"
                    : "bg-secondary-500"
                } h-fit w-fit rounded-2xl px-3 py-1 text-m4`}
              >
                <p>{event.status}</p>
              </div>
              <BookmarkIcon className="size-5" />
            </div>
          </div>
          <h4 className="text-h4">{event.title}</h4>
        </div>
        <div className="flex text-start flex-row gap-6">
          <div className="relative max-sm:w-72 w-32 h-34">
            <Image
              src={event.logo || "/assets/logo-bem-ui.png"}
              alt="Logo"
              layout="fill"
            />
          </div>
          <p className="text-p5">{event.desc}</p>
        </div>
        <div className="flex flex-col w-full gap-3 justify-between">
          <div className="gap-2 flex items-start flex-wrap ">
            {event.categories.map((c, i) => (
              <Button
                key={i}
                variant="ghost"
                size={"md"}
                className="rounded-full"
              >
                <DiamondIcon /> {c}
              </Button>
            ))}
          </div>
          {eventPath ? (
          <Link className="w-full" href={`/${eventPath}`}>
            <Button variant={"secondary"} className="w-full">
              <p className="text-primary-500 text-m3">Selengkapnya</p>
              <ArrowRightIcon className="size-4 text-primary-500" />
            </Button>
          </Link>
          ) : (
            <Button variant={"secondary"} className="w-full cursor-not-allowed opacity-60" disabled>
              <p className="text-primary-500 text-m3">Slug belum tersedia</p>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
