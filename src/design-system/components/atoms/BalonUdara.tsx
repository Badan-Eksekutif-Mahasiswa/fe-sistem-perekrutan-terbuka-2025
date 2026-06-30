import { cn } from '@/lib/utils';
import Image from 'next/image';

export interface BalonUdaraProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function BalonUdara({
  width = 160,
  height = 200,
  className,
}: BalonUdaraProps) {
  return (
    <div
      className={cn('relative pointer-events-none select-none', className)}
      style={{ width, height }}
      aria-hidden="true"
    >
      <Image
        src="/assets/balon-udara.png"
        alt="Balon Udara SPT BEM UI"
        fill
        className="object-contain"
      />
    </div>
  );
}
