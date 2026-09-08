import type { BaseProp, EventStatus } from './types';

interface Props extends BaseProp {
  status: EventStatus;
  label: string;
}

const dots: Record<EventStatus, string> = {
  open: 'bg-status-open',
  ongoing: 'bg-status-ongoing',
  completed: 'bg-status-completed',
};

const StatusBadge = ({ status, label, className = '' }: Props) => {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-pill bg-surface px-4 py-2 ${className}`}
    >
      <span
        aria-hidden="true"
        className={`size-3.5 shrink-0 rounded-full ${dots[status]}`}
      />
      <span className="text-body-lg whitespace-nowrap text-ink-muted">{label}</span>
    </span>
  );
};

export default StatusBadge;
