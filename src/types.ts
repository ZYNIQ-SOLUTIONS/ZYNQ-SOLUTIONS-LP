export interface AgentStep {
  id: string;
  type: 'thought' | 'action' | 'callout' | 'success' | 'warning' | 'info';
  title: string;
  description: string;
  timestamp: string;
  duration?: number; // in ms
  metadata?: Record<string, string | number | boolean>;
}

export interface AgentPreset {
  id: string;
  name: string;
  category: string;
  objective: string;
  initialSteps: AgentStep[];
}

export interface Pillar {
  id: string;
  number: string;
  title: string;
  description: string;
  detailTitle: string;
  detailExplanation: string;
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
