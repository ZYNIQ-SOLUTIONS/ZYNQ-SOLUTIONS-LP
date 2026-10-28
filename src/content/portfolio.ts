import { PortfolioCategory, PortfolioItem } from '../types';

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  'AI Platforms & Agents',
  'SaaS & Web Apps',
  'Brand & Digital Experiences',
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'z-olla-brain-gateway',
    code: 'BLD-01',
    title: 'Z-OLLA & Brain Gateway',
    subtitle: 'Unified Multi-Model AI Routing & Agentic Execution Platform',
    category: 'AI Platforms & Agents',
    division: 'ZYNIQ Core',
    year: '2026',
    status: 'Live Platform',
    featured: true,
    summary:
      'Centralized enterprise LLM routing engine with automated provider fallback, real-time token telemetry, and Mastra-powered autonomous agent orchestration.',
    challenge:
      'Production AI products suffered from single-provider outages, unpredictable token spend, and fragmented prompt pipelines across isolated microservices.',
    architecture:
      'Engineered an OpenAI-compatible HTTP gateway backed by LiteLLM, Kafka telemetry streams, and Keycloak SSO. Integrated deterministic provider fallback, per-tenant budget enforcement, and real-time cost observability.',
    metrics: [
      { label: 'Gateway Uptime', value: '99.98%' },
      { label: 'Failover Latency', value: '< 120ms' },
      { label: 'Inference Cost Reduction', value: '-42%' },
    ],
    stack: ['Python', 'FastAPI', 'LiteLLM', 'Mastra', 'Kafka', 'Docker', 'Keycloak'],
    deliverables: [
      'OpenAI-Compatible Brain Gateway Proxy',
      'Multi-Provider Key Rotation & Failover Engine',
      'Mastra Autonomous Agent Runtime',
      'Real-Time Token & Cost Telemetry Dashboard',
    ],
    schematic: 'gateway',
  },
  {
    id: 'izn-identity-platform',
    code: 'BLD-02',
    title: 'IZN Digital Identity',
    subtitle: 'Enterprise NFC Networking, Apple Wallet Passes & Lead CRM',
    category: 'SaaS & Web Apps',
    division: 'ZYNIQ Studio',
    year: '2026',
    status: 'Production',
    featured: true,
    summary:
      'Progressive web platform for instant professional networking with cryptographic Apple Wallet & Google Wallet pass generation, team role governance, and real-time lead capture.',
    challenge:
      'Executive teams needed a zero-friction digital identity platform that worked instantaneously via NFC or QR without requiring recipients to install a native mobile app.',
    architecture:
      'Built on Next.js 16 and Supabase with Row-Level Security (RLS) and RPC lead-capture pipelines. Engineered dynamic PKPass signing for Apple Wallet, automated vCard serialization, and multi-role organization workspaces.',
    metrics: [
      { label: 'Pass Generation', value: '< 400ms' },
      { label: 'Lead Capture Conversion', value: '3.4x' },
      { label: 'Lighthouse Performance', value: '99/100' },
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Apple PKPass', 'Tailwind CSS', 'PWA'],
    deliverables: [
      'Dynamic Apple & Google Wallet Pass Engine',
      'Multi-Tenant Team & Role Management',
      'Interactive Bento Profile Builder',
      'Public Lead Capture & Booking Pipeline',
    ],
    schematic: 'identity',
  },
  {
    id: 'flowy-workflow-builder',
    code: 'BLD-03',
    title: 'Flowy AI',
    subtitle: 'Visual Autonomous Workflow & Multi-Agent Pipeline Builder',
    category: 'AI Platforms & Agents',
    division: 'ZYNIQ Solutions',
    year: '2026',
    status: 'Live Platform',
    featured: true,
    summary:
      'Low-code cognitive workflow builder enabling operations teams to chain LLM reasoning nodes, webhook triggers, and database mutations into deterministic pipelines.',
    challenge:
      'Operations teams wanted to deploy multi-step AI automations without maintaining custom Python orchestration glue or risking uncontrolled agent loops.',
    architecture:
      'Architected a directed acyclic graph (DAG) execution engine in FastAPI paired with a reactive Next.js node canvas, MongoDB state persistence, and SSO authentication across the ZYNIQ Studio network.',
    metrics: [
      { label: 'Workflow Deployment', value: '8x Faster' },
      { label: 'Node Execution Overhead', value: '< 35ms' },
      { label: 'Pipeline Reliability', value: '99.9%' },
    ],
    stack: ['Next.js', 'FastAPI', 'MongoDB', 'OpenRouter', 'Docker', 'Caddy'],
    deliverables: [
      'Interactive Visual DAG Node Canvas',
      'Asynchronous Python Execution Worker Fleet',
      'Execution Trace & Step Replay Inspector',
      'Keycloak Enterprise SSO Integration',
    ],
    schematic: 'workflow',
    href: 'https://flowy.build',
  },
  {
    id: 'agent-t-autonomous-quant',
    code: 'BLD-04',
    title: 'Agent T',
    subtitle: 'Autonomous Market Telemetry & High-Volatility Grid Engine',
    category: 'AI Platforms & Agents',
    division: 'ZYNIQ Core',
    year: '2026',
    status: 'Shipped',
    featured: true,
    summary:
      'Real-time quantitative market scanner and autonomous grid execution system with strict risk guardrails, volatility anomaly detection, and live telemetry.',
    challenge:
      'Detecting high-velocity regime shifts across hundreds of trading pairs required sub-second stream ingestion and deterministic risk circuit-breakers.',
    architecture:
      'Engineered an event-driven Python stream processor with WebSocket orderbook ingestion, volatility scoring heuristics, automated grid allocation, and a real-time operator command terminal.',
    metrics: [
      { label: 'Pairs Monitored', value: '400+ Live' },
      { label: 'Signal Latency', value: '< 250ms' },
      { label: 'Risk Guardrail Enforcement', value: '100%' },
    ],
    stack: ['Python', 'WebSockets', 'FastAPI', 'React', 'Docker', 'PostgreSQL'],
    deliverables: [
      'Real-Time Volatility Scanner Module',
      'Automated Grid Bot Allocation Engine',
      'Deterministic Drawdown Circuit Breakers',
      'Operator Telemetry & Audit Dashboard',
    ],
    schematic: 'swarm',
  },
  {
    id: 'coachfit-ai-wellness',
    code: 'BLD-05',
    title: 'CoachFit AI',
    subtitle: 'Adaptive Biometric Coaching & Nutrition Intelligence Platform',
    category: 'SaaS & Web Apps',
    division: 'ZYNIQ Solutions',
    year: '2026',
    status: 'Shipped',
    featured: false,
    summary:
      'AI-powered athletic performance and nutrition platform that synthesizes training load, recovery metrics, and dietary logs into daily adaptive plans.',
    challenge:
      'Static workout templates fail when user recovery or schedule shifts; coaches needed an intelligent copilot that adapts programs in real time.',
    architecture:
      'Integrated multimodal Gemini AI reasoning with a reactive web application, structured progression tracking, and high-converting product marketing experience.',
    metrics: [
      { label: 'Plan Personalization', value: '< 3 Seconds' },
      { label: 'Athlete Retention Lift', value: '+64%' },
      { label: 'Coach Review Time', value: '-70%' },
    ],
    stack: ['React', 'TypeScript', 'Gemini AI', 'Tailwind CSS', 'Node.js'],
    deliverables: [
      'AI Training & Macro Adaptation Engine',
      'Athlete Progress & Readiness Dashboard',
      'Interactive Meal & Workout Telemetry Logs',
      'High-Conversion Product Launch Interface',
    ],
    schematic: 'coaching',
  },
  {
    id: 'hm-sweets-commerce',
    code: 'BLD-06',
    title: 'HM Sweets Artisanal Store',
    subtitle: 'Mobile-First Bespoke Confectionery Ordering & Catalog Experience',
    category: 'SaaS & Web Apps',
    division: 'ZYNIQ Studio',
    year: '2026',
    status: 'Shipped',
    featured: false,
    summary:
      'Frictionless mobile commerce application crafted for an artisanal confectionery brand, featuring instant box customization and streamlined checkout flows.',
    challenge:
      'Over 85% of customer traffic arrived from social mobile channels where slow multi-page checkouts caused high cart abandonment.',
    architecture:
      'Designed a tactile, thumb-zone optimized mobile storefront with instant category filtering, real-time custom assortment builders, and zero-latency state transitions.',
    metrics: [
      { label: 'Mobile Checkout Time', value: '< 45 Seconds' },
      { label: 'First Contentful Paint', value: '0.6s' },
      { label: 'Mobile Tap Target Score', value: '100%' },
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Motion', 'Vite'],
    deliverables: [
      'Mobile-First Interactive Product Catalog',
      'Custom Confectionery Box Configurator',
      'Instant Order Summary & WhatsApp/Direct Checkout',
      'Brand Visual Identity & Motion System',
    ],
    schematic: 'commerce',
  },
  {
    id: 'diamora-luxury-flagship',
    code: 'BLD-07',
    title: 'Diamora Flagship',
    subtitle: 'High-Jewelry & Luxury Real Estate Digital Showroom',
    category: 'Brand & Digital Experiences',
    division: 'ZYNIQ Studio',
    year: '2026',
    status: 'Shipped',
    featured: false,
    summary:
      'Editorial digital flagship combining high-contrast luxury typography, choreographed scroll reveals, and private concierge appointment booking.',
    challenge:
      'Translating the prestige of physical private viewings into a digital interface that qualifies high-net-worth inquiries without feeling transactional.',
    architecture:
      'Built an editorial-grade frontend with custom fluid typography scales, hardware-accelerated motion choreography, and a private consultation intake pipeline.',
    metrics: [
      { label: 'Frame Rate Stability', value: '60 FPS' },
      { label: 'Concierge Inquiry Lift', value: '+140%' },
      { label: 'Accessibility Compliance', value: 'WCAG AA' },
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Motion', 'Vite'],
    deliverables: [
      'Editorial Luxury Flagship Architecture',
      'Choreographed Lookbook & Collection Showcase',
      'Private Viewing & Concierge Booking Flow',
      'SEO & OpenGraph Social Card System',
    ],
    schematic: 'luxury',
  },
  {
    id: 'luckyprime-grooming-suite',
    code: 'BLD-08',
    title: 'LuckyPrime & Backyard Barbers',
    subtitle: 'Bespoke Grooming Brand Flagships & Instant Booking Systems',
    category: 'Brand & Digital Experiences',
    division: 'ZYNIQ Studio',
    year: '2026',
    status: 'Shipped',
    featured: false,
    summary:
      'Dual flagship digital experiences for premier grooming studios, pairing bold editorial aesthetics with direct chair-reservation workflows.',
    challenge:
      'Local flagship studios needed distinctive, non-template digital identities that turned Instagram discovery traffic directly into confirmed chair bookings.',
    architecture:
      'Engineered modular high-contrast brand surfaces with service menu matrices, barber specialist rosters, and sub-second static edge delivery.',
    metrics: [
      { label: 'Page Load Speed', value: '0.5s' },
      { label: 'Direct Booking Share', value: '+85%' },
      { label: 'Core Web Vitals', value: '100% Pass' },
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Netlify Edge'],
    deliverables: [
      'Custom Brand Direction & Design Tokens',
      'Interactive Service & Tier Matrix',
      'Direct Chair Reservation Flow',
      'Automated CI/CD Edge Deployment',
    ],
    schematic: 'brand',
  },
];
