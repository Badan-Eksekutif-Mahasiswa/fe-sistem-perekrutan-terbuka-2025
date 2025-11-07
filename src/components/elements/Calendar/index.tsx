"use client";

import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { DateRange, CalendarProps } from "./interface";

const Calendar: React.FC<CalendarProps> = ({
  availableRanges = [],
  onRangeSelect,
  selectedRange,
  className,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Hard-coded available ranges as example
  const defaultAvailableRanges: DateRange[] = [
    {
      start: new Date(2025, 6, 6),
      end: new Date(2025, 6, 13),
      label: "Summer Workshop",
      available: true,
    },
    {
      start: new Date(2025, 6, 18),
      end: new Date(2025, 6, 26),
      label: "Summer Workshop",
      available: true,
    },
  ];

  const ranges =
    availableRanges.length > 0 ? availableRanges : defaultAvailableRanges;

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  // Calendar calculations
  const monthData = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

    const days = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return {
      year,
      month,
      firstDayOfMonth,
      lastDayOfMonth,
      days,
    };
  }, [currentDate]);

  // Check if a date is within any available range
  const getDateStatus = (date: Date) => {
    const dateOnly = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    for (const range of ranges) {
      const rangeStart = new Date(
        range.start.getFullYear(),
        range.start.getMonth(),
        range.start.getDate()
      );
      const rangeEnd = new Date(
        range.end.getFullYear(),
        range.end.getMonth(),
        range.end.getDate()
      );

      if (dateOnly >= rangeStart && dateOnly <= rangeEnd) {
        return {
          inRange: true,
          range,
          isStart: dateOnly.getTime() === rangeStart.getTime(),
          isEnd: dateOnly.getTime() === rangeEnd.getTime(),
        };
      }
    }

    return { inRange: false, range: null, isStart: false, isEnd: false };
  };

  // Check if a date is selected
  const isSelected = (date: Date) => {
    if (!selectedRange) return false;
    const dateOnly = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const selectedStart = new Date(
      selectedRange.start.getFullYear(),
      selectedRange.start.getMonth(),
      selectedRange.start.getDate()
    );
    const selectedEnd = new Date(
      selectedRange.end.getFullYear(),
      selectedRange.end.getMonth(),
      selectedRange.end.getDate()
    );

    return dateOnly >= selectedStart && dateOnly <= selectedEnd;
  };

  // Handle date click
  const handleDateClick = (date: Date) => {
    const status = getDateStatus(date);
    if (status.inRange && status.range?.available) {
      onRangeSelect?.(status.range);
    }
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div className="w-full rounded-xl border border-primary-300 bg-linear-to-r from-primary-200 to-primary-400 flex flex-col gap-2 max-lg:grid max-lg:grid-cols-[2fr_1fr] max-md:flex">
      <div className={cn("w-full mx-auto px-6 pt-6", className)}>
        {/* Header */}
        <div className="rounded-xl w-full cursor-default text-m3 text-white font-jakarta py-2 px-2 flex items-center justify-between">
          <Button className="w-9 h-9 p-2" onClick={goToPreviousMonth}>
            <ChevronLeft />
          </Button>
          {monthNames[monthData.month]} {monthData.year}
          <Button className="w-9 h-9 p-2" onClick={goToNextMonth}>
            <ChevronRight />
          </Button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7">
          {dayNames.map((day) => (
            <div
              key={day}
              className={`text-center font-jakarta text-m4 ${
                day === "Su" ? "text-red-300 " : "text-neutral-100"
              }  py-2`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-y-2">
          {monthData.days.map((date, index) => {
            const isCurrentMonth = date.getMonth() === monthData.month;
            const status = getDateStatus(date);
            const selected = isSelected(date);
            const isToday = new Date().toDateString() === date.toDateString();

            return (
              <button
                key={index}
                onClick={() => handleDateClick(date)}
                disabled={!status.inRange || !status.range?.available}
                className={cn(
                  "relative text-center h-8 w-full font-jakarta text-m4 transition-all duration-200",
                  {
                    // Current month styling
                    "text-white": isCurrentMonth,
                    "text-neutral-600": !isCurrentMonth,

                    // Today styling
                    "after:content-[''] after:z-0 after:absolute after:w-full after:bg-linear-to-r after:from-secondary-200 after:to-secondary-400 after:h-full after:rounded-sm after:top-0 after:left-0 after:border-1 after:border-primary-200":
                      isToday && !selected,

                    // Selected range styling - connected without rounded corners
                    " text-white": selected,

                    // Only round the start and end dates of each range
                    "rounded-l-sm border-l-2 border-y-2 border-primary-200":
                      status.isStart && status.inRange,
                    "rounded-r-sm border-r-2  border-y-2 border-primary-200  ":
                      status.isEnd && status.inRange,
                    "border-y-2 border-primary-200":
                      !status.isStart && status.inRange && !status.isEnd, // Single day range

                    // Disabled styling
                    "": !status.inRange || !status.range?.available,
                    "cursor-pointer": status.inRange && status.range?.available,
                  }
                )}
              >
                <span className="relative z-1">{date.getDate()}</span>
              </button>
            );
          })}
        </div>
        <div className="w-full border-b mt-3" />
      </div>

      {/* Schedule */}
      <div className="w-full justify-center font-jakarta text-p6 mx-auto flex flex-col gap-2 text-neutral-100 shadow-lg px-6 py-2 pb-6">
        {ranges.map((range, index) => (
          <div key={index} className="flex ">
            <p className=" bg-clip-text font-bold bg-gradient-kiwi">
              {range.start.getDate() === range.end.getDate()
                ? `${range.start.getDate()} `
                : `${range.start.getDate()} - ${range.end.getDate()} `}
            </p>
            <p>: {range.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
