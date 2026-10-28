import { PortfolioCategory, PortfolioItem } from '../types';

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  'AI Platforms & Agents',
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'z-olla',
    code: 'BLD-01',
    title: 'Z-OLLA',
    subtitle: 'Autonomous AI Assistant, Multi-Model Routing & Persistent Memory Ecosystem',
    category: 'AI Platforms & Agents',
    division: 'ZYNIQ Core',
    year: '2026',
    status: 'Live Platform',
    featured: true,
    summary:
      'Enterprise AI workspace and orchestration platform combining LiteLLM multi-provider routing, Letta autonomous long-term memory, pgvector semantic search, and MCP tool execution under Keycloak SSO.',
    challenge:
      'Enterprise teams needed a sovereign, self-hosted AI assistant and routing core capable of switching between cloud and local LLMs seamlessly while retaining long-term semantic memory, document context, and full MCP tool observability.',
    architecture:
      'Engineered an 8-service containerized topology (FastAPI, Next.js, LiteLLM, Letta, Ollama, PostgreSQL 16 + pgvector, Redis, and MinIO) behind Caddy auto-TLS and Keycloak JWT authentication, achieving <10ms routing overhead and 40–60ms IVFFlat vector retrieval.',
    metrics: [
      { label: 'Routing Overhead', value: '5–10ms' },
      { label: 'Vector Search', value: '40–60ms' },
      { label: 'Core Services', value: '8 Containers' },
    ],
    stack: [
      'Python',
      'FastAPI',
      'Next.js',
      'LiteLLM',
      'Letta',
      'Ollama',
      'PostgreSQL + pgvector',
      'Redis',
      'MinIO',
      'Keycloak SSO',
    ],
    deliverables: [
      'ZOLLA DROID Interactive AI Workspace & Markdown Chat UI',
      'LiteLLM Multi-Provider Gateway & Local Ollama Embedding Pipeline',
      'Letta Autonomous Memory & pgvector IVFFlat Semantic Retrieval',
      'MCP Server Tool Registry, Execution Engine & Per-MCP Telemetry',
      '8-Container Production Docker Topology with Automated Migrations',
    ],
    schematic: 'gateway',
    href: 'https://olla.zyniq.cloud',
  },
];
