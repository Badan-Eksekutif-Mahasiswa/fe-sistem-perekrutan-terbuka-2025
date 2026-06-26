import { cn } from '@/lib/utils';
import Image from 'next/image';

export interface GedungRektoratUIProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function GedungRektoratUI({
  width = 400,
  height = 300,
  className,
}: GedungRektoratUIProps) {
  return (
    <div
      className={cn('relative', className)}
      style={{ width, height }}
    >
      <Image
        src="/hero.webp"
        alt="Gedung Rektorat Universitas Indonesia"
        fill
        className="object-contain"
      />
    </div>
  );
}
