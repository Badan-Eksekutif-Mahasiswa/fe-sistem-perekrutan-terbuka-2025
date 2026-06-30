import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export interface TextBoxProps {
  children: ReactNode;
  className?: string;
}

export default function TextBox({ children, className }: TextBoxProps) {
  return (
    <div
      className={cn('text-white font-jakarta', className)}
      style={{
        background: 'rgba(0,0,0,0.25)',
        border: '1.928px solid #d8a6b1',
        backdropFilter: 'blur(47.5px)',
        WebkitBackdropFilter: 'blur(47.5px)',
        borderRadius: '38.567px',
        boxShadow: '0px 3.857px 19.284px rgba(0,0,0,0.5)',
        padding: '16px 24px',
      }}
    >
      {children}
    </div>
  );
}
