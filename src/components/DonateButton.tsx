interface Props {
  label: string;
  href: string;
  className?: string;
}

export default function DonateButton({ label, href, className = '' }: Props) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-full bg-accent-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-500 ${className}`}
    >
      {label}
    </a>
  );
}
