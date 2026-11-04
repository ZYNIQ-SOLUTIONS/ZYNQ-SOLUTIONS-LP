import { Pillar } from '../types';

export const SECTORS: Pillar[] = [
  {
    id: 'cloud',
    number: '01',
    title: 'ZYNIQ Cloud',
    description: 'Foundational compute and storage environment engineered for distributed AI and backend operations.',
    detailTitle: 'Scalable Infrastructure',
    detailExplanation: 'Handles data flow and containerized compute pipelines needed to host agent swarms, model inference, and high-throughput production backends.',
    url: 'https://zyniq.cloud',
  },
  {
    id: 'core',
    number: '02',
    title: 'ZYNIQ Core',
    description: 'Decision and execution framework that orchestrates multi-agent tasks with deterministic validation.',
    detailTitle: 'Intelligence Framework',
    detailExplanation: 'Combines neural reasoning with strict compiler rules. Core coordinates agent task assignment, tool calling, and structured schema verification.',
  },
  {
    id: 'studio',
    number: '03',
    title: 'ZYNIQ Studio',
    description: 'Collaborative development environment where human engineering leads guide and review agent build outputs.',
    detailTitle: 'Engineering Assembly',
    detailExplanation: 'Provides inspectable review tooling, component workspaces, and validation suites so human leads verify generated code before deployment.',
  },
  {
    id: 'solutions',
    number: '04',
    title: 'ZYNIQ Solutions',
    description: 'Turnkey enterprise systems and custom agent integrations delivered to production requirements.',
    detailTitle: 'Production Deployments',
    detailExplanation: 'Delivers end-to-end custom systems: private models, internal automation pipelines, and full-stack software built to your technical specification.',
  },
];
