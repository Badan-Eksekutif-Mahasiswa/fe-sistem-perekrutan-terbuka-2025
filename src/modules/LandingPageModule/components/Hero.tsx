"use client";

import "swiper/css";
import Image from "next/image";
import { Button } from "@/components/ui/button";
const images1: { src: string; alt: string }[] = [
  {
    src: "/placeholder.jpg",
    alt: "logo",
  },
  {
    src: "/placeholder.jpg",
    alt: "logo",
  },
];

const images2: { src: string; alt: string }[] = [
  {
    src: "/placeholder.jpg",
    alt: "logo",
  },
  {
    src: "/placeholder.jpg",
    alt: "logo",
  },
];

const Hero = () => {
  const marqueeUpStyle: React.CSSProperties = {
    display: "flex ",
    animation: "marqueeUp 5s linear infinite",
  };

  const marqueeDownStyle: React.CSSProperties = {
    display: "flex ",
    animation: "marqueeDown 5s linear infinite",
  };

  const keyframes = `
    @keyframes marqueeUp {
      0% { transform: translateY(0%); }
      100% { transform: translateY(-50%); }
    }

    @keyframes marqueeDown {
      0% { transform: translateY(-50%); }
      100% { transform: translateY(-0%); }
    }
  `;

  return (
    <>
      <div className="flex max-lg:flex-col lg:mx-20 min-h-screen max-lg:mt-24 items-center overflow-hidden">
        <div className="absolute w-full max-w-5xl h-[64rem] -left-72 -top-80 -z-10">
          <Image
            src={"/assets/asset-1.svg"}
            alt="asset"
            fill
            className="object-contain"
          />
        </div>

        <div className="flex flex-col w-screen h-fit max-lg:justify-center max-lg:text-center ">
          <div>
            <p className="text-primary-400 max-md:text-3xl md:mb-6 font-bold text-5xl">
              Berikan Kontribusimu <br /> untuk UI dan Indonesia!{" "}
            </p>
            <p className="text-xl max-md:text-sm ">
              Daftarkan dirimu untuk menjadi bagian dari <br /> kepanitiaan di
              Universitas Indonesia.
            </p>
          </div>

          <div className="mt-8 sm:space-x-4 max-sm:flex max-sm:flex-col max-sm:px-8 gap-2">
            <Button variant={"secondary"}>Mulai </Button>
            <Button variant={"tertiary"}>Perekrutan Terbuka</Button>
          </div>
        </div>

        <div className="flex flex-row items-center gap-8">
          <div className="space-y-5">
            {images1.map((img, index) => (
              <div
                key={index}
                className="relative max-md:w-32 max-md:h-48  w-72 h-64 rounded-lg overflow-hidden"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  quality={100}
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="space-y-5 ">
            <div className="py-8" />
            {images2.map((img, index) => (
              <div
                key={index}
                className="relative max-md:w-32 max-md:h-48  w-72 h-64 rounded-lg overflow-hidden"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  quality={100}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
