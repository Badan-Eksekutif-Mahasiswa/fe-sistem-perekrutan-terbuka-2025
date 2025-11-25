"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Info, UserPen } from "lucide-react";
import OnGoing from "./OnGoing";

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
        className="absolute -translate-y-100 max-lg:-translate-y-200 inset-0 will-change-transform"
      >
        <Image
          src="/hero.webp"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        {/* <Image
          src="/hero-mobile.webp"
          alt="Hero Background"
          fill
          className="object-cover hidden max-lg:block"
          priority
        /> */}
      </div>

      {/* Konten di atas gambar */}
      <div className="relative text-white min-h-screen flex flex-col gap-4 text-center justify-center items-center z-20">
        <div className="relative aspect-square w-30">
          <Image
            src="/logo-clean.webp"
            alt="logo"
            fill
            className="object-contain"
          />
        </div>
        <h1 className="text-4xl font-bold">Sistem Perekrutan Terbuka</h1>
        <p className="text-m3">by BEM UI 2025</p>
        <div className="relative aspect-auto w-70 h-10">
          <Image
            src="/warnai-angan.png"
            alt="logo"
            fill
            className="object-contain"
          />
        </div>
        <div className="flex gap-2">
          <Button>
            <UserPen />
            Mulai Daftar
          </Button>
          <Button variant={"secondary"}>
            <Info />
            Tentang SPT
          </Button>
        </div>
      </div>

      <div className="relative min-h-screen bg-[var(--bg-main)] z-10">
        {/* Parallax effect */}
        <div className="absolute top-0 z-1 -translate-y-[85%] w-full aspect-[5866/3110] pointer-events-none">
          <Image
            src="/hero-parallax.webp"
            alt="Hero Background"
            fill
            className="object-contain"
            priority
          />
        </div>
        {/* End parallax Effect */}

        {/* About Section */}
        <div className="relative z-10">
          <OnGoing />
        </div>
      </div>
    </section>
  );
};
export default Hero;
