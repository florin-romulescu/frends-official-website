interface Props {
  index: number;
  name: string;
  description: string;
}

const badgeLetter = (index: number) => String.fromCharCode(65 + index);

const SubdivisionCard = ({ index, name, description }: Props) => {
  return (
    <article className="group flex h-full flex-col gap-2.5 rounded-nav border border-border-default bg-surface p-6 transition duration-300 ease-out hover:-translate-y-1.5 hover:border-(--accent) hover:shadow-card">
      <div className="mb-2.5 flex items-center gap-3">
        <span
          aria-hidden="true"
          className="grid size-8 shrink-0 place-items-center rounded-full bg-[color-mix(in_oklab,var(--accent)_14%,white)] font-heading text-body-sm text-(--accent) transition-colors duration-300 group-hover:bg-(--accent) group-hover:text-on-brand"
        >
          {badgeLetter(index)}
        </span>
        <span
          aria-hidden="true"
          className="h-[3px] w-10 rounded-[2px] bg-(--accent) transition-[width] duration-500 ease-out group-hover:w-full"
        />
      </div>
      <h3 className="text-h5">{name}</h3>
      <p className="text-body-sm text-ink-secondary">{description}</p>
    </article>
  );
};

export default SubdivisionCard;
