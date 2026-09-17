import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { eventStatus } from './lib/events';

const link = z.object({ label: z.string(), href: z.string() });

const withStatus = <T extends { startDate: string; endDate?: string }>(data: T) => ({
  ...data,
  status: eventStatus(data.startDate, data.endDate),
});

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
  'icon_help',
] as const;

export type ImageSlot = (typeof imageSlots)[number];

const events = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/events' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        description: z.string(),
        startDate: z.string(),
        endDate: z.string().optional(),
        image: image(),
        imageAlt: z.string(),
      })
      .transform(withStatus),
});

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        summary: z.string(),
        category: z.string().optional(),
        location: z.string().optional(),
        startDate: z.string(),
        endDate: z.string().optional(),
        accentColor: z.string().optional(),
        highlight: z.string().optional(),
        featured: z.boolean().default(false),
        image: image(),
        imageAlt: z.string(),
        facts: z.array(z.string()).default([]),
        impactLede: z.string().optional(),
        impact: z
          .array(
            z.object({
              photo: image(),
              photoAlt: z.string(),
              stat: z.string(),
              label: z.string().optional(),
            }),
          )
          .default([]),
      })
      .transform(withStatus),
});

const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: z.string(),
      image: image(),
      imageAlt: z.string(),
      date: z.string(),
    }),
});

const partners = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/partners' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      url: z.string().optional(),
      order: z.number().default(0),
      logo: image().optional(),
    }),
});

const settings = defineCollection({
  loader: glob({ pattern: 'site.json', base: './src/content/settings' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      shortName: z.string(),
      email: z.string(),
      phone: z.string(),
      addressLines: z.array(z.string()),
      volunteerUrl: z.string(),
      social: z.array(link),
      images: z.record(z.enum(imageSlots), z.object({ src: image(), alt: z.string() })),
    }),
});

export const collections = { events, projects, blog, partners, settings };
