interface Props {
  label: string;
  value: string;
  helper: string;
  href?: string;
}

const ContactCard = ({ label, value, helper, href }: Props) => {
  return (
    <article className="group lift flex h-full flex-col gap-3 rounded-nav border border-border-default bg-surface px-8 pt-10 pb-8 hover:border-brand">
      <span aria-hidden="true" className="h-[3px] w-10 rounded-[2px] bg-brand transition-[width] duration-500 ease-out group-hover:w-full" />
      <p className="font-heading text-body-sm text-ink-secondary">{label}</p>
      <p className="text-body-lg font-black text-ink">
        {href ? (
          <a href={href} className="transition-colors hover:text-brand">
            {value}
          </a>
        ) : (
          value
        )}
      </p>
      <p className="text-body-sm text-ink-secondary">{helper}</p>
    </article>
  );
};

export default ContactCard;
