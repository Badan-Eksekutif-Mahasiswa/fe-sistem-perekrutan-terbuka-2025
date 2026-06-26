'use client';

import { cn } from '@/lib/utils';
import GlassCard from '../atoms/GlassCard';
import Checkbox from '../atoms/Checkbox';
import Image from 'next/image';

export interface FilterSection {
  title: string;
  options: string[];
}

export interface FilterCardProps {
  sections?: FilterSection[];
  values?: Record<string, boolean>;
  onChange?: (values: Record<string, boolean>) => void;
  className?: string;
}

const defaultSections: FilterSection[] = [
  { title: 'Tingkat',     options: ['Universitas', 'Pra-Kampus'] },
  { title: 'Tipe',        options: ['Kepanitiaan', 'Organisasi', 'UKM'] },
  { title: 'Status',      options: ['Umum', 'Tertutup', 'Khusus'] },
];

export default function FilterCard({
  sections = defaultSections,
  values = {},
  onChange,
  className,
}: FilterCardProps) {
  const toggle = (key: string) => {
    onChange?.({ ...values, [key]: !values[key] });
  };

  return (
    <GlassCard padding="none" className={cn('relative overflow-hidden w-full lg:max-w-sm', className)}>
      <div className="relative z-10 p-6 flex flex-col gap-5">
        <h2 className="text-h2 text-white font-jakarta font-extrabold max-md:text-center">
          Filter
        </h2>
        <div className="flex lg:flex-col flex-wrap justify-between gap-4">
          {sections.map((section) => (
            <div key={section.title} className="space-y-2">
              <h4 className="text-h4 text-white font-jakarta font-extrabold">
                {section.title}
              </h4>
              <div className="space-y-3 p-2">
                {section.options.map((option) => (
                  <Checkbox
                    key={option}
                    label={option}
                    checked={!!values[option]}
                    onChange={() => toggle(option)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Decorative background */}
      <div className="absolute z-0 inset-0 flex justify-end -bottom-96 -right-30 lg:-right-60 items-center pointer-events-none" aria-hidden="true">
        <Image
          src="/assets/puzzle.webp"
          alt=""
          width={800}
          height={700}
          className="opacity-40 rotate-45"
        />
      </div>
    </GlassCard>
  );
}
