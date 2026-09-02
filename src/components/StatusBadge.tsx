import type { EventStatus } from './types';

interface Props {
  status: EventStatus;
  /** Already-translated text. The i18n lookup belongs to the caller. */
  label: string;
  className?: string;
}

/**
 * Event lifecycle badge: a coloured dot plus a label.
 *
 * The dot is a CSS circle rather than an exported asset because its colour is
 * a design token with three variants — an SVG per state would put the palette
 * back into three binary files where no token rename could reach it.
 */
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
