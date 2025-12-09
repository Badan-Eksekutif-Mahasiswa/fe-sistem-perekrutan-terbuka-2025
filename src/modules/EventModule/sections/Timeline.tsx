import React from "react";
import type { EventTimelineType, TimelineMarkerProps } from "../type";
import { timelineData } from "../const";
import { Button } from "@/components/ui/button";
import { NodeTimeline } from "../../../../public/svgs/NodeTimeline";

const TimelineCard = ({ date, title, desc }: EventTimelineType) => {
  const formattedDate = date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="flex flex-col text-white gap-4 items-center text-center">
      <Button className=" text-m2 max-md:text-m3 px-6 py-2 rounded-full">
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

const Timeline = () => {
  return (
    <>
      <h1 className="text-center text-h1 text-white mb-5">Timeline</h1>
      <main className="w-full bg-primary-500 flex flex-col gap-10 py-10  overflow-x-auto">
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
