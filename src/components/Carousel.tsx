import { Children, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Accessible name for the scroll region, e.g. "Evenimente". */
  label: string;
  /** Used to build stable slide anchor ids. Must be unique per page. */
  id: string;
  labels: {
    /** e.g. "Primul eveniment" */
    first: string;
    /** e.g. "Ultimul eveniment" */
    last: string;
    /** Receives the 1-based slide number, e.g. (n) => `Evenimentul ${n}` */
    slide: (n: number) => string;
  };
}

/**
 * Horizontal carousel with NO JavaScript.
 *
 * The design shows prev/next arrows and position dots, which usually means a
 * hydrated island. Hydrating it here would have been expensive out of all
 * proportion: this is the only interactive thing on the page, so a React
 * runtime would be downloaded for one widget and the route would need a JS
 * budget entry (scripts/check-js-budget.mjs).
 *
 * Instead the track is a native scroll-snap container. Swipe, trackpad, shift-
 * scroll and arrow keys (the region is focusable) all work with zero runtime,
 * and every control is a plain anchor to a slide id — which browsers resolve by
 * scrolling the nearest scrollable ancestor.
 *
 * The honest limitation: the arrows jump to the first and last slide rather
 * than stepping one at a time, because "the slide after whichever is currently
 * showing" is not knowable without script. They are labelled accordingly.
 */
const Carousel = ({ children, label, id, labels }: Props) => {
  const slides = Children.toArray(children);
  const firstId = `${id}-slide-1`;
  const lastId = `${id}-slide-${slides.length}`;

  const arrow =
    'grid size-14 shrink-0 place-items-center rounded-full bg-surface shadow-control transition-transform hover:scale-105 lg:size-20';

  return (
    <div className="relative">
      <div className="flex items-stretch gap-4">
        <a href={`#${firstId}`} className={`${arrow} hidden lg:grid`}>
          <span className="sr-only">{labels.first}</span>
          <img src="/icons/arrow.png" alt="" width={32} height={32} className="size-8 rotate-180" />
        </a>

        <ul
          className="snap-track -mx-4 flex-1 gap-6 px-4 py-2 lg:mx-0 lg:px-0"
          tabIndex={0}
          role="group"
          aria-label={label}
        >
          {slides.map((slide, i) => (
            <li key={i} id={`${id}-slide-${i + 1}`} className="scroll-mx-4 flex">
              {slide}
            </li>
          ))}
        </ul>

        <a href={`#${lastId}`} className={`${arrow} hidden lg:grid`}>
          <span className="sr-only">{labels.last}</span>
          <img src="/icons/arrow.png" alt="" width={32} height={32} className="size-8" />
        </a>
      </div>

      <ul className="mt-6 flex items-center justify-center gap-2">
        {slides.map((_, i) => (
          <li key={i}>
            <a
              href={`#${id}-slide-${i + 1}`}
              className="block size-2.5 rounded-full bg-surface/70 transition-colors hover:bg-surface"
            >
              <span className="sr-only">{labels.slide(i + 1)}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Carousel;
