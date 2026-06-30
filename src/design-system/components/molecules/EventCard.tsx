import { cn } from '@/lib/utils';
import Image from 'next/image';
import GlassCard from '../atoms/GlassCard';
import Badge, { type BadgeStatus } from '../atoms/Badge';
import Button from '../atoms/Button';

export interface EventData {
  id: string;
  title: string;
  organizer?: string;
  status: BadgeStatus;
  deadline?: Date;
  startedAt?: Date;
  closedAt?: Date;
  description?: string;
  divisions?: readonly string[];
  logoSrc?: string;
}

export interface EventCardProps {
  event: EventData;
  onRegister?: (id: string) => void;
  onDetail?: (id: string) => void;
  className?: string;
}

function formatDate(date?: Date) {
  if (!date) return '';
  return new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
}

export default function EventCard({ event, onRegister, onDetail, className }: EventCardProps) {
  const hasDetailPath = Boolean(event.id);
  const dateRange = event.startedAt && event.closedAt
    ? `${formatDate(event.startedAt)} – ${formatDate(event.closedAt)}`
    : event.deadline
    ? `Deadline: ${formatDate(event.deadline)}`
    : '';

  return (
    <GlassCard padding="md" className={cn('text-white', className)}>
      {/* Desktop */}
      <div className="w-full max-md:hidden flex flex-col gap-4">
        <div className="flex gap-6">
          <div className="relative w-36 h-32 shrink-0 rounded-lg overflow-hidden">
            <Image
              src={event.logoSrc ?? '/assets/logo-bem-ui.png'}
              alt={`Logo ${event.title}`}
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col gap-2 flex-1 text-start">
            <div className="flex justify-between items-start gap-2">
              <h3 className="text-h3 font-jakarta font-extrabold">{event.title}</h3>
              <Badge status={event.status} />
            </div>
            {dateRange && <p className="text-m4 font-jakarta">{dateRange}</p>}
            {event.description && <p className="text-p5 font-jakarta line-clamp-2">{event.description}</p>}
          </div>
        </div>
        <div className="flex justify-between items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {event.divisions?.map((div) => (
              <span key={div} className="px-3 py-1 rounded-full border border-primary-300 text-m4 font-jakarta">
                {div}
              </span>
            ))}
          </div>
          <div className="flex gap-2 shrink-0">
            {onRegister && (
              <Button variant="primary" size="sm" onClick={() => onRegister(event.id)}>
                Daftar
              </Button>
            )}
            <Button
              variant="external"
              size="sm"
              href={!onDetail && hasDetailPath ? `/${event.id}` : undefined}
              onClick={onDetail && hasDetailPath ? () => onDetail(event.id) : undefined}
              disabled={!hasDetailPath}
            >
              Detail
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="w-full space-y-4 md:hidden">
        <div className="flex justify-between items-center flex-wrap gap-2">
          {dateRange && <p className="text-p5 font-jakarta">{dateRange}</p>}
          <Badge status={event.status} />
        </div>
        <h4 className="text-h4 font-jakarta font-extrabold">{event.title}</h4>
        <div className="flex gap-4">
          <div className="relative w-24 h-24 shrink-0 rounded overflow-hidden">
            <Image
              src={event.logoSrc ?? '/assets/logo-bem-ui.png'}
              alt={`Logo ${event.title}`}
              fill
              className="object-contain"
            />
          </div>
          {event.description && <p className="text-p5 font-jakarta">{event.description}</p>}
        </div>
        <div className="flex gap-2 w-full">
          {onRegister && (
            <Button variant="primary" size="sm" onClick={() => onRegister(event.id)} fullWidth>
              Daftar
            </Button>
          )}
          <Button
            variant="external"
            size="sm"
            href={!onDetail && hasDetailPath ? `/${event.id}` : undefined}
            onClick={onDetail && hasDetailPath ? () => onDetail(event.id) : undefined}
            disabled={!hasDetailPath}
            fullWidth
          >
            Detail
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}
