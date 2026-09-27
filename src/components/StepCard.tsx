import type { BaseProp } from './types';
import Button from './Button';
import Pill from './Pill';

interface Cta {
  label: string;
  href: string;
  external?: boolean;
  variant: 'primary' | 'secondary';
}

interface Props extends BaseProp {
  index: number;
  title: string;
  timing: string;
  description?: string;
  cta?: Cta;
}

const StepCard = ({ index, title, timing, description, cta, className = '' }: Props) => {
  return (
    <div className={`flex max-w-[27rem] flex-col items-start gap-4 ${className}`}>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <h3 className="flex items-center gap-3 text-h3">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand font-heading text-h5 text-on-brand shadow-control">
            {index}
            <span className="sr-only">.</span>
          </span>
          {title}
        </h3>
        <Pill variant="label">{timing}</Pill>
      </div>
      {description && <p className="text-body text-ink">{description}</p>}
      {cta && (
        <Button href={cta.href} variant={cta.variant} external={cta.external}>
          {cta.label}
        </Button>
      )}
    </div>
  );
};

export default StepCard;
