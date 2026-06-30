"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui-legacy/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui-legacy/carousel";
import { TestimonyType } from "@/modules/legacy/EventModule/type";

type CarouselElementProps = {
  testimonyData: TestimonyType[];
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "?";

const ProfileAvatar = ({ item }: { item: TestimonyType }) => {
  if (item.profilePicture) {
    return (
      <img
        src={item.profilePicture}
        alt={`Foto ${item.name}`}
        className="w-full h-full object-cover"
      />
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-primary-500 text-white text-h3">
      {getInitials(item.name)}
    </div>
  );
};

const CarouselElement = ({ testimonyData }: CarouselElementProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = testimonyData.length;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    if (isPaused || total <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, total]);

  if (total === 0) {
    return null;
  }

  const getSlideStyles = (index: number) => {
    let distance = (index - activeIndex) % total;

    if (distance > total / 2) distance -= total;
    if (distance < -total / 2) distance += total;

    const isActive = distance === 0;
    const isPrev = distance === -1;
    const isNext = distance === 1;
    const isVisible = isActive || isPrev || isNext;

    const translateX = distance * 420;

    return {
      transform: `translateX(${translateX}px) scale(${isActive ? 1.1 : 0.9})`,
      zIndex: isActive ? 10 : 1,
      opacity: isVisible ? (isActive ? 1 : 0.6) : 0,
      filter: isActive ? "blur(0px)" : "blur(2px)",
      pointerEvents: isVisible ? "auto" : "none",
    };
  };

  return (
    <>
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="w-full max-lg:hidden flex items-center justify-center gap-44 py-24"
      >
        <button
          onClick={handlePrev}
          className="flex-shrink-0 left-10 z-50 w-12 h-12 rounded-full bg-gradient-card text-white flex items-center justify-center cursor-pointer"
        >
          <ChevronLeftIcon className="size-6" />
        </button>

        <div className="w-full max-w-4xl grid place-items-center perspective-1000">
          {testimonyData.map((item: TestimonyType, index) => {
            const styles = getSlideStyles(index);

            return (
              <div
                key={`${item.name}-${index}`}
                className="col-start-1 row-start-1 w-full max-w-sm space-x-16 transition-all duration-500 ease-in-out"
                style={{
                  transform: styles.transform,
                  zIndex: styles.zIndex,
                  opacity: styles.opacity,
                  filter: styles.filter,
                  pointerEvents:
                    styles.pointerEvents as React.CSSProperties["pointerEvents"],
                }}
              >
                <div className="rounded-2xl px-8 pt-2 pb-6 flex flex-col items-center text-center transition-all duration-500 relative bg-gradient-card-blue border-none shadow-glass backdrop-blur-md">
                  <div className="w-36 h-36 rounded-full absolute -top-24 border-8 overflow-hidden shadow-lg transition-all border-primary-400 duration-500">
                    <ProfileAvatar item={item} />
                  </div>

                  <div className="mt-12 space-y-3 text-white">
                    <h3 className="text-h2 text-white">{item.name}</h3>
                    <p className="text-m2">{item.jabatan}</p>
                    <p className="text-p5">{item.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          className="flex-shrink-0 right-10 z-50 w-12 h-12 rounded-full bg-gradient-card text-white flex items-center justify-center cursor-pointer"
        >
          <ChevronRightIcon className="size-6" />
        </button>
      </div>

      <div className="h-full lg:hidden">
        <Carousel
          opts={{ loop: total > 1, align: "center" }}
          className="max-md:w-11/16 max-w-xl mx-auto"
        >
          <CarouselContent className="items-stretch pt-20">
            {testimonyData.map((item: TestimonyType, index) => {
              return (
                <CarouselItem
                  key={`${item.name}-${index}`}
                  className="mx-10 flex h-full relative"
                >
                  <div className="p-1 h-full">
                    <Card className="w-full h-full flex-1 flex flex-col bg-gradient-card-blue border-none text-white shadow-glass backdrop-blur-md">
                      <CardContent className="flex items-center justify-center p-1">
                        <div className="w-30 h-30 rounded-full absolute -top-18 border-8 overflow-hidden shadow-lg transition-all border-primary-400 duration-500">
                          <ProfileAvatar item={item} />
                        </div>

                        <div className="mt-5 space-y-3 text-white">
                          <h3 className="text-h3 text-white">{item.name}</h3>
                          <p className="text-m3">{item.jabatan}</p>
                          <p className="text-p6 max-h-[150px] overflow-y-auto">
                            {item.desc}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
};

export default CarouselElement;