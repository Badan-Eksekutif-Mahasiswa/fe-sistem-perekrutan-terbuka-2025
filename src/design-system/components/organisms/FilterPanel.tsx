'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import FilterCard, { type FilterSection } from '../molecules/FilterCard';
import Button from '../atoms/Button';
import { X } from 'lucide-react';

export interface FilterPanelProps {
  sections?: FilterSection[];
  initialFilters?: Record<string, boolean>;
  onFilterChange?: (filters: Record<string, boolean>) => void;
  className?: string;
}

export default function FilterPanel({
  sections,
  initialFilters = {},
  onFilterChange,
  className,
}: FilterPanelProps) {
  const [filters, setFilters] = useState<Record<string, boolean>>(initialFilters);

  const handleChange = (values: Record<string, boolean>) => {
    setFilters(values);
    onFilterChange?.(values);
  };

  const activeFilters = Object.entries(filters)
    .filter(([, active]) => active)
    .map(([key]) => key);

  const resetFilter = (key: string) => {
    const next = { ...filters, [key]: false };
    setFilters(next);
    onFilterChange?.(next);
  };

  const resetAll = () => {
    const cleared = Object.fromEntries(Object.keys(filters).map((k) => [k, false]));
    setFilters(cleared);
    onFilterChange?.(cleared);
  };

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <FilterCard sections={sections} values={filters} onChange={handleChange} />

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          {activeFilters.map((key) => (
            <button
              key={key}
              onClick={() => resetFilter(key)}
              className="flex items-center gap-1 px-3 py-1 rounded-full border border-primary-300 text-white text-m4 font-jakarta hover:bg-white/10 transition-colors"
              aria-label={`Hapus filter ${key}`}
            >
              {key}
              <X size={12} aria-hidden="true" />
            </button>
          ))}
          <Button variant="secondary" size="sm" onClick={resetAll}>
            Reset Filter
          </Button>
        </div>
      )}
    </div>
  );
}
