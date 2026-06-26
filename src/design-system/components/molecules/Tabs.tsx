'use client';

import { cn } from '@/lib/utils';

export interface TabItem {
  id: string;
  label: string;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab?: string;
  onChange?: (id: string) => void;
  className?: string;
}

export default function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Tab navigation"
      className={cn(
        'flex gap-1 border-b border-primary-300',
        className,
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => onChange?.(tab.id)}
            className={cn(
              'px-4 py-2.5 font-jakarta font-semibold text-m3 transition-all duration-200 relative',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
              isActive
                ? 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-100'
                : 'text-white/60 hover:text-white/80',
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
