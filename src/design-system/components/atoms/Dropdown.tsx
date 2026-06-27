import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  label?: string;
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  id?: string;
}

export default function Dropdown({
  label,
  options,
  value,
  onChange,
  placeholder = 'Pilih...',
  className,
  disabled = false,
  required = false,
  id,
}: DropdownProps) {
  const selectId = id ?? `dropdown-${label?.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="text-white font-jakarta font-semibold text-m4"
        >
          {label}
          {required && <span className="text-status-danger ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      <div className="relative w-full">
        <select
          id={selectId}
          value={value}
          disabled={disabled}
          required={required}
          onChange={(e) => onChange?.(e.target.value)}
          className={cn(
            'w-full appearance-none bg-transparent border border-primary-300 rounded-[12px] px-4 py-2.5 pr-10',
            'text-white font-jakarta text-p3',
            'focus:outline-none focus:border-primary-100 focus:ring-1 focus:ring-primary-100',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'transition-colors duration-200',
            className,
          )}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-primary-500 text-white">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none shrink-0"
          size={16}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
