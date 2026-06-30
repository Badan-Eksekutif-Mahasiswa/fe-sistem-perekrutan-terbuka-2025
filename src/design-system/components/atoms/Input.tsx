import { cn } from '@/lib/utils';
import type { InputHTMLAttributes } from 'react';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  className?: string;
}

export default function Input({
  label,
  error,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id ?? `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-white font-jakarta font-semibold text-m4"
        >
          {label}
          {props.required && <span className="text-status-danger ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'w-full bg-transparent border border-primary-300 rounded-[12px] px-4 py-2.5',
          'text-white font-jakarta text-p3 placeholder:text-neutral-400',
          'focus:outline-none focus:border-primary-100 focus:ring-1 focus:ring-primary-100',
          'transition-colors duration-200',
          error && 'border-status-danger focus:border-status-danger focus:ring-status-danger',
          className,
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-status-danger text-p4 font-jakarta" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
