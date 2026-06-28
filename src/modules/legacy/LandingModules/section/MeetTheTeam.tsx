"use client";
import Button from "@/design-system/components/atoms/Button";
import { LucideLinkedin, LucideInstagram, UserRound, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import BalonUdara from "@/design-system/components/atoms/BalonUdara";

type TeamMember = {
  name: string;
  position: string;
  description: string;
  photo: string;
  linkedin: string;
  instagram: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "Nama Anggota",
    position: "Jabatan",
    description: "Deskripsi singkat mengenai anggota tim ini dan perannya di organisasi.",
    photo: "",
    linkedin: "#",
    instagram: "#",
  },
  {
    name: "Syahid Arkan",
    position: "Staf Developer BEM UI 2026",
    description: "UI/UX Lead & Fullstack Developer. Bertanggung jawab atas DS, Prototype, dan implementasi frontend",
    photo: "/meet-the-team/acan.jpg",
    linkedin: "#",
    instagram: "#",
  },
  {
    name: "Nama Anggota",
    position: "Jabatan",
    description: "Deskripsi singkat mengenai anggota tim ini dan perannya di organisasi.",
    photo: "",
    linkedin: "#",
    instagram: "#",
  },
  {
    name: "Nama Anggota",
    position: "Jabatan",
    description: "Deskripsi singkat mengenai anggota tim ini dan perannya di organisasi.",
    photo: "",
    linkedin: "#",
    instagram: "#",
  },
  {
    name: "Nama Anggota",
    position: "Jabatan",
    description: "Deskripsi singkat mengenai anggota tim ini dan perannya di organisasi.",
    photo: "",
    linkedin: "#",
    instagram: "#",
  },
  {
    name: "Nama Anggota",
    position: "Jabatan",
    description: "Deskripsi singkat mengenai anggota tim ini dan perannya di organisasi.",
    photo: "",
    linkedin: "#",
    instagram: "#",
  },
];

const MeetTheTeam = () => {
  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [autoplay.current]
  );

  const tweenScale = useCallback(() => {
    if (!emblaApi) return;
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const snapList = emblaApi.scrollSnapList();
    const slideNodes = emblaApi.slideNodes();

    snapList.forEach((snap, index) => {
      let diffToTarget = snap - scrollProgress;

      // Handle loop wrap-around
      if (engine.options.loop) {
        [-1, 0, 1].forEach((loopOffset) => {
          const adjusted = diffToTarget + loopOffset;
          if (Math.abs(adjusted) < Math.abs(diffToTarget)) {
            diffToTarget = adjusted;
          }
        });
      }

      const absDiff = Math.abs(diffToTarget);
      const scale = Math.max(1 - absDiff * 0.22, 0.78);
      const opacity = Math.max(1 - absDiff * 0.5, 0.45);

      const inner = slideNodes[index]?.querySelector<HTMLElement>("[data-card]");
      if (inner) {
        inner.style.transform = `scale(${scale})`;
        inner.style.opacity = String(opacity);
      }
    });
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    tweenScale();
    emblaApi.on("scroll", tweenScale);
    emblaApi.on("reInit", tweenScale);
    return () => {
      emblaApi.off("scroll", tweenScale);
      emblaApi.off("reInit", tweenScale);
    };
  }, [emblaApi, tweenScale]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="relative overflow-hidden flex flex-col gap-8 font-jakarta text-white px-12 max-lg:px-10 max-md:px-8">
      <BalonUdara width={188} height={277} className="absolute -z-10 -left-12 top-1/3 opacity-30 max-lg:hidden animate-float [animation-delay:0.8s]" />
      <h2 className="text-h2 text-center">Meet the Team</h2>

      <div className="relative">
        {/* Viewport */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="shrink-0 pl-4 basis-83.75"
              >
                {/* data-card is the element that gets scaled */}
                <div
                  data-card
                  className="transition-[transform,opacity] duration-300 ease-out will-change-transform"
                >
                  <TeamCard member={member} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nav buttons */}
        <button
          onClick={scrollPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-primary-300/20 border border-primary-300 text-white hover:bg-primary-300/40 transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-primary-300/20 border border-primary-300 text-white hover:bg-primary-300/40 transition-colors"
          aria-label="Next"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default MeetTheTeam;

const TeamCard = ({ member }: { member: TeamMember }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Main glass card */}
      <div
        className="w-full h-auto rounded-xl bg-gradient-card-blue backdrop-blur-sm flex flex-col items-center p-6 gap-5 text-center text-white"
        style={{ boxShadow: "var(--shadow-glass)" }}
      >
        {/* Photo — 1:1 square */}
        <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-primary-300/20 shrink-0 flex items-center justify-center">
          {member.photo && !imgError ? (
            <Image
              src={member.photo}
              alt={member.name}
              fill
              unoptimized
              className="object-cover object-[50%_15%]"
              onError={() => setImgError(true)}
            />
          ) : (
            <UserRound size={56} className="text-primary-300/60" />
          )}
        </div>

        {/* Text info */}
        <div className="flex flex-col items-center gap-1 w-full">
          <p className="text-h4">{member.name}</p>
          <p className="text-m4 text-primary-100">{member.position}</p>
          <p className="text-p5 text-neutral-200 line-clamp-3 mt-1">
            {member.description}
          </p>
        </div>
      </div>

      {/* Social buttons */}
      <div className="flex gap-3 w-full">
        <Button
          variant="secondary"
          leftIcon={<LucideLinkedin size={14} />}
          href={member.linkedin}
          className="flex-1 justify-center"
        >
          LinkedIn
        </Button>
        <Button
          variant="secondary"
          leftIcon={<LucideInstagram size={14} />}
          href={member.instagram}
          className="flex-1 justify-center"
        >
          Instagram
        </Button>
      </div>
    </div>
  );
};
