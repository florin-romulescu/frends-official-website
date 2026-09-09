import type { BaseProp } from './types';

interface Props extends BaseProp {
  index: number;
  label: string;
}

const GoalCard = ({ index, label, className = '' }: Props) => {
  return (
    <div
      className={`flex w-full items-center gap-3 rounded-pill bg-surface px-4 py-2 font-heading text-ink ${className}`}
    >
      <span className="text-h4 shrink-0" aria-hidden="true">
        {index}.
      </span>
      <span className="text-h5">{label}</span>
    </div>
  );
};

export default GoalCard;
