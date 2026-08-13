import {
  professionalSummary,
  professionalSummary2,
  experiences,
  skillCategories,
  contactLinks,
} from './resume';

export interface VrPanelData {
  index: string;
  title: string;
  body: string;
}

export const vrPanels: VrPanelData[] = [
  {
    index: '01',
    title: 'About',
    body: `${professionalSummary}\n\n${professionalSummary2}`,
  },
  {
    index: '02',
    title: 'Experience',
    body: experiences
      .map((e) => `${e.role} — ${e.company}\n${e.period}`)
      .join('\n\n'),
  },
  {
    index: '03',
    title: 'Skills',
    body: skillCategories
      .map((c) => `${c.title}: ${c.skills.join(', ')}`)
      .join('\n\n'),
  },
  {
    index: '04',
    title: 'Contact',
    body: contactLinks.map((c) => `${c.label}: ${c.displayText}`).join('\n'),
  },
];
