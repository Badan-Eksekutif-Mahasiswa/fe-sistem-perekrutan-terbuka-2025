"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.5; // Adjust speed (0.5 = slower parallax)
        parallaxRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background image full cover with parallax */}
      <div
        ref={parallaxRef}
        className="absolute -translate-y-100 inset-0 will-change-transform"
      >
        <Image
          src="/hero.webp"
          alt="Hero Background"
          fill
          className="object-cover max-lg:hidden"
          priority
        />
        <Image
          src="/hero-mobile.webp"
          alt="Hero Background"
          fill
          className="object-cover hidden max-lg:block"
          priority
        />
      </div>

      {/* Konten di atas gambar */}
      <div className="relative min-h-screen flex flex-col justify-center items-center z-20">
        <Button>Tes</Button>
      </div>

      <div className="relative min-h-screen bg-[var(--bg-main)] z-10">
        <div className="absolute top-0 -translate-y-[85%] w-full aspect-[5866/3110] pointer-events-none">
          <Image
            src="/hero-parallax.webp"
            alt="Hero Background"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
};
export default Hero;
