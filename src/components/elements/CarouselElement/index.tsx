"use client";
import React, { useState, useEffect } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TestimonyType } from "@/modules/EventModule/type";
import { testimoniData } from "@/modules/EventModule/const";
import useEmblaCarousel from "embla-carousel-react";

type CarouselElementProps = {
  testimonyData: TestimonyType[];
};

const CarouselElement = ({ testimonyData }: CarouselElementProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonyData.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonyData.length) % testimonyData.length
    );
  };

  const getSlideStyles = (index: number) => {
    const total = testimoniData.length;

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
      <div className="w-full max-lg:hidden flex items-center justify-center gap-44 py-24">
        <button
          onClick={handlePrev}
          className="flex-shrink-0 left-10 z-50 w-12 h-12 rounded-full bg-gradient-card text-white flex items-center justify-center cursor-pointer"
        >
          <ChevronLeftIcon className="size-6" />
        </button>

        <div className="w-full max-w-4xl  grid place-items-center perspective-1000">
          {testimonyData.map((item: TestimonyType, index) => {
            const styles: any = getSlideStyles(index);

            return (
              <div
                key={index}
                className="col-start-1 row-start-1 w-full max-w-sm space-x-16 transition-all duration-500 ease-in-out"
                style={{
                  transform: styles.transform,
                  zIndex: styles.zIndex,
                  opacity: styles.opacity,
                  filter: styles.filter,
                  pointerEvents: styles.pointerEvents,
                }}
              >
                <div
                  className={`rounded-2xl px-8 pt-2 pb-6 flex flex-col items-center text-center transition-all duration-500 relative
                  ${
                    styles.zIndex === 10
                      ? "bg-gradient-card shadow-2xl"
                      : "bg-gradient-card-blur"
                  }
                `}
                >
                  <div className="w-36 h-36 rounded-full absolute -top-24 border-8 overflow-hidden shadow-lg transition-all border-primary-400 duration-500">
                    <img
                      src={`https://picsum.photos/seed/${index + 1}/200/200`}
                      alt="profile picture"
                      className="w-full h-full object-cover"
                    />
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

      {/* Mobile Carousel */}
      <div className="h-full lg:hidden">
        <Carousel
          opts={{ loop: true, align: "center" }}
          className="max-md:w-11/16 max-w-sm mx-auto "
        >
          <CarouselContent className="items-stretch">
            {testimoniData.map((item: TestimonyType, index) => {
              return (
                <CarouselItem key={index} className="mx-10 flex h-full">
                  <div className="p-1 h-full">
                    <Card className="w-full h-full flex-1 flex flex-col  ">
                      <CardContent className="flex items-center justify-center p-1">
                        <div className="w-30 h-30 rounded-full absolute -top-18 border-8 overflow-hidden shadow-lg transition-all border-primary-400 duration-500">
                          <img
                            src={`https://picsum.photos/seed/${
                              index + 1
                            }/200/200`}
                            alt="profile picture"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className=" mt-5  space-y-3 text-white">
                          <h3 className="text-h3 text-white">{item.name}</h3>
                          <p className="text-m3">{item.jabatan}</p>
                          <p className="text-p6 max-h-[150px] overflow-y-auto ">
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
