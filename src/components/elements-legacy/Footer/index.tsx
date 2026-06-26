import Image from "next/legacy/image";
import { socmed } from "./const";
import Link from "next/link";
import AnimatedPuzzle from "../AnimatedPuzzle";

const Footer = () => {
  return (
    <footer className="relative text-neutral-50 overflow-hidden font-jakarta bg-gradient-card flex border-t border-primary-300 justify-between items-center max-md:flex-col gap-5 px-20 py-8 max-lg:px-10 max-md:px-5">
      <div className="flex z-10 flex-col gap-4 max-md:items-center">
        <div className="relative z-10 w-[390px] max-md:w-[250px] h-[100px] max-md:h-[70px]">
          <Image
            src="/logo-warnai.webp"
            alt="Logo Footer"
            layout="fill"
            className="object-contain"
          />
        </div>
        <h2 className="text-h3 max-md:text-h5">
          Badan Eksekutif Mahasiswa UI 2025
        </h2>
        <div className="flex z-10 gap-6 max-md:gap-4 items-center">
          {socmed.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <item.icon className="h-6 w-6" />
            </Link>
          ))}
        </div>
        <p className="text-m4 z-10">
          © Biro Multimedia BEM UI 2025. All Rights Reserved
        </p>
      </div>
      <div className="relative aspect-[276/76] w-50 max-md:w-24">
        <Image
          src="/mulmed-logo.webp"
          alt="Logo Footer"
          layout="fill"
          objectFit="contain"
        />
      </div>

      <div className="absolute z-0 right-60 max-md:-bottom-20 max-md:right-0">
        <AnimatedPuzzle
          width={300}
          height={600}
          className="opacity-40 rotate-45"
        />
      </div>
    </footer>
  );
};

export default Footer;
