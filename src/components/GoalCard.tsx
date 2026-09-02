interface Props {
  /** 1-based position, rendered as the large numeral. */
  index: number;
  label: string;
}

/** One numbered objective from the "Obiectivele FRENDS" band. */
const GoalCard = ({ index, label }: Props) => {
  return (
    <li className="flex w-full items-center gap-3 rounded-pill bg-surface px-4 py-2 font-heading text-ink lg:w-[265px]">
      <span className="text-h4 shrink-0" aria-hidden="true">
        {index}.
      </span>
      <span className="text-h5">{label}</span>
    </li>
  );
};

export default GoalCard;
