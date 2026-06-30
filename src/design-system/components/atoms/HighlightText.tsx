import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export interface HighlightTextProps {
  children: ReactNode;
  textSize?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  className?: string;
}

const textSizeClasses = {
  h1: 'text-h1',
  h2: 'text-h2',
  h3: 'text-h3',
  h4: 'text-h4',
  h5: 'text-h5',
};

export default function HighlightText({
  children,
  textSize = 'h2',
  className,
}: HighlightTextProps) {
  return (
    <span
      className={cn(
        'inline-block text-white font-extrabold font-jakarta px-8 py-1',
        textSizeClasses[textSize],
        className,
      )}
      style={{ backgroundImage: 'var(--gradient-highlight)' }}
    >
      {children}
    </span>
  );
}
