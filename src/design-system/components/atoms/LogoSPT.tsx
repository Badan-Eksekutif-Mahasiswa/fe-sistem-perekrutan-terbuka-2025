import { cn } from '@/lib/utils';
import Image from 'next/image';

export type LogoSPTSize = 'sm' | 'md' | 'lg';

export interface LogoSPTProps {
  size?: LogoSPTSize;
  showText?: boolean;
  className?: string;
}

const sizeMap: Record<LogoSPTSize, number> = {
  sm: 64,
  md: 120,
  lg: 160,
};

export default function LogoSPT({
  size = 'md',
  showText = true,
  className,
}: LogoSPTProps) {
  const px = sizeMap[size];

  return (
    <div className={cn('flex flex-col items-center gap-1', className)}>
      <Image
        src="/logo.webp"
        alt="Logo SPT BEM UI"
        width={px}
        height={px}
        className="object-contain"
      />
      {showText && (
        <div className="flex flex-col items-center text-white font-jakarta">
          <span
            className="font-extrabold tracking-[0.2em]"
            style={{ fontSize: size === 'sm' ? '14px' : size === 'lg' ? '24px' : '18px' }}
          >
            S P T
          </span>
          <span
            className="font-extrabold"
            style={{ fontSize: size === 'sm' ? '10px' : size === 'lg' ? '16px' : '12px' }}
          >
            BEM UI
          </span>
        </div>
      )}
    </div>
  );
}
