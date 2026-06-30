import { cn } from '@/lib/utils';
import Image from 'next/image';

export type LogoBackgroundVariant = 'single' | 'pattern';

export interface LogoBackgroundProps {
  variant?: LogoBackgroundVariant;
  opacity?: number;
  className?: string;
  width?: number;
  height?: number;
}

export default function LogoBackground({
  variant = 'single',
  opacity = 0.4,
  className,
  width = 300,
  height = 300,
}: LogoBackgroundProps) {
  return (
    <div
      className={cn('pointer-events-none select-none', className)}
      style={{ opacity, width, height, position: 'relative' }}
      aria-hidden="true"
    >
      <Image
        src={variant === 'pattern' ? '/assets/spt-pattern.png' : '/assets/logo-spt-icon.png'}
        alt=""
        fill
        className="object-contain"
      />
    </div>
  );
}
