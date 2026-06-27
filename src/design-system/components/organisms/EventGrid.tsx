import { cn } from '@/lib/utils';
import EventCard, { type EventData } from '../molecules/EventCard';

export interface EventGridProps {
  events: EventData[];
  loading?: boolean;
  onRegister?: (id: string) => void;
  onDetail?: (id: string) => void;
  className?: string;
}

function SkeletonCard() {
  return (
    <div
      className="rounded-[12px] border border-primary-300 p-6 animate-pulse"
      style={{ backgroundImage: 'var(--gradient-card-blue)', boxShadow: 'var(--shadow-glass)' }}
    >
      <div className="flex gap-6">
        <div className="w-36 h-32 rounded-lg bg-white/10 shrink-0" />
        <div className="flex flex-col gap-3 flex-1">
          <div className="h-6 bg-white/10 rounded w-3/4" />
          <div className="h-4 bg-white/10 rounded w-1/2" />
          <div className="h-4 bg-white/10 rounded w-full" />
          <div className="h-4 bg-white/10 rounded w-5/6" />
        </div>
      </div>
    </div>
  );
}

export default function EventGrid({
  events,
  loading = false,
  onRegister,
  onDetail,
  className,
}: EventGridProps) {
  if (loading) {
    return (
      <div className={cn('grid grid-cols-1 gap-4', className)}>
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className={cn('flex flex-col items-center justify-center py-16 gap-4', className)}>
        <p className="text-white/60 font-jakarta text-m2 font-semibold">Tidak ada event ditemukan</p>
        <p className="text-white/40 font-jakarta text-p3">Coba ubah filter atau kata kunci pencarian</p>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onRegister={onRegister}
          onDetail={onDetail}
        />
      ))}
    </div>
  );
}
