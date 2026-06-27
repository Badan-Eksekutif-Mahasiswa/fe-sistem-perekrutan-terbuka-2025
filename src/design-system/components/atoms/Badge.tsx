import { cn } from '@/lib/utils';

export type BadgeStatus = 'active' | 'closed' | 'draft' | 'open' | 'upcoming';

export interface BadgeProps {
  status: BadgeStatus;
  label?: string;
  className?: string;
}

const statusConfig: Record<BadgeStatus, { bg: string; label: string }> = {
  active:   { bg: 'bg-status-success', label: 'Aktif' },
  closed:   { bg: 'bg-status-danger',  label: 'Ditutup' },
  draft:    { bg: 'bg-neutral-400',    label: 'Draft' },
  open:     { bg: 'bg-status-info',    label: 'Dibuka' },
  upcoming: { bg: 'bg-secondary-500',  label: 'Akan Datang' },
};

export default function Badge({ status, label, className }: BadgeProps) {
  const { bg, label: defaultLabel } = statusConfig[status];
  return (
    <span
      className={cn(
        'inline-block text-white font-jakarta font-semibold text-m4 px-3 py-1 rounded-full',
        bg,
        className,
      )}
    >
      {label ?? defaultLabel}
    </span>
  );
}
