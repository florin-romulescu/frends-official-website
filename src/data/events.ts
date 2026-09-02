import type { ImageMetadata } from 'astro';
import type { EventStatus } from '../components/types';
import eventsBg from '../assets/img/events-bg.jpg';
import impactPoster from '../assets/img/impact-poster.jpg';
import impactEvent from '../assets/img/impact-event.jpg';

export interface EventEntry {
  id: string;
  title: string;
  period: string;
  description: string;
  status: EventStatus;
  href: string;
  image: ImageMetadata;
  imageAlt: string;
}

/**
 * Homepage carousel content.
 *
 * TODO (Phase 3): this becomes a content collection backed by the CMS. It is a
 * typed module rather than JSON for now so the image imports go through
 * `astro:assets` — a bare path string in JSON would skip optimization and ship
 * the 4000px originals.
 */
export const events: EventEntry[] = [
  {
    id: 'inscrieri',
    title: 'Înscrieri 2025-2026',
    period: 'Octombrie 2025 - Aprilie 2026',
    description:
      'Parcurs structurat de dezvoltare personală și profesională pentru 70 de noi recruți.',
    status: 'open',
    href: '/evenimente/inscrieri-2025-2026',
    image: eventsBg,
    imageAlt: 'Voluntari FRENDS la standul de înscrieri, purtând tricouri „I’m a volunteer”',
  },
  {
    id: 'sesiune',
    title: 'Sesiune de Cunoaștere',
    period: 'Noiembrie 2025',
    description:
      'Întâlnire cu echipa FRENDS pentru a ne cunoaște reciproc și a răspunde întrebărilor tale.',
    status: 'open',
    href: '/evenimente/sesiune-de-cunoastere',
    image: impactPoster,
    imageAlt: 'Participanți la sesiunea de cunoaștere FRENDS, în aer liber',
  },
  {
    id: 'bootcamp',
    title: 'Bootcamp & Traininguri',
    period: 'Decembrie 2025 - Ianuarie 2026',
    description:
      'Traininguri de bază: management de proiect, comunicare (PR & grafică), HR și fundraising.',
    status: 'ongoing',
    href: '/evenimente/bootcamp-traininguri',
    image: impactEvent,
    imageAlt: 'Voluntari FRENDS într-un training de grup',
  },
];
