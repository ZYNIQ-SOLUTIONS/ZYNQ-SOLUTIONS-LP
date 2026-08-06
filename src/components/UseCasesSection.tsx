import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Play, FileText, Settings, ShieldAlert, Cpu, Check, Terminal, ExternalLink, Lightbulb } from 'lucide-react';
import { UseCase } from '../types';

const USE_CASES: UseCase[] = [
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

export default function UseCasesSection() {
  const [activeUseCaseId, setActiveUseCaseId] = useState<string>('prod-ops');
  const activeUseCase = USE_CASES.find(u => u.id === activeUseCaseId) || USE_CASES[0];

  return (
    <div id="usecases-section" className="flex flex-col lg:flex-row gap-8 items-stretch">
      
      {/* Left Accordion Column */}
      <div className="w-full lg:w-1/2 space-y-3">
        {USE_CASES.map((uc) => {
          const isOpen = uc.id === activeUseCaseId;
          return (
            <div
              key={uc.id}
              className={`rounded-none border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-[#141414] border-brand-accent shadow-[0_0_20px_rgba(217,255,0,0.06)]'
                  : 'bg-[#141414]/45 border-white/10 hover:border-white/30'
              }`}
            >
              <button
                id={`usecase-accordion-header-${uc.id}`}
                onClick={() => setActiveUseCaseId(uc.id)}
                className="w-full flex items-center justify-between p-5 text-left transition-colors cursor-pointer group"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-bold">// {uc.category}</span>
                  </div>
                  <h4 className={`text-base font-display font-black uppercase mt-1 transition-colors italic ${isOpen ? 'text-brand-accent' : 'text-white group-hover:text-brand-accent'}`}>
                    {uc.title}
                  </h4>
                </div>
                <div className={`p-2 rounded-none bg-black border border-white/10 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-accent border-brand-accent/30' : 'text-zinc-400'}`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-5 pb-5 pt-1 border-t border-white/10 space-y-4">
                      <p className="text-brand-text-muted text-xs leading-relaxed font-sans">
                        {uc.description}
                      </p>

                      {/* Performance Indicators Grid */}
                      <div className="grid grid-cols-3 gap-2.5 pt-2">
                        {uc.metrics.map((m, i) => (
                          <div key={i} className="bg-black border border-white/10 p-2.5 rounded-none text-center">
                            <span className="text-[10px] font-mono text-white/40 uppercase block tracking-tight font-bold">{m.label}</span>
                            <span className="text-sm font-black font-display text-white mt-0.5 block italic">{m.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Right Visual Console Workspace Column */}
      <div className="w-full lg:w-1/2 flex flex-col">
        <div className="bg-[#141414] border border-white/10 rounded-none p-5 lg:p-6 flex-1 flex flex-col justify-between overflow-hidden relative">
          
          {/* Subtle decoration elements */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-accent/5 rounded-none filter blur-2xl pointer-events-none" />

          {/* Active Workspace Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 shrink-0">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-none bg-brand-accent animate-pulse" />
              <span className="text-xs font-mono text-white font-bold uppercase tracking-wide">// Active Agent Console: {activeUseCase.title}</span>
            </div>
            <span className="text-[9px] font-mono bg-black border border-white/10 text-brand-accent px-2 py-0.5 rounded-none font-bold">
              SECURE WORKSPACE
            </span>
          </div>

          <div className="space-y-4 flex-1 flex flex-col justify-between">
            {/* Guidelines Card */}
            <div>
              <span className="text-[10px] font-mono text-white/40 uppercase block mb-2 tracking-widest font-bold">// GUIDING INSTRUCTIONS (SYMBOLIC ALIGNMENT)</span>
              <div className="space-y-1.5">
                {activeUseCase.mockConfig.guidelines.map((g, i) => (
                  <div key={i} className="flex items-start gap-2 bg-black border border-white/10 rounded-none p-2 text-xs">
                    <Check className="w-3.5 h-3.5 text-brand-accent shrink-0 mt-0.5" />
                    <span className="text-white/80 font-mono text-[11px] leading-tight">{g}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Allowed Toolsets */}
            <div>
              <span className="text-[10px] font-mono text-white/40 uppercase block mb-2 tracking-widest font-bold">// ACTIVE SYSTEM PRIVILEGES</span>
              <div className="flex flex-wrap gap-1.5">
                {activeUseCase.mockConfig.allowedTools.map((t, i) => (
                  <span key={i} className="text-[10px] font-mono bg-brand-accent/10 border border-brand-accent/20 text-brand-accent px-2 py-1 rounded-none font-bold uppercase">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Simulated Live Action Logs */}
            <div className="flex-1 min-h-[140px] bg-black border border-white/10 rounded-none p-3.5 flex flex-col justify-between font-mono text-[10px]">
              <div className="flex justify-between items-center text-white/40 border-b border-white/10 pb-1.5 mb-2 shrink-0">
                <span className="flex items-center gap-1.5"><Terminal className="w-3 h-3 text-brand-accent" /> log_stream_stdout</span>
                <span>STATE: LISTENING</span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-1.5 text-white/75 pr-1 max-h-[110px]">
                {activeUseCase.mockConfig.sampleLogs.map((log, index) => {
                  let textClass = 'text-white/75';
                  if (log.type === 'system') {
                    textClass = 'text-brand-accent font-bold';
                  } else if (log.type === 'success') {
                    textClass = 'text-brand-accent font-bold';
                  }
                  return (
                    <div key={index} className={`leading-normal ${textClass}`}>
                      [{log.time}] {log.text}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
