import { cn } from '@/lib/utils';
import Image from 'next/image';

export interface UnionProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function Union({ width = 120, height = 120, className }: UnionProps) {
  return (
    <div
      className={cn('relative pointer-events-none select-none', className)}
      style={{ width, height }}
      aria-hidden="true"
    >
      <Image
        src="/logo-UI.png"
        alt=""
        fill
        className="object-contain opacity-60"
        style={{ filter: 'brightness(0) saturate(100%) invert(70%) sepia(30%) saturate(300%) hue-rotate(290deg)' }}
      />
    </div>
  );
}
