import Image from "next/image";
import { socmed } from "./const";
import Link from "next/link";
import AnimatedSptPattern from "@/design-system/components/atoms/AnimatedSptPattern";

const Footer = () => {
  return (
    <footer
      className="relative text-neutral-50 overflow-hidden font-jakarta flex border-t border-primary-300/40 backdrop-blur-sm justify-between items-center max-md:flex-col gap-5 px-20 py-8 max-lg:px-10 max-md:px-5"
      style={{ backgroundImage: 'var(--gradient-footer-ds)' }}
    >
      <div className="flex z-10 flex-col gap-4 max-md:items-center">
        <div className="relative z-10 w-[390px] max-md:w-[250px] h-[100px] max-md:h-[70px]">
          <Image
            src="/assets/logo-terus-terang.png"
            alt="Logo Footer"
            fill
            className="object-contain"
          />
        </div>
        <h2 className="text-h3 max-md:text-h5">
          Badan Eksekutif Mahasiswa UI 2026
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
          © Biro Multimedia BEM UI 2026. All Rights Reserved
        </p>
      </div>
      <div className="relative aspect-[276/76] w-50 max-md:w-24">
        <Image
          src="/mulmed-logo.webp"
          alt="Logo Footer"
          fill
          className="object-contain"
        />
      </div>

      <AnimatedSptPattern
        width={260}
        height={260}
        className="absolute z-0 right-8 top-1/2 -translate-y-1/2 opacity-40 pointer-events-none"
      />
    </footer>
  );
};

export default Footer;
