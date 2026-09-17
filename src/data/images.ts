import { getEntry } from 'astro:content';
import type { ImageSlot } from '../content.config';
import type { ResolvedImage } from '../components/types';

export interface SiteImage extends ResolvedImage {
  alt: string;
}

export const getSiteImage = async (slot: ImageSlot): Promise<SiteImage> => {
  const settings = await getEntry('settings', 'site');
  const image = settings?.data.images[slot];
  if (!image) {
    throw new Error(`Image slot "${slot}" is empty. Add it to src/content/settings/site.json.`);
  }
  return { ...image.src, alt: image.alt };
};
