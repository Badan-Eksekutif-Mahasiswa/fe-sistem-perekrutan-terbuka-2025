"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Info, UserPen } from "lucide-react";
import OnGoing from "./OnGoing";
import { Event } from "@/types/event";
import Awan from "@/design-system/components/atoms/Awan";
import Button from "@/design-system/components/atoms/Button";

type HeroProps = {
  events: Event[];
  loading: boolean;
};

const Hero = ({ events, loading }: HeroProps) => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.5;
        parallaxRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ background: "linear-gradient(90deg, #0B102D 0%, #9CB3D3 50%, #0B102D 100%)" }}
    >
      {/* Background image full cover with parallax */}
      <div
        ref={parallaxRef}
        className="absolute inset-x-0 top-0 h-screen will-change-transform"
      >
        <Image
          src="/assets/hero.png"
          alt="Hero Background"
          fill
          className="object-cover object-top xl:object-contain"
          priority
        />
      </div>

      {/* Awan decorative overlays */}
      <Awan variant="1" className="absolute top-6 left-0 z-10 opacity-90 max-xl:hidden" width={480} height={140} />
      <Awan variant="2" className="absolute top-16 right-0 z-10 opacity-80 max-xl:hidden" width={320} height={160} />

      {/* Konten di atas gambar */}
      <div className="relative text-white min-h-screen flex flex-col gap-4 text-center justify-center items-center z-20">
        <div className="relative aspect-square w-30">
          <Image
            src="/assets/logo-bem-ui.png"
            alt="logo"
            fill
            className="object-contain"
          />
        </div>
        <h1
          className="text-4xl font-bold"
          style={{ textShadow: "0 0 55px #324173, 0 0 30px #324173, 0 0 12px #1d2642" }}
        >
          Sistem Perekrutan Terbuka
        </h1>
        <p className="text-m3" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8), 0 -1px 4px rgba(0,0,0,0.8)" }}>by BEM UI 2026</p>
        <div className="relative aspect-auto w-70 h-10">
          <Image
            src="/assets/terus-terang.png"
            alt="logo"
            fill
            className="object-contain"
          />
        </div>
        <div className="flex gap-2">
          <Button href="/event" variant="primary" leftIcon={<UserPen size={16} />}>
            Mulai Daftar
          </Button>
          <Button href="#about" variant="secondary" leftIcon={<Info size={16} />}>
            Tentang SPT
          </Button>
        </div>
      </div>

      <div className="relative min-h-screen bg-[var(--bg-main)] z-10">
        {/* Parallax effect */}
        <div className="absolute top-0 z-1 -translate-y-[85%] w-full aspect-[5866/3110] pointer-events-none">
          <Image
            src="/assets/hero-parallax-new.png"
            alt="Hero Background"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* OnGoing Section */}
        <div className="relative z-10">
          <OnGoing events={events} loading={loading} />
        </div>
      </div>
    </section>
  );
};
export default Hero;
