import { cn } from '@/lib/utils';
import { Diamond } from 'lucide-react';

export interface DiamondIconProps {
  size?: number;
  color?: string;
  className?: string;
  filled?: boolean;
}

export default function DiamondIcon({
  size = 20,
  color = 'white',
  className,
  filled = false,
}: DiamondIconProps) {
  return (
    <Diamond
      width={size}
      height={size}
      style={{ color }}
      className={cn(filled && 'fill-current', 'shrink-0', className)}
      aria-hidden="true"
    />
  );
}
