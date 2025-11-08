import Image from "next/image";
import { socmed } from "./const";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="font-jakarta bg-gradient-card flex border-t border-primary-300 justify-between items-center max-md:flex-col gap-5 px-20 py-8 max-lg:px-10 max-md:px-5">
      <div className="flex flex-col gap-4 max-md:items-center">
        <div className="relative w-[390px] max-md:w-[250px] h-[100px] max-md:h-[70px]">
          <Image
            src="/logo-warnai.webp"
            alt="Logo Footer"
            fill
            className="object-contain"
          />
        </div>
        <h2 className="text-h3 max-md:text-h5">
          Badan Eksekutif Mahasiswa UI 2025
        </h2>
        <div className="flex gap-6 max-md:gap-4 items-center">
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
        <p className="text-m4">
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
    </footer>
  );
};

export default Footer;
