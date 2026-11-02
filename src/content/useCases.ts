import { UseCase } from '../types';

export const USE_CASES: UseCase[] = [
  {
    id: 'factory-pipeline',
    title: 'Automated Code Generation & CI',
    category: 'ZYNIQ Core',
    summary: 'Automate boilerplate code generation, architectural validation, and module integration in the factory pipeline.',
    description: 'Parses project requirements, maps flows to modular architectures, and coordinates specialist agents to assemble deployable code pipelines with static validation.',
    metrics: [
      { label: 'Assembly Speed', value: '10x Faster' },
      { label: 'Architecture Consistency', value: '99.9%' },
      { label: 'Technical Debt Reduction', value: '-85%' },
    ],
    mockConfig: {
      guidelines: [
        'Analyze product flow actions against repository architecture standards.',
        'Orchestrate specialist agents for backend, frontend, and database schema.',
        'Validate API parameters conform to standard OpenAPI specifications.',
      ],
      allowedTools: ['Architecture Scanner', 'Code Generation Engine', 'Compiler Rule Validator'],
      sampleLogs: [
        { time: '10:00:12', text: 'Loaded Requirements: "Global User Authentication Service"', type: 'system' },
        { time: '10:00:13', text: 'Extracting user payment lifecycle loops...', type: 'action' },
        { time: '10:00:14', text: 'Cross-checking with Core database indices...', type: 'action' },
        { time: '10:00:14', text: 'Commanding Backend Specialist Agent to assemble module...', type: 'system' },
        { time: '10:00:15', text: 'Module successfully assembled and validated.', type: 'success' },
      ],
    },
  },
  {
    id: 'innovation-lab',
    title: 'Telemetry & Anomaly Analysis',
    category: 'Innovation Lab',
    summary: 'Automate telemetry synthesis, parse large datasets, and identify systemic performance anomalies.',
    description: 'Continuously monitors system metrics, runs automated diagnostics on system halts, and synthesizes root-cause analyses for engineering teams.',
    metrics: [
      { label: 'Data Synthesis Rate', value: '1M+ Docs/hr' },
      { label: 'Anomaly Detection', value: '+300%' },
      { label: 'Diagnostic Speed', value: '< 2 Minutes' },
    ],
    mockConfig: {
      guidelines: [
        'Audit unstructured telemetry and log vectors.',
        'Isolate anomalies triggering performance threshold alerts.',
        'Draft experimental diagnostic hypotheses.',
      ],
      allowedTools: ['Telemetry Scanner', 'Neural-Symbolic Synthesizer', 'Pattern Engine'],
      sampleLogs: [
        { time: '14:22:01', text: 'Monitoring global research telemetry indices...', type: 'system' },
        { time: '14:22:03', text: 'Detected vector anomaly in Cluster 91b...', type: 'system' },
        { time: '14:22:04', text: 'Running automated hypothesis generation on pattern 91b.', type: 'action' },
        { time: '14:22:05', text: 'Hypothesis formed. Forwarded to leads for review.', type: 'success' },
      ],
    },
  },
  {
    id: 'studio-creative',
    title: 'Design-to-Code Pipeline',
    category: 'ZYNIQ Studio',
    summary: 'Translate Figma and specification tokens into responsive, accessible UI components.',
    description: 'Takes design briefs, extracts design tokens, validates WCAG contrast ratios, and outputs clean Tailwind and React component code.',
    metrics: [
      { label: 'Design-to-Code Speed', value: '< 5 Seconds' },
      { label: 'Brand Alignment', value: '100%' },
      { label: 'Iteration Cycles', value: '10x Faster' },
    ],
    mockConfig: {
      guidelines: [
        'Retrieve brand identity guidelines and color tokens.',
        'Validate UI component generation against WCAG accessibility standards.',
        'Formulate deployable React and Tailwind component structures.',
      ],
      allowedTools: ['UI Generation Engine', 'Design System Lexicon', 'React Drafter'],
      sampleLogs: [
        { time: '09:12:30', text: 'Ingested creative brief: "Interactive Dashboard for Data Analysis"', type: 'system' },
        { time: '09:12:31', text: 'Pulling design tokens from ZYNIQ Studio Ledger...', type: 'action' },
        { time: '09:12:32', text: 'Validating contrast ratios against WCAG guidelines.', type: 'action' },
        { time: '09:12:32', text: 'Status: Component structure generated and validated.', type: 'system' },
        { time: '09:12:33', text: 'Compiled draft frontend codebase. Ready for lead review.', type: 'success' },
      ],
    },
  },
  {
    id: 'cloud-ops',
    title: 'Cloud Orchestration Fleet',
    category: 'ZYNIQ Cloud',
    summary: 'Automate node validations and scale infrastructure based on real-time load matrices.',
    description: 'Monitors network telemetry, balances loads against regional constraints, and scales containerized clusters with zero downtime.',
    metrics: [
      { label: 'Network Audit Volume', value: '500,000/sec' },
      { label: 'Uptime Reliability', value: '99.999%' },
      { label: 'Auto-Scale Response', value: '< 1.5 Seconds' },
    ],
    mockConfig: {
      guidelines: [
        'Scan incoming network traffic for routing efficiency.',
        'Cross-reference node health with regional capacity thresholds.',
        'Prepare isolated scaling summaries for overloaded regions.',
      ],
      allowedTools: ['Traffic Analyzer', 'Capacity Planner', 'Report Generator'],
      sampleLogs: [
        { time: '11:45:00', text: 'Starting hourly capacity audit session...', type: 'system' },
        { time: '11:45:01', text: 'Scanned 14,082 active nodes.', type: 'action' },
        { time: '11:45:02', text: 'Verified load parameters against regional capacity limits.', type: 'action' },
        { time: '11:45:03', text: 'All regions within thresholds. Scaling status clear.', type: 'success' },
      ],
    },
  },
];
