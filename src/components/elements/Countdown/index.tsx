"use client";
import { Timer } from "lucide-react";
import React, {
  type ComponentPropsWithoutRef,
  useEffect,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import type { CountdownProps } from "./interface";

const BlockTime: React.FC<ComponentPropsWithoutRef<"div"> & CountdownProps> = ({
  date,
  type,
  classNameType,
  classNameBlock,
}) => {
  return (
    <div className="flex font-jakarta  flex-col items-center gap-2">
      <span
        className={cn(
          "inline-block font-semibold text-white text-xs md:text-base opacity-90",
          classNameType
        )}
      >
        {type}
      </span>
      <div className="p-[1px] md:p-[1px] rounded-[11px] bg-gradient">
        <div
          className={cn(
            "flex justify-center bg-linear-to-r from-primary-200 to-primary-400 items-center w-[84px] h-[90px] md:w-[80px] md:h-[86px] border-1 border-primary-300 rounded-xl",
            classNameBlock
          )}
        >
          <span
            className={cn(
              "inline-block font-jakarta font-semibold text-4xl text-white",
              classNameType
            )}
          >
            {date}
          </span>
        </div>
      </div>
    </div>
  );
};

const DotTime = () => {
  return (
    <div className="flex flex-col gap-3 pt-4 md:pt-7">
      {/* Gradient border */}
      <div className="w-1 h-1 md:w-2 md:h-2 bg-gradient-to-r flex items-center justify-center">
        <div className="w-[3px] h-[3px] md:w-[6px] md:h-[6px]  bg-white"></div>
      </div>

      <div className="w-1 h-1 md:w-2 md:h-2 bg-gradient-to-r flex items-center justify-center">
        <div className="w-[3px] h-[3px] md:w-[6px] md:h-[6px]  bg-white"></div>
      </div>
    </div>
  );
};

const Countdown = ({
  targetDate,
  displayDate = false,
  classNameType,
  classNameBlock,
  onComplete,
}: {
  targetDate: Date;
  displayDate?: boolean;
  classNameType?: string;
  classNameBlock?: string;
  onComplete?: () => void;
}) => {
  const defaultRemainingTime = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);
  const [dateTime, setDateTime] = useState({
    date: "",
    time: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const deadlineDate = targetDate.getTime();
      const now = new Date().getTime();
      const distance = deadlineDate - now;

      const days = Math.floor(distance / (24 * 60 * 60 * 1000));
      const hours = Math.floor(
        (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
      const seconds = Math.floor((distance % (60 * 1000)) / 1000);

      if (distance < 0) {
        setRemainingTime({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        if (onComplete) {
          onComplete();
        }
      } else {
        setRemainingTime({
          days,
          hours,
          minutes,
          seconds,
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, displayDate, onComplete]);

  useEffect(() => {
    const date = targetDate.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const time = targetDate
      .toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      })
      .replace(".", ":");

    setDateTime({
      date,
      time,
    });
  }, [targetDate]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-1 md:gap-4">
        <BlockTime
          classNameBlock={classNameBlock}
          classNameType={classNameType}
          type={remainingTime.days != 0 ? "Days" : "Hours"}
          date={
            remainingTime.days != 0
              ? remainingTime.days.toString().padStart(2, "0")
              : remainingTime.hours.toString().padStart(2, "0")
          }
        />
        <DotTime />
        <BlockTime
          classNameBlock={classNameBlock}
          classNameType={classNameType}
          type={remainingTime.days != 0 ? "Hours" : "Minutes"}
          date={
            remainingTime.days != 0
              ? remainingTime.hours.toString().padStart(2, "0")
              : remainingTime.minutes.toString().padStart(2, "0")
          }
        />
        <DotTime />
        <BlockTime
          classNameBlock={classNameBlock}
          classNameType={classNameType}
          type={remainingTime.days != 0 ? "Minutes" : "Seconds"}
          date={
            remainingTime.days != 0
              ? remainingTime.minutes.toString().padStart(2, "0")
              : remainingTime.seconds.toString().padStart(2, "0")
          }
        />
      </div>
      {displayDate && (
        <div className="flex font-jakarta font-semibold items-center gap-1 md:gap-2">
          <Timer
            className={cn(
              "w-[14px] h-[14px] md:w-[18px] md:h-[18px] text-white ",
              classNameType
            )}
          />
          <span
            className={cn(
              "inline-block text-p3 md:text-m3 pt-[2px] md:pt-0 text-white ",
              classNameType
            )}
          >{`${dateTime.date}, ${dateTime.time.split(" ")[0]} WIB`}</span>
        </div>
      )}
    </div>
  );
};

export default Countdown;
