import Image from "next/image";
import { BookmarkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DiamondIcon } from "lucide-react";
import type { EventType } from "../type";

type EventCardProps = {
  event: EventType;
};

const EventCard = ({ event }: EventCardProps) => {
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
    <div className="bg-gradient-card rounded-xl p-6 items-start flex flex-col gap-4 border-1 border-primary-300">
      <div className="flex flex-row gap-6">
        <div className="relative w-34 h-34">
          <Image
            src={"/placeholders/logo-event.webp"}
            alt="Logo"
            layout="fill"
          />
        </div>
        <div className="flex flex-col w-full text-start gap-2">
          <div className="w-full flex  justify-between">
            <h3 className="text-h3">{event.title}</h3>
            <div className="flex flex-row gap-3 items-center">
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
          <p className="text-m4">{displayDate}</p>
          <p className="text-p6">{event.desc}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="space-x-2">
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
      </div>
    </div>
  );
};

export default EventCard;
