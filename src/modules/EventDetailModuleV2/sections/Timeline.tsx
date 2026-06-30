"use client";

import React, { useRef, useState } from "react";
import type { EventTimelineType, TimelineMarkerProps } from "../type";
import { Button } from "@/components/ui-legacy/button";
import { NodeTimeline } from "../../../../public/assets-legacy/svgs/NodeTimeline";
import { Event } from "@/types/event";

type TimelineProps = {
  event: Event;
};

const TimelineCard = ({ date, title, desc }: EventTimelineType) => {
  const formattedDate = date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="flex flex-col text-white gap-4 items-center text-center">
      <Button 
        className="text-white text-m2 max-md:text-m3 px-6 py-2 rounded-full border-none" 
        style={{
          backgroundImage: 'var(--gradient-btn-1)',
          boxShadow: 'var(--shadow-glass)'
        }}
      >
        {formattedDate}
      </Button>
      <h2 className=" text-h2 max-md:text-h5">{title}</h2>
      <p className="text-p5 max-md:text-p6">{desc}</p>
    </div>
  );
};

const TimelineMarker = ({ isEven, isLast }: TimelineMarkerProps) => {
  return (
    <div className="w-full flex justify-center items-center relative ">
      {!isLast && (
        <div className="absolute mt-2 top-1/2 left-1/2 w-[91%] mx-auto rounded-full h-1.5 bg-white ml-4 -translate-y-1/2 -z-10" />
      )}

      <div className={` ${!isEven ? "rotate-180 mt-10" : "mb-2"}`}>
        <NodeTimeline />
      </div>
    </div>
  );
};

const Timeline = ({ event }: TimelineProps) => {
  const scrollRef = useRef<HTMLElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartScrollLeft, setDragStartScrollLeft] = useState(0);

  // Convert event.timeline JSON to timeline array
  const timelineData: EventTimelineType[] = [];

  // Check if timeline is an array
  if (Array.isArray(event.timeline)) {
    event.timeline.forEach((item: unknown) => {
      if (
        item &&
        typeof item === "object" &&
        ("date" in item || "startDate" in item) &&
        "title" in item
      ) {
        const timelineItem = item as {
          date: string;
          startDate?: string;
          title: string;
          description?: string;
          desc?: string;
        };
        const rawDate = timelineItem.date || timelineItem.startDate;
        if (!rawDate) return;

        const date = new Date(rawDate);
        if (Number.isNaN(date.getTime())) return;

        timelineData.push({
          date,
          title: timelineItem.title,
          desc: timelineItem.description || timelineItem.desc || "",
        });
      }
    });
  }

  // If no timeline data, don't render the section
  if (timelineData.length === 0) {
    return null;
  }

  timelineData.sort((a, b) => a.date.getTime() - b.date.getTime());

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if (!scrollRef.current) return;

    setIsDragging(true);
    setDragStartX(event.clientX);
    setDragStartScrollLeft(scrollRef.current.scrollLeft);
    scrollRef.current.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!isDragging || !scrollRef.current) return;

    const dragDistance = event.clientX - dragStartX;
    scrollRef.current.scrollLeft = dragStartScrollLeft - dragDistance;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLElement>) => {
    if (!scrollRef.current) return;

    setIsDragging(false);
    scrollRef.current.releasePointerCapture(event.pointerId);
  };

  return (
    <>
      <h1 className="text-center text-h1 text-white mb-5">Timeline</h1>
      <main
        ref={scrollRef}
        className={`w-full bg-transparent flex flex-col gap-10 py-10 overflow-x-auto select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ msOverflowStyle: "none" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div className="relative w-max px-10 md:px-20 md:pr-40 ">
          <div className="flex justify-between items-stretch w-full relative z-10">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;
              const isLast = index === timelineData.length - 1;

              return (
                <div
                  key={index}
                  className={`flex shrink-0 w-[350px] flex-col items-center ${
                    isEven ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`flex-1 flex items-end pb-8 ${
                      !isEven ? "invisible" : ""
                    }`}
                  >
                    <TimelineCard {...item} />
                  </div>

                  <TimelineMarker isEven={isEven} isLast={isLast} />

                  <div
                    className={`flex-1 flex items-start pt-8 ${
                      isEven ? "invisible" : ""
                    } `}
                  >
                    <TimelineCard {...item} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default Timeline;
