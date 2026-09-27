import { getImage } from 'astro:assets';

const descriptionLimit = 160;

export const toMetaDescription = (text: string) => {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= descriptionLimit) return clean;
  const cut = clean.slice(0, descriptionLimit - 1);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
};

export const getSocialImageUrl = async (image: ImageMetadata, site: URL) => {
  const { src } = await getImage({ src: image, width: 1200, height: 630, fit: 'cover', format: 'jpeg' });
  return new URL(src, site).href;
};

export const toJsonLd = (data: Record<string, unknown>) =>
  JSON.stringify({ '@context': 'https://schema.org', ...data });
