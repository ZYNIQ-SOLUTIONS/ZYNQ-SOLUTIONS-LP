import { UseCase } from '../types';

export const USE_CASES: UseCase[] = [
  {
    id: 'factory-pipeline',
    title: 'Automated Software Assembly',
    category: 'ZYNIQ Core',
    summary: 'Automate code generation, architectural validation, and module integration in the software factory.',
    description: 'Scanning project requirements, mapping flows to modular software architectures, and orchestrating Specialist Agents to assemble deployable code pipelines rapidly and deterministically.',
    metrics: [
      { label: 'Assembly Speed', value: '10x Faster' },
      { label: 'Architecture Consistency', value: '99.9%' },
      { label: 'Technical Debt Reduction', value: '-85%' }
    ],
    mockConfig: {
      guidelines: [
        'Analyze product flow actions against enterprise architecture standards.',
        'Orchestrate Specialist Agents for backend, frontend, and database schema.',
        'Validate API parameters conform to standard OpenAPI drafts.'
      ],
      allowedTools: ['Architecture Scanner', 'Code Generation Engine', 'Compiler Rule Validator'],
      sampleLogs: [
        { time: '10:00:12', text: 'Loaded Requirements: "Global User Authentication Service"', type: 'system' },
        { time: '10:00:13', text: 'Extracting user payment lifecycle loops...', type: 'action' },
        { time: '10:00:14', text: 'Cross-checking with Core database indices...', type: 'action' },
        { time: '10:00:14', text: 'Commanding Backend Specialist Agent to assemble module...', type: 'system' },
        { time: '10:00:15', text: 'Module successfully assembled and validated.', type: 'success' }
      ]
    }
  },
  {
    id: 'innovation-lab',
    title: 'Quantic Discovery Engine',
    category: 'Innovation Lab',
    summary: 'Automate R&D synthesis, parse massive datasets, and generate new algorithmic solutions to impossible problems.',
    description: 'Continuously listening to scientific telemetry, executing automated heuristics to diagnose system halts, and discovering entirely new ways to structure synthetic intelligence.',
    metrics: [
      { label: 'Data Synthesis Rate', value: '1M+ Docs/hr' },
      { label: 'Novel Pattern Discovery', value: '+300%' },
      { label: 'Hypothesis Generation', value: '< 2 Minutes' }
    ],
    mockConfig: {
      guidelines: [
        'Audit unstructured research telemetry and vector clusters.',
        'Isolate anomalies triggering novel pattern alerts.',
        'Draft experimental Quantic logic flow hypothesis.'
      ],
      allowedTools: ['Telemetry Scanner', 'Neural-Symbolic Synthesizer', 'Pattern Engine'],
      sampleLogs: [
        { time: '14:22:01', text: 'Monitoring global research telemetry indices...', type: 'system' },
        { time: '14:22:03', text: 'Detected novel vector anomaly in Cluster 91b...', type: 'system' },
        { time: '14:22:04', text: 'Running automated hypothesis generation on pattern 91b.', type: 'action' },
        { time: '14:22:05', text: 'Hypothesis formed. Diverted to Commanders for review.', type: 'success' }
      ]
    }
  },
  {
    id: 'studio-creative',
    title: 'Studio Creative Crews',
    category: 'ZYNIQ Studio',
    summary: 'Collaborate with human Commanders to design UI/UX, generate visual assets, and build interactive environments.',
    description: 'Synthesizing creative briefs, generating pixel-perfect user interfaces, evaluating alignment with brand identity, and preparing deployable frontend code for engineering.',
    metrics: [
      { label: 'Design-to-Code Speed', value: '< 5 Seconds' },
      { label: 'Brand Alignment', value: '100%' },
      { label: 'Iteration Cycles', value: '10x Faster' }
    ],
    mockConfig: {
      guidelines: [
        'Retrieve brand identity guidelines and color matrices.',
        'Validate UI component generation against accessibility standards.',
        'Formulate deployable React and Tailwind code structures.'
      ],
      allowedTools: ['UI Generation Engine', 'Design System Lexicon', 'React Drafter'],
      sampleLogs: [
        { time: '09:12:30', text: 'Ingested creative brief: "Interactive Dashboard for Data Analysis"', type: 'system' },
        { time: '09:12:31', text: 'Pulling design tokens from ZYNIQ Studio Ledger...', type: 'action' },
        { time: '09:12:32', text: 'Validating contrast ratios against WCAG guidelines.', type: 'action' },
        { time: '09:12:32', text: 'Status: Component structure generated and validated.', type: 'system' },
        { time: '09:12:33', text: 'Compiled draft frontend codebase. Ready for Commander review.', type: 'success' }
      ]
    }
  },
  {
    id: 'cloud-ops',
    title: 'Cloud Orchestration Fleet',
    category: 'ZYNIQ Cloud',
    summary: 'Automate cross-border node validations and scale infrastructure against dynamic load matrices.',
    description: 'Scanning network logs for discrepancies, validating load parameters against global computing directives, and scaling infrastructure automatically with zero downtime.',
    metrics: [
      { label: 'Network Audit Volume', value: '500,000/sec' },
      { label: 'Uptime Reliability', value: '99.999%' },
      { label: 'Auto-Scale Response', value: '< 1.5 Seconds' }
    ],
    mockConfig: {
      guidelines: [
        'Scan incoming global traffic payloads for routing efficiency.',
        'Cross-reference values with active EU watchlists.',
        'Prepare isolated audit summaries for suspicious entities.'
      ],
      allowedTools: ['SWIFT Parser', 'Watchlist database API', 'Report Generator'],
      sampleLogs: [
        { time: '11:45:00', text: 'Starting hourly transaction audit session...', type: 'system' },
        { time: '11:45:01', text: 'Scanned 14,082 payment registries.', type: 'action' },
        { time: '11:45:02', text: 'Verified SWIFT structures against ISO 20022 schemas.', type: 'action' },
        { time: '11:45:03', text: 'All transaction codes valid. Compliance status clear.', type: 'success' }
      ]
    }
  }
];
