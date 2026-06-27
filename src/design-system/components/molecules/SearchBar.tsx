'use client';

import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';

export interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  value = '',
  onChange,
  onClear,
  placeholder = 'Cari event...',
  className,
}: SearchBarProps) {
  return (
    <div className={cn('relative w-full', className)}>
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 shrink-0"
        size={18}
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full bg-transparent border border-primary-300 rounded-[12px]',
          'pl-11 pr-10 py-2.5 text-white font-jakarta text-p3',
          'placeholder:text-white/40',
          'focus:outline-none focus:border-primary-100 focus:ring-1 focus:ring-primary-100',
          'transition-colors duration-200',
        )}
        aria-label={placeholder}
      />
      {value && (
        <button
          type="button"
          onClick={() => { onChange?.(''); onClear?.(); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
          aria-label="Hapus pencarian"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
