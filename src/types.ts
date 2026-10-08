export interface Brand {
  name: string;
  useCase: string;
}

export interface Stat {
  value: number;
  suffix: string;
  fill: number; // 0..1, how far the gauge arc is drawn
  label: string;
  note: string;
}

export interface Pillar {
  id: string;
  number: string;
  title: string;
  description: string;
  detailTitle: string;
  detailExplanation: string;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

export interface UseCase {
  id: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  metrics: {
    label: string;
    value: string;
  }[];
  mockConfig: {
    guidelines: string[];
    allowedTools: string[];
    sampleLogs: { time: string; text: string; type: 'system' | 'action' | 'success' }[];
  };
}

export interface StationDef {
  id: string;
  number: string;
  label: string;
}
