import { getEntry } from 'astro:content';
import type { ImageSlot } from '../content.config';
import type { ResolvedImage } from '../components/types';

export interface SiteImage extends ResolvedImage {
  alt: string;
}

export const getSiteImage = async (slot: ImageSlot): Promise<SiteImage> => {
  const entry = await getEntry('images', slot);
  if (!entry) {
    throw new Error(
      `Image slot "${slot}" is empty. Assign it in WordPress → Setări site → Imagini și logo-uri.`,
    );
  }
  return entry.data;
};
