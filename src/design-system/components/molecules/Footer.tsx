'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Youtube, Linkedin, Globe, Twitter, MessageCircle, Instagram } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface SocialLink {
  name: string;
  href: string;
  Icon: LucideIcon;
}

export interface FooterProps {
  orgName?: string;
  copyrightText?: string;
  socialLinks?: SocialLink[];
  className?: string;
}

const defaultSocialLinks: SocialLink[] = [
  { name: 'YouTube',    href: '#', Icon: Youtube },
  { name: 'LinkedIn',   href: '#', Icon: Linkedin },
  { name: 'Website',    href: '#', Icon: Globe },
  { name: 'X',         href: '#', Icon: Twitter },
  { name: 'Line',      href: '#', Icon: MessageCircle },
  { name: 'Instagram', href: '#', Icon: Instagram },
];

export default function Footer({
  orgName       = 'Badan Eksekutif Mahasiswa UI 2026',
  copyrightText = '© Developer Biro Multimedia BEM UI 2026. All Rights Reserved',
  socialLinks   = defaultSocialLinks,
  className,
}: FooterProps) {
  return (
    <footer
      className={cn(
        'relative text-white overflow-hidden font-jakarta border-t border-primary-300/40',
        'flex justify-between items-center max-md:flex-col gap-6 px-20 py-8 max-lg:px-10 max-md:px-6',
        className,
      )}
      style={{ backgroundImage: 'var(--gradient-footer-ds)' }}
    >
      {/* ── Left: identity + social ─────────────────────────────── */}
      <div className="flex z-10 flex-col gap-3 max-md:items-center">

        {/* BEM UI logo + #TerusTerang tagline */}
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 shrink-0">
            <Image
              src="/assets/logo-bem-ui.png"
              alt="Logo BEM UI"
              fill
              className="object-contain"
            />
          </div>
          <span
            className="leading-none select-none"
            style={{
              fontFamily: '"Roadster Script", cursive',
              fontSize: '2.5rem',
              color: '#5e121c',
            }}
          >
            #TerusTerang
          </span>
        </div>

        {/* Org name */}
        <p className="text-h5 font-extrabold">{orgName}</p>

        {/* Social media icons */}
        <div className="flex gap-2 items-center flex-wrap max-md:justify-center">
          {socialLinks.map(({ name, href, Icon }) => (
            <Link
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="w-8 h-8 flex items-center justify-center rounded border border-white/20 bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Icon size={16} className="text-white" />
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-m4 text-white/50">{copyrightText}</p>
      </div>

      {/* ── Right: MULMED badge ──────────────────────────────────── */}
      <div className="relative z-10 aspect-[276/76] w-44 max-md:w-28 shrink-0">
        <Image
          src="/mulmed-logo.webp"
          alt="MULMED DEV TEAM"
          fill
          className="object-contain"
        />
      </div>

      {/* ── Decorative SPT pattern ───────────────────────────────── */}
      <div
        className="absolute z-0 right-0 top-0 h-full w-72 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.12 }}
      >
        <Image
          src="/assets/spt-pattern.png"
          alt=""
          fill
          className="object-cover object-right"
        />
      </div>
    </footer>
  );
}
