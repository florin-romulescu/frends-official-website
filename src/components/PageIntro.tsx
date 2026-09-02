interface Props {
  heading: string;
  lede: string;
  cta?: { label: string; href: string };
}

const PageIntro = ({ heading, lede, cta }: Props) => {
  return (
    <section className="container-content py-20 sm:py-28">
      <div className="max-w-2xl">
        <h1 className="text-4xl sm:text-5xl">{heading}</h1>
        <p className="mt-6 text-lg text-ink-700">{lede}</p>
        {cta && (
          <a
            href={cta.href}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            {cta.label}
          </a>
        )}
      </div>
    </section>
  );
};

export default PageIntro;
