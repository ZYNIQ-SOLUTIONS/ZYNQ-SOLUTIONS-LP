import { StationDef } from '../types';

export const SITE = {
  name: 'ZYNIQ Studio',
  tagline: "AI-Driven Software Factory & Innovation Lab. We don't just adapt to the future, we engineer it.",
  hq: 'Dubai, UAE',
};

// The four stages of the line, shown in the hero diagram, The Line section and beside the form.
export const STAGES = [
  {
    label: 'Intake',
    note: 'Your brief comes in',
    detail:
      'We read the brief, map the systems it touches and agree on what done means before anything is built.',
    outputs: ['Scope and acceptance criteria', 'Architecture sketch', 'Delivery plan'],
  },
  {
    label: 'Crews',
    note: 'Specialist agents build',
    detail:
      'Specialist agent crews take each part of the build: interface, services, data and tests. They work in parallel, in small steps that can be reviewed.',
    outputs: ['Working increments', 'Automated tests', 'Build logs'],
  },
  {
    label: 'Checks',
    note: 'Commanders review',
    detail:
      'Our engineering leads review every change against the acceptance criteria. Nothing moves down the line without a human sign-off.',
    outputs: ['Code review', 'Security and performance checks', 'Sign-off record'],
  },
  {
    label: 'Ship',
    note: 'Deployed and holding up',
    detail:
      'We deploy to your infrastructure or ours, watch it in production and stay on the line while it settles.',
    outputs: ['Production deployment', 'Monitoring and alerts', 'Handover documentation'],
  },
];

// Numbered sheets in page order. The spec band and manifesto sit between them unnumbered.
export const STATIONS: StationDef[] = [
  { id: 'line', number: '01', label: 'The line' },
  { id: 'services', number: '02', label: 'Services' },
  { id: 'portfolio', number: '03', label: 'Portfolio' },
  { id: 'sectors', number: '04', label: 'Sectors' },
  { id: 'usecases', number: '05', label: 'Use cases' },
  { id: 'consultation', number: '06', label: 'Consultation' },
];

export const CONTACT_EMAILS = ['contact@zyniq.studio'];

export const SOCIALS = [
  { name: 'X', href: 'https://x.com/zyniq_solutions' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/zyniq-solutions' },
  { name: 'GitHub', href: 'https://github.com/ZYNIQ-AI-Driven-Development-Firm' },
  { name: 'Instagram', href: 'https://www.instagram.com/zyniq_solutions/' },
  { name: 'YouTube', href: 'https://www.youtube.com/@zyniq.solutions' },
  { name: 'Twitch', href: 'https://www.twitch.tv/zyniqsolutions' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@zyniq.solutions' },
  { name: 'Patreon', href: 'https://patreon.com/ZYNIQSolutions' },
];

export function station(id: string): StationDef {
  const found = STATIONS.find((s) => s.id === id);
  if (!found) throw new Error(`Unknown station: ${id}`);
  return found;
}
