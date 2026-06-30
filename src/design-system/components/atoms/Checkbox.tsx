'use client';

import { cn } from '@/lib/utils';
import { SquareCheckBig, Square } from 'lucide-react';

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export default function Checkbox({
  checked,
  onChange,
  label,
  disabled = false,
  className,
  id,
}: CheckboxProps) {
  const inputId = id ?? `checkbox-${label?.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <label
      htmlFor={inputId}
      className={cn(
        'flex items-center gap-2 cursor-pointer select-none text-white font-jakarta text-p3',
        disabled && 'opacity-50 pointer-events-none',
        className,
      )}
    >
      <input
        id={inputId}
        type="checkbox"
        className="sr-only"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        aria-checked={checked}
      />
      <span className="shrink-0" aria-hidden="true">
        {checked ? (
          <SquareCheckBig className="w-5 h-5 text-white" />
        ) : (
          <Square className="w-5 h-5 text-white" />
        )}
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}
