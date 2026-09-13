import type { UIKey } from '../i18n';

export interface StepCta {
  key: UIKey;
  href: 'volunteer' | `/${string}`;
  variant: 'primary' | 'secondary';
}

export interface Step {
  title: string;
  timing: string;
  description?: string;
  cta?: StepCta;
}

export const steps: Step[] = [
  {
    title: 'Înregistrare',
    timing: 'astăzi',
    cta: { key: 'community.stepsForm', href: 'volunteer', variant: 'primary' },
  },
  {
    title: 'Sesiune de Cunoaștere',
    timing: 'în 1-2 săptămâni',
    description:
      'Întâlnire cu echipa FRENDS pentru a ne cunoaște reciproc și a răspunde întrebărilor tale',
  },
  {
    title: 'Bootcamp & Traininguri',
    timing: 'lunile 1-2',
    description:
      'Traininguri de bază: management de proiect, comunicare (PR & grafică), HR și fundraising',
  },
  {
    title: 'Formarea echipelor',
    timing: 'lunile 2-3',
    description: 'Începi să dezvolți idei de proiecte și să colaborezi cu echipa',
  },
  {
    title: 'Alegerea Diviziilor',
    timing: 'luna 3',
    description: 'Participi la activități de teambuilding și alegi divizia în care vei activa',
    cta: { key: 'community.stepsDivisions', href: '/departamente', variant: 'secondary' },
  },
  {
    title: 'Implementare',
    timing: 'lunile 4-6',
    description: 'Execuți proiectele tale în echipe și contribui activ la impact social.',
  },
];
