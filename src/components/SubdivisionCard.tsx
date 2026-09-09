interface Props {
  name: string;
  description: string;
}

const SubdivisionCard = ({ name, description }: Props) => {
  return (
    <article className="flex h-full flex-col gap-2.5 rounded-nav border border-border-default bg-surface p-6">
      <span aria-hidden="true" className="mb-2.5 h-[3px] w-10 rounded-[2px] bg-[color:var(--accent)]" />
      <h3 className="text-h5">{name}</h3>
      <p className="text-body-sm text-ink-secondary">{description}</p>
    </article>
  );
};

export default SubdivisionCard;
