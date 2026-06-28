import Image from "next/image";
import Button from "@/design-system/components/atoms/Button";
import { UserRound } from "lucide-react";
import BalonUdara from "@/design-system/components/atoms/BalonUdara";

const About = () => {
  return (
    <section id="about" className="relative overflow-hidden flex flex-col text-white font-jakarta gap-4 px-12 max-lg:px-10 max-md:px-8">
      <BalonUdara width={177} height={261} className="absolute -z-10 -left-10 top-4 opacity-70 max-lg:hidden animate-float" />
      <BalonUdara width={118} height={174} className="absolute -z-10 -right-6 bottom-4 opacity-70 max-lg:hidden animate-float [animation-delay:1.5s]" />
      <h1 className="text-center text-h1">Tentang kami</h1>
      <div className="grid grid-cols-[2fr_1fr] max-lg:grid-cols-1 gap-4 max-lg:gap-8">
        <div className="flex max-lg:flex-col-reverse justify-between gap-8 items-center rounded-3xl border border-primary-300 w-full p-6 max-lg:p-4 bg-gradient-card-blue backdrop-blur-sm" style={{ boxShadow: 'var(--shadow-glass)' }}>
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
        <div className="flex flex-col h-full gap-4 justify-center items-center rounded-3xl border border-primary-300 w-full p-6 max-lg:p-4 bg-gradient-card-blue backdrop-blur-sm" style={{ boxShadow: 'var(--shadow-glass)' }}>
          <div className="relative aspect-[223/64] w-56 shrink-0">
            <Image
              src="/mulmed-logo.webp"
              alt="mulmed"
              fill
              className="object-contain"
            />
          </div>
          <Button variant="secondary" leftIcon={<UserRound size={16} />} className="w-[60%]">
            Meet the team
          </Button>
        </div>
      </div>
    </section>
  );
};
export default About;
