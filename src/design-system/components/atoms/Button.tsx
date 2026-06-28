import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';
import type { ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'external' | 'signin';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  href?: string;
  onClick?: () => void;
  children?: ReactNode;
  fullWidth?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-m4 gap-1.5',
  md: 'px-5 py-2.5 text-m3 gap-2',
  lg: 'px-6 py-3 text-m2 gap-2.5',
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'text-white rounded-[12px] border border-primary-300 hover:brightness-110 hover:scale-105 hover:-translate-y-1 hover:drop-shadow-lg active:scale-95 active:translate-y-0 active:brightness-90',
  secondary:
    'bg-marun text-white rounded-[12px] drop-shadow-[0px_2px_4px_rgba(0,0,0,0.25)] hover:bg-marun-light hover:scale-105 hover:-translate-y-1 hover:drop-shadow-lg active:scale-95 active:translate-y-0 active:bg-marun-dark',
  external:
    'text-primary-500 rounded-[12px] hover:brightness-105 hover:scale-105 hover:-translate-y-1 hover:drop-shadow-lg active:scale-95 active:translate-y-0 active:brightness-90',
  signin:
    'bg-pink-light text-marun rounded-[12px] border border-marun hover:bg-pink-mid hover:scale-105 hover:-translate-y-1 hover:drop-shadow-lg active:scale-95 active:translate-y-0 active:bg-pink-dark',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  disabled = false,
  loading = false,
  href,
  onClick,
  children,
  fullWidth = false,
  className,
  type = 'button',
  'aria-label': ariaLabel,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const baseClasses = cn(
    'inline-flex items-center justify-center font-jakarta font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer outline-none',
    'focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    sizeClasses[size],
    variantClasses[variant],
    fullWidth && 'w-full',
    className,
  );

  const inlineStyle =
    variant === 'primary'
      ? { backgroundImage: 'var(--gradient-btn-1)', boxShadow: 'var(--shadow-btn)' }
      : variant === 'external'
      ? { backgroundImage: 'var(--gradient-btn-3)', boxShadow: 'var(--shadow-btn)' }
      : variant === 'signin'
      ? { boxShadow: 'var(--shadow-btn)' }
      : undefined;

  const content = (
    <>
      {loading ? (
        <Loader2 className="animate-spin shrink-0" size={16} />
      ) : leftIcon ? (
        <span className="shrink-0">{leftIcon}</span>
      ) : null}
      {children && <span>{children}</span>}
      {!loading && (rightIcon ?? (variant === 'external' ? <ArrowRight size={16} className="shrink-0" /> : null))}
    </>
  );

  if (href && !isDisabled) {
    return (
      <Link href={href} className={baseClasses} style={inlineStyle} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={baseClasses}
      style={inlineStyle}
      disabled={isDisabled}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-disabled={isDisabled}
    >
      {content}
    </button>
  );
}
