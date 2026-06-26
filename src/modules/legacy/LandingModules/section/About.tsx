import Image from "next/image";
import { Button } from "@/components/ui-legacy/button";
import { UserRound } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="flex flex-col text-white font-jakarta gap-4 px-12 max-lg:px-10 max-md:px-8">
      <h1 className="text-center text-h1">Tentang kami</h1>
      <div className="grid grid-cols-[2fr_1fr] max-lg:grid-cols-1 gap-4 max-lg:gap-8">
        <div className="flex max-lg:flex-col-reverse justify-between gap-8 items-center rounded-3xl border border-primary-300 w-full p-6 max-lg:p-4 bg-gradient-card">
          <div className="flex flex-col gap-1">
            <p className="text-h3 max-lg:text-center">
              Sistem Perekrutan Terbuka
            </p>
            <p className="text-p4 max-lg:text-justify">
              Lorem ipsum neque nunc bibendum ac viverra congue ultrices purus
              malesuada scelerisque pulvinar leo adipiscing netus pellentesque
              lacus eget lectus ac id amet velit ipsum vel tortor vulputate et
              ac ullamcorper sit consequat quis enim elementum massa elementum
              blandit aliquam malesuada libero enim placerat molestie eget
              cursus ipsum metus porta vestibulum vitae nunc quam ultricies ut
              sapien viverra.
            </p>
          </div>
          <div className="relative aspect-[120/191] w-25 shrink-0">
            <Image src="/spt.png" alt="SPT" fill className="object-contain" />
          </div>
        </div>
        <div className="flex flex-col h-full gap-4 justify-center items-center rounded-3xl border border-primary-300 w-full p-6 max-lg:p-4 bg-gradient-card">
          <div className="relative aspect-[223/64] w-56 shrink-0">
            <Image
              src="/mulmed-logo.webp"
              alt="mulmed"
              fill
              className="object-contain"
            />
          </div>
          <Button className="w-[60%]" variant={"secondary"}>
            <UserRound />
            Meet the team
          </Button>
        </div>
      </div>
    </section>
  );
};
export default About;
