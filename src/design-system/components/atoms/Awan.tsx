import { cn } from '@/lib/utils';
import Image from 'next/image';

export type AwanVariant = '1' | '2';

export interface AwanProps {
  variant?: AwanVariant;
  width?: number;
  height?: number;
  opacity?: number;
  className?: string;
}

const AWAN_SRC: Record<AwanVariant, string> = {
  '1': '/assets/awan-1.png',
  '2': '/assets/awan-2.png',
};

const AWAN_DEFAULT_SIZE: Record<AwanVariant, { w: number; h: number }> = {
  '1': { w: 480, h: 140 },
  '2': { w: 320, h: 160 },
};

export default function Awan({
  variant = '1',
  width,
  height,
  opacity = 1,
  className,
}: AwanProps) {
  const w = width  ?? AWAN_DEFAULT_SIZE[variant].w;
  const h = height ?? AWAN_DEFAULT_SIZE[variant].h;

  return (
    <div
      className={cn('relative pointer-events-none select-none', className)}
      style={{ width: w, height: h, opacity }}
      aria-hidden="true"
    >
      <Image
        src={AWAN_SRC[variant]}
        alt=""
        fill
        className="object-contain"
      />
    </div>
  );
}
