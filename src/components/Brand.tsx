interface Props {
  name: string;
  href: string;
}

export default function Brand({ name, href }: Props) {
  return (
    <a
      href={href}
      className="flex items-center gap-2 text-lg font-bold tracking-tight text-brand-700 hover:text-brand-900"
    >
      <span
        aria-hidden="true"
        className="grid size-8 place-items-center rounded-lg bg-brand-600 text-sm font-black text-white"
      >
        {name.slice(0, 1)}
      </span>
      <span>{name}</span>
    </a>
  );
}
