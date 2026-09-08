/** Resolved, serializable nav data. Safe to pass across the island boundary. */
export interface NavItem {
  label: string;
  href: string;
  current?: boolean;
}

export interface LinkProps {
  label: string;
  href: string;
}

/**
 * A build-time-optimized image, as produced by `getImage()` from `astro:assets`.
 *
 * React components cannot use `<Image />` directly (see README), so the .astro
 * shell resolves the image and passes this plain, serializable shape down. Keep
 * it structural rather than importing Astro's own type: these props cross the
 * island boundary and must stay JSON-safe.
 */
export interface ResolvedImage {
  src: string;
  srcSet?: string;
  width?: number;
  height?: number;
}

/** The three lifecycle states an event can be in. Drives StatusBadge colour. */
export type EventStatus = 'open' | 'ongoing' | 'completed';
