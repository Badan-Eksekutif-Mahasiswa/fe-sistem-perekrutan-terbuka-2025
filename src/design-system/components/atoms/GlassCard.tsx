import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export interface GlassCardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  as?: 'div' | 'section' | 'article';
}

const paddingClasses = {
  none: '',
  sm:   'p-4',
  md:   'p-6',
  lg:   'p-8',
};

export default function GlassCard({
  children,
  className,
  padding = 'md',
  as: Tag = 'div',
}: GlassCardProps) {
  return (
    <Tag
      className={cn(
        'rounded-[12px] border border-primary-300 backdrop-blur-[10px] overflow-hidden',
        paddingClasses[padding],
        className,
      )}
      style={{
        backgroundImage: 'var(--gradient-card-blue)',
        boxShadow: 'var(--shadow-glass)',
      }}
    >
      {children}
    </Tag>
  );
}
