"use client";

import { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui-legacy/carousel";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AirBalloon } from "../../../../../public/assets-legacy/svgs/AirBaloon";

const Dokumentasi = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [slidesToScroll, setSlidesToScroll] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlidesToScroll(3);
      } else if (window.innerWidth >= 768) {
        setSlidesToScroll(2);
      } else {
        setSlidesToScroll(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    setScrollSnaps(api.scrollSnapList());
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
    api.reInit();
  }, [api, slidesToScroll]);

  return (
    <section className=" flex flex-col justify-center relative items-center gap-10 px-6 md:px-20 py-10 w-full">
      <img
        src="/assets-legacy/clouds.webp"
        alt="Cloud Image"
        className="max-md:absolute top-0 -right-30"
      />
      <AirBalloon className="absolute max-lg:hidden size-32 left-80 top-0  animate-float" />
      <AirBalloon className="absolute max-sm:hidden size-32 right-80 top-0 animate-float" />

      <h1 className="text-4xl font-bold text-white text-center">Dokumentasi</h1>

      <div className="w-full mx-auto px-4 md:px-8 relative">
        <Carousel
          setApi={setApi}
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          opts={{
            align: "start",
            loop: true,
            slidesToScroll: slidesToScroll,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {Array.from({ length: 15 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <div className="w-full aspect-[16/10] relative border-[8px] md:border-[10px] border-primary-300 rounded-3xl overflow-hidden bg-white/5">
                  <Image
                    src={`/placeholder-1.webp`}
                    alt={`Dokumentasi ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12" />
          <CarouselNext className="hidden md:flex -right-12" />
        </Carousel>

        <div className="flex justify-center gap-2 mt-8">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                current === index
                  ? "bg-primary-300 w-8"
                  : "bg-primary-300/30 hover:bg-primary-300/50"
              )}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dokumentasi;
