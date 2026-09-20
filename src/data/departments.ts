export interface Subdivision {
  name: string;
  description: string;
}

export interface Department {
  id: string;
  accent: string;
  title: string;
  description: string;
  subdivisions: Subdivision[];
}

export const departments: Department[] = [
  {
    id: 'fonduri',
    accent: 'fonduri',
    title: 'Departamentul de Fonduri',
    description:
      'Înglobează 3 subdiviziuni esențiale pentru buna desfășurare a proiectelor și activităților.',
    subdivisions: [
      {
        name: 'Fundraising',
        description:
          'Identifică parteneri și sponsori, construiește bugetele proiectelor și caută noi surse de sprijin material.',
      },
      {
        name: 'Scriere Proiecte',
        description:
          'Găsește linii de finanțare nerambursabilă, scrie și depune proiecte, apoi le monitorizează și raportează.',
      },
      {
        name: 'Parteneriate',
        description:
          'Creează parteneriate cu ONG-uri pentru acțiuni comune și menține relația cu asociațiile studențești.',
      },
    ],
  },
  {
    id: 'resurse-umane',
    accent: 'resurse-umane',
    title: 'Departamentul de Resurse Umane',
    description:
      'Managerierea, monitorizarea și ghidarea activității voluntarilor și a recruților.',
    subdivisions: [
      {
        name: 'Recrutare',
        description:
          'Monitorizează înscrierile, organizează interviurile și integrează recruții până devin voluntari.',
      },
      {
        name: 'Socializare',
        description:
          'Menține legături puternice între membri prin jocuri, aniversări și evenimente de team building.',
      },
      {
        name: 'Training',
        description:
          'Identifică nevoile de formare și organizează traininguri, team-building și Training of Trainers.',
      },
    ],
  },
  {
    id: 'comunicare',
    accent: 'comunicare',
    title: 'Departamentul de Comunicare',
    description:
      'Transmiterea informației cât mai creativ și clar cu privire la activitățile realizate în asociație.',
    subdivisions: [
      {
        name: 'Grafică',
        description:
          'Menține unitatea vizuală a asociației: concepte grafice, logo-uri și materiale personalizate.',
      },
      {
        name: 'PR',
        description:
          'Gestionează relația cu partenerii și publicul, planifică postările și comunicarea internă și externă.',
      },
      {
        name: 'Foto – Video',
        description:
          'Imortalizează momentele importante, creează retrospective și arhivează materialele asociației.',
      },
      {
        name: 'Site',
        description:
          'Întreține și dezvoltă site-urile asociației și organizează workshopuri de web development.',
      },
    ],
  },
  {
    id: 'dezvoltare',
    accent: 'dezvoltare',
    title: 'Departamentul de Dezvoltare',
    description:
      'Susținerea și facilitarea dezvoltării voluntarilor și recruților în diverse domenii.',
    subdivisions: [
      {
        name: 'Implementare Proiecte',
        description:
          'Susține realizarea proiectelor din calendar și verifică periodic progresul echipelor.',
      },
      {
        name: 'Antreprenoriat',
        description:
          'Oferă consultanță pentru start-up-uri, susține planuri de afaceri și organizează traininguri.',
      },
    ],
  },
  {
    id: 'administrativ',
    accent: 'administrativ',
    title: 'Departamentul Administrativ',
    description:
      'Coordonarea, monitorizarea și desfășurarea activităților administrative ale asociației.',
    subdivisions: [
      {
        name: 'Sediu',
        description:
          'Asigură buna funcționare a sediului și menținerea acestuia curat și ordonat.',
      },
      {
        name: 'Secretariat',
        description:
          'Redactează procesele-verbale, informează membrii și menține colaborarea cu partenerii.',
      },
      {
        name: 'IT',
        description:
          'Creează platforme și site-uri interactive, cu experiență în front-end, back-end și web design.',
      },
      {
        name: 'Bibliotecă',
        description:
          'Asigură accesul membrilor la cărți și jocuri și ține evidența împrumuturilor.',
      },
    ],
  },
];
