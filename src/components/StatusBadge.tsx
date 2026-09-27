import type { BaseProp, EventStatus } from './types';

interface Props extends BaseProp {
  status: EventStatus;
  label: string;
  pulse?: boolean;
}

const dots: Record<EventStatus, string> = {
  open: 'bg-status-open',
  ongoing: 'bg-status-ongoing',
  completed: 'bg-status-completed',
};

const StatusBadge = ({ status, label, pulse = false, className = '' }: Props) => {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-pill bg-surface px-4 py-2 ${className}`}
    >
      <span aria-hidden="true" className="relative flex size-3.5 shrink-0">
        {pulse && (
          <span
            className={`absolute inset-0 rounded-full opacity-75 motion-safe:animate-ping ${dots[status]}`}
          />
        )}
        <span className={`relative size-full rounded-full ${dots[status]}`} />
      </span>
      <span className="text-body-lg whitespace-nowrap text-ink-muted">{label}</span>
    </span>
  );
};

export default StatusBadge;
