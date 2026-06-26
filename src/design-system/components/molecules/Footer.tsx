import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

export interface SocialLink {
  name: string;
  href: string;
  icon: ReactNode;
}

export interface FooterProps {
  orgName?: string;
  tagline?: string;
  socialLinks?: SocialLink[];
  copyrightText?: string;
  className?: string;
}

export default function Footer({
  orgName = 'Badan Eksekutif Mahasiswa UI 2026',
  copyrightText = '© Biro Multimedia BEM UI 2026. All Rights Reserved',
  socialLinks = [],
  className,
}: FooterProps) {
  return (
    <footer
      className={cn(
        'relative text-white overflow-hidden font-jakarta border-t border-primary-300',
        'flex justify-between items-center max-md:flex-col gap-5 px-20 py-8 max-lg:px-10 max-md:px-5',
        className,
      )}
      style={{ backgroundImage: 'var(--gradient-footer-ds)' }}
    >
      {/* Left section */}
      <div className="flex z-10 flex-col gap-4 max-md:items-center">
        <div className="relative w-[300px] max-md:w-[200px] h-[80px] max-md:h-[55px]">
          <Image
            src="/logo-warnai.webp"
            alt="Logo BEM UI"
            fill
            className="object-contain"
          />
        </div>
        <p
          className="font-extrabold text-[48px] leading-none"
          style={{ color: '#5e121c', fontFamily: '"Roadster Script", cursive' }}
        >
          #TerusTerang
        </p>
        <p className="text-h5 font-extrabold">{orgName}</p>
        {socialLinks.length > 0 && (
          <div className="flex gap-6 items-center">
            {socialLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.name}
              >
                {item.icon}
              </Link>
            ))}
          </div>
        )}
        <p className="text-m4">{copyrightText}</p>
      </div>

      {/* Right section — MULMED badge */}
      <div className="relative z-10 aspect-[276/76] w-48 max-md:w-24">
        <Image
          src="/mulmed-logo.webp"
          alt="MULMED DEV TEAM"
          fill
          className="object-contain"
        />
      </div>

      {/* Decorative puzzle */}
      <div className="absolute z-0 right-60 max-md:-bottom-20 max-md:right-0 pointer-events-none opacity-30" aria-hidden="true">
        <Image src="/assets/puzzle.webp" alt="" width={300} height={600} className="rotate-45" />
      </div>
    </footer>
  );
}
