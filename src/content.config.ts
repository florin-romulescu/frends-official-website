import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import {
  acfDate,
  cleanHtml,
  decodeEntities,
  featuredAlt,
  featuredImage,
  fetchMedia,
  mediaImage,
  plainText,
  requireFeaturedImage,
  wpFetchAll,
  type WpPost,
} from './lib/wp';
import { eventStatus } from './lib/events';

const image = z.object({
  src: z.string(),
  srcSet: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

const link = z.object({ label: z.string(), href: z.string() });

interface EventAcf {
  start_date: string;
  end_date?: string;
  image_alt?: string;
}

interface ProjectAcf {
  summary: string;
  year: number | string;
  featured: boolean;
  image_alt?: string;
}

interface PostAcf {
  image_alt?: string;
}

interface PartnerAcf {
  url?: string;
  order?: number | string;
}

export const imageSlots = [
  'header_sky',
  'hero_photo',
  'about_photo',
  'goals_background',
  'impact_greenup',
  'impact_poster',
  'impact_event',
  'community_hero',
  'community_comedy',
  'community_univibes',
  'community_band_background',
  'community_steps_background',
  'projects_banner',
  'logo',
  'logo_footer',
  'logo_mark',
  'icon_facebook',
  'icon_instagram',
  'icon_tiktok',
  'icon_caret',
  'icon_arrow',
  'icon_help',
] as const;

export type ImageSlot = (typeof imageSlots)[number];

type ImageSlotAcf = Partial<Record<ImageSlot, number | string | null>>;

interface SettingsAcf extends ImageSlotAcf {
  org_name: string;
  short_name: string;
  email: string;
  phone: string;
  address_lines: string;
  volunteer_url: string;
  social_facebook?: string;
  social_instagram?: string;
  social_tiktok?: string;
}

const events = defineCollection({
  loader: async () =>
    (await wpFetchAll<WpPost<EventAcf>>('events')).map((post) => {
      const startDate = acfDate(post.acf?.start_date) ?? post.date.slice(0, 10);
      const endDate = acfDate(post.acf?.end_date);
      return {
        id: post.slug,
        title: decodeEntities(post.title.rendered),
        description: plainText(post.excerpt?.rendered ?? ''),
        startDate,
        endDate,
        status: eventStatus(startDate, endDate),
        image: requireFeaturedImage(post, 'event'),
        imageAlt: featuredAlt(post),
        body: cleanHtml(post.content?.rendered ?? ''),
      };
    }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    status: z.enum(['open', 'ongoing', 'completed']),
    image,
    imageAlt: z.string(),
    body: z.string(),
  }),
});

const projects = defineCollection({
  loader: async () =>
    (await wpFetchAll<WpPost<ProjectAcf>>('projects')).map((post) => ({
      id: post.slug,
      title: decodeEntities(post.title.rendered),
      summary: post.acf?.summary || plainText(post.excerpt?.rendered ?? ''),
      year: post.acf?.year ? Number(post.acf.year) : undefined,
      featured: Boolean(post.acf?.featured),
      image: requireFeaturedImage(post, 'project'),
      imageAlt: featuredAlt(post),
      date: post.date.slice(0, 10),
      body: cleanHtml(post.content?.rendered ?? ''),
    })),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.number().optional(),
    featured: z.boolean(),
    image,
    imageAlt: z.string(),
    date: z.string(),
    body: z.string(),
  }),
});

const blog = defineCollection({
  loader: async () =>
    (await wpFetchAll<WpPost<PostAcf>>('posts')).map((post) => ({
      id: post.slug,
      title: decodeEntities(post.title.rendered),
      excerpt: plainText(post.excerpt?.rendered ?? ''),
      image: requireFeaturedImage(post, 'post'),
      imageAlt: featuredAlt(post),
      date: post.date.slice(0, 10),
      body: cleanHtml(post.content?.rendered ?? ''),
    })),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    image,
    imageAlt: z.string(),
    date: z.string(),
    body: z.string(),
  }),
});

const partners = defineCollection({
  loader: async () =>
    (await wpFetchAll<WpPost<PartnerAcf>>('partners')).map((post) => ({
      id: post.slug,
      name: decodeEntities(post.title.rendered),
      url: post.acf?.url || undefined,
      order: Number(post.acf?.order ?? 0),
      logo: featuredImage(post),
    })),
  schema: z.object({
    name: z.string(),
    url: z.string().optional(),
    order: z.number(),
    logo: image.optional(),
  }),
});

const fetchSettings = async (): Promise<SettingsAcf> => {
  const [entry] = await wpFetchAll<WpPost<SettingsAcf>>('site-settings', {
    per_page: '1',
    orderby: 'modified',
  });
  if (!entry?.acf) {
    throw new Error('WordPress has no published "Setări site" entry. Create one under Setări site.');
  }
  return entry.acf;
};

const settings = defineCollection({
  loader: async () => {
    const acf = await fetchSettings();
    const social = [
      { label: 'Facebook', href: acf.social_facebook },
      { label: 'Instagram', href: acf.social_instagram },
      { label: 'TikTok', href: acf.social_tiktok },
    ].filter((item): item is { label: string; href: string } => Boolean(item.href));

    return [
      {
        id: 'site',
        name: acf.org_name,
        shortName: acf.short_name,
        email: acf.email,
        phone: acf.phone,
        addressLines: acf.address_lines.split(/\r?\n/).map((l) => l.trim()).filter(Boolean),
        volunteerUrl: acf.volunteer_url,
        social,
      },
    ];
  },
  schema: z.object({
    name: z.string(),
    shortName: z.string(),
    email: z.string(),
    phone: z.string(),
    addressLines: z.array(z.string()),
    volunteerUrl: z.string(),
    social: z.array(link),
  }),
});

const images = defineCollection({
  loader: async () => {
    const acf = await fetchSettings();
    const assigned = imageSlots
      .map((slot) => ({ slot, id: Number(acf[slot] ?? 0) }))
      .filter(({ id }) => id > 0);
    const media = await fetchMedia(assigned.map(({ id }) => id));

    return assigned.flatMap(({ slot, id }) => {
      const item = media.get(id);
      return item ? [{ id: slot, ...mediaImage(item), alt: item.alt_text ?? '' }] : [];
    });
  },
  schema: image.extend({ alt: z.string() }),
});

export const collections = { events, projects, blog, partners, settings, images };
