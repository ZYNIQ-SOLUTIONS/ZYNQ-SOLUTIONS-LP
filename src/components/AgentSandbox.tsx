import { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, ShieldCheck, Terminal, Search, HelpCircle, Layers, CheckCircle2, ArrowRight, Radio, Cpu, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AgentStep, AgentPreset } from '../types';

const PRESETS: AgentPreset[] = [
  {
    id: 'arch-assembler',
    name: 'Architecture Assembler',
    category: 'ZYNIQ Core',
    objective: 'Analyze business requirements, map out enterprise-grade software architecture, and orchestrate Specialist Agents to build microservices.',
    initialSteps: [
      {
        id: 'step-1',
        type: 'thought',
        title: 'Ingesting Business Requirements',
        description: 'Analyzing PRD for "Global Payment Gateway System" and extracting core functional constraints.',
        timestamp: '00:00.12',
        metadata: { depth: 'System Level', priority: 'Critical' }
      },
      {
        id: 'step-2',
        type: 'action',
        title: 'Mapping Architectural Topology',
        description: 'Designing modular microservices layout with PostgreSQL database and Redis caching layer.',
        timestamp: '00:01.45',
        metadata: { nodes: 12, architecture: 'Event-Driven' }
      },
      {
        id: 'step-3',
        type: 'info',
        title: 'Contextual Memory Retrieve',
        description: 'Correlating retrieved patterns with existing memory vectors from previous financial enterprise deployments.',
        timestamp: '00:02.33',
        metadata: { matching_vectors: 8, precision: '0.991' }
      },
      {
        id: 'step-4',
        type: 'warning',
        title: 'Symbolic Policy Check',
        description: 'Detected a missing PCI-DSS compliance constraint in data storage tier. Flagged for strict encryption.',
        timestamp: '00:03.10',
        metadata: { policy: 'PCI-DSS-COMPLIANT', action: 'Enforcing AES-256' }
      },
      {
        id: 'step-5',
        type: 'action',
        title: 'Executing Orchestration',
        description: 'Commanding Backend Specialist Agent to generate authentication and ledger modules.',
        timestamp: '00:04.22',
        metadata: { sub_agents_deployed: 3, targets: 'auth, ledger, api-gateway' }
      },
      {
        id: 'step-6',
        type: 'success',
        title: 'Synthesis Output Compiled',
        description: 'Generated clean architecture manifests and deployed initial foundational codebase structures.',
        timestamp: '00:05.15'
      }
    ]
  },
  {
    id: 'backend-generator',
    name: 'Backend API Specialist',
    category: 'ZYNIQ Cloud',
    objective: 'Generate secure, scalable, and fully documented REST and GraphQL endpoints based on structural schemas.',
    initialSteps: [
      {
        id: 'step-1',
        type: 'thought',
        title: 'Initializing Code Generation Engine',
        description: 'Loading OpenAPI schemas and relational database models for the "Ledger Service".',
        timestamp: '00:00.08',
        metadata: { schema_entities: 14, language: 'TypeScript/Node.js' }
      },
      {
        id: 'step-2',
        type: 'action',
        title: 'Drafting Database Queries',
        description: 'Writing optimized SQL indices and query builders to handle high-throughput transactional records.',
        timestamp: '00:01.12',
        metadata: { queries_generated: 45, optimization_score: '98%' }
      },
      {
        id: 'step-3',
        type: 'warning',
        title: 'Anomaly Triggered',
        description: 'Detected potential race condition in transaction update loop. Re-routing logic for atomic database locks.',
        timestamp: '00:02.18',
        metadata: { class: 'ConcurrencyError', resolution: 'Applied Row-Level Locking' }
      },
      {
        id: 'step-4',
        type: 'action',
        title: 'Evaluating Containment Action',
        description: 'Simulating high-concurrency API load and verifying transaction atomic integrity.',
        timestamp: '00:03.05'
      },
      {
        id: 'step-5',
        type: 'success',
        title: 'Module Compiled & Deployed',
        description: 'Ledger API successfully generated, tested against 10k req/sec, and containerized for deployment.',
        timestamp: '00:04.10'
      }
    ]
  },
  {
    id: 'frontend-drafter',
    name: 'Frontend UI Specialist',
    category: 'ZYNIQ Studio',
    objective: 'Synthesize creative design tokens and generate pixel-perfect React components aligned with accessibility standards.',
    initialSteps: [
      {
        id: 'step-1',
        type: 'thought',
        title: 'Loading Design Directives',
        description: 'Accessing ZYNIQ Studio design tokens, color matrices, and typographic guidelines.',
        timestamp: '00:00.15',
        metadata: { theme: 'Industrial Dark', framework: 'React/Tailwind' }
      },
      {
        id: 'step-2',
        type: 'action',
        title: 'Mapping UI Components',
        description: 'Extracting dashboard layout structures and assembling primitive building blocks.',
        timestamp: '00:01.30',
        metadata: { components_scanned: 24, assembly_checks: 'Strict' }
      },
      {
        id: 'step-3',
        type: 'warning',
        title: 'Compliance Deviation Flagged',
        description: 'Found contrast ratio mismatch on secondary buttons (3.2:1). Adjusting text lightness to meet WCAG AA.',
        timestamp: '00:02.45',
        metadata: { severity: 'Medium', action: 'Contrast Auto-Corrected to 5.1:1' }
      },
      {
        id: 'step-4',
        type: 'action',
        title: 'Generating Responsive Views',
        description: 'Synthesizing mobile, tablet, and desktop layout logic for optimal fluid scaling.',
        timestamp: '00:03.45',
        metadata: { viewports_tested: 3, layout_shifts: 0 }
      },
      {
        id: 'step-5',
        type: 'success',
        title: 'Frontend Codebase Compiled',
        description: 'Dashboard views successfully generated and synchronized with core state management hooks.',
        timestamp: '00:05.10'
      }
    ]
  }
];

export default function AgentSandbox() {
  const [selectedPreset, setSelectedPreset] = useState<AgentPreset>(PRESETS[0]);
  const [customGoal, setCustomGoal] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [steps, setSteps] = useState<AgentStep[]>(PRESETS[0].initialSteps);
  const [logs, setLogs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'preset' | 'custom'>('preset');
  const [toolsState, setToolsState] = useState({
    webSearch: true,
    memoryCache: true,
    symbolicGuard: true,
  });

  const terminalContainerRef = useRef<HTMLDivElement | null>(null);

  // Initialize steps when preset changes
  useEffect(() => {
    if (activeTab === 'preset') {
      setSteps(selectedPreset.initialSteps);
      setCurrentStepIndex(-1);
      setIsRunning(false);
      setLogs([
        `[System] Sandbox initialized for: ${selectedPreset.name}`,
        `[Objective] ${selectedPreset.objective}`,
        `[Ready] Press 'Start Simulation' to begin.`
      ]);
    }
  }, [selectedPreset, activeTab]);

  // Handle auto-scroll of logs
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Execute steps step by step
  useEffect(() => {
    if (!isRunning) return;

    if (currentStepIndex < steps.length - 1) {
      const timer = setTimeout(() => {
        const nextIndex = currentStepIndex + 1;
        setCurrentStepIndex(nextIndex);
        const currentStep = steps[nextIndex];

        // Format nice logs
        const logTime = new Date().toLocaleTimeString();
        const actionPrefix = currentStep.type === 'action' ? '⚙️ [Tool]' :
                              currentStep.type === 'warning' ? '⚠️ [Audit]' :
                              currentStep.type === 'thought' ? '🧠 [Thinking]' : '✅ [System]';

        let metaString = '';
        if (currentStep.metadata) {
          metaString = ` ${JSON.stringify(currentStep.metadata)}`;
        }

        setLogs((prev) => [
          ...prev,
          `[${logTime}] ${actionPrefix} ${currentStep.title} - ${currentStep.description}${metaString}`
        ]);
      }, 1200);

      return () => clearTimeout(timer);
    } else {
      setIsRunning(false);
      setLogs((prev) => [...prev, `[System] --- Cycle completed successfully ---`]);
    }
  }, [isRunning, currentStepIndex, steps]);

  const handleStartSimulation = () => {
    if (activeTab === 'custom') {
      if (!customGoal.trim()) return;

      // Dynamically generate step sequence for user's custom goal
      const generatedSteps: AgentStep[] = [
        {
          id: 'c-1',
          type: 'thought',
          title: 'Goal Dissection & Logic Formulation',
          description: `Disassembling user goal: "${customGoal}" into specific sub-routines.`,
          timestamp: '00:00.10',
          metadata: { input_length: customGoal.length }
        },
        {
          id: 'c-2',
          type: 'action',
          title: 'Configuring Context Retrievers',
          description: 'Searching connected databases and local memory matrices for relevant operational guidelines.',
          timestamp: '00:01.30',
          metadata: { tools_active: toolsState.webSearch ? 'web_search, crawler' : 'none' }
        },
        {
          id: 'c-3',
          type: 'thought',
          title: 'Symbolic Policy Review',
          description: 'Aligning decision trees with internal system guardrails to guarantee safe output.',
          timestamp: '00:02.50',
          metadata: { status: 'Strict Rule Validation' }
        },
        {
          id: 'c-4',
          type: 'action',
          title: 'Synthesizing Solution Path',
          description: 'Processing structural code modifications, executing code sandboxes, and compiling output.',
          timestamp: '00:03.90',
          metadata: { compilation: 'Success' }
        },
        {
          id: 'c-5',
          type: 'success',
          title: 'Execution Complete',
          description: 'Successfully synthesized agent task outcome and saved output log to storage.',
          timestamp: '00:04.99'
        }
      ];

      setSteps(generatedSteps);
      setLogs([
        `[System] Initializing Custom Agent Loop...`,
        `[Objective] ${customGoal}`,
        `[Config] Web Search: ${toolsState.webSearch ? 'ON' : 'OFF'}, Symbolic Filter: ${toolsState.symbolicGuard ? 'ON' : 'OFF'}`
      ]);
      setCurrentStepIndex(-1);
      setIsRunning(true);
    } else {
      setLogs([
        `[System] Starting simulation for: ${selectedPreset.name}`,
        `[Objective] ${selectedPreset.objective}`
      ]);
      setCurrentStepIndex(-1);
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentStepIndex(-1);
    if (activeTab === 'preset') {
      setLogs([
        `[System] Reset complete.`,
        `[Objective] ${selectedPreset.objective}`
      ]);
    } else {
      setLogs([`[System] Reset complete. Input your custom instruction above.`]);
    }
  };

  return (
    <div id="agent-sandbox" className="relative bg-[#141414] border border-white/10 rounded-none overflow-hidden backdrop-blur-md p-6 lg:p-8">
      {/* Background radial highlight */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-accent/5 rounded-none filter blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Side: Controls & Input */}
        <div className="w-full lg:w-5/12 flex flex-col justify-between space-y-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-brand-accent/10 border border-brand-accent/20 text-brand-accent px-3 py-1 rounded-none text-xs font-mono mb-4">
              <Radio className="w-3 h-3 animate-pulse" />
              <span>// ZYNIQ Commander Sandbox v2.4</span>
            </div>

            <h3 className="text-2xl font-display font-black uppercase tracking-tight text-white leading-none italic">
              Test the Commander and Crews System
            </h3>
            <p className="text-brand-text-muted text-sm mt-2 leading-relaxed font-sans">
              Observe how our platform decomposes goals, invokes secure tools, logs operations, and audits logic rules in real-time.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex border-b border-white/10">
            <button
              id="sandbox-tab-preset"
              onClick={() => { setActiveTab('preset'); handleReset(); }}
              className={`pb-3 pr-6 text-sm font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                activeTab === 'preset'
                  ? 'border-brand-accent text-white'
                  : 'border-transparent text-brand-text-muted hover:text-white'
              }`}
            >
              System Presets
            </button>
            <button
              id="sandbox-tab-custom"
              onClick={() => { setActiveTab('custom'); handleReset(); }}
              className={`pb-3 px-6 text-sm font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                activeTab === 'custom'
                  ? 'border-brand-accent text-white'
                  : 'border-transparent text-brand-text-muted hover:text-white'
              }`}
            >
              Custom Goals
            </button>
          </div>

          <div className="flex-1">
            <AnimatePresence mode="wait">
              {activeTab === 'preset' ? (
                <motion.div
                  key="preset-panel"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 gap-2">
                    {PRESETS.map((preset) => (
                      <button
                        id={`preset-button-${preset.id}`}
                        key={preset.id}
                        onClick={() => {
                          if (!isRunning) setSelectedPreset(preset);
                        }}
                        disabled={isRunning}
                        className={`text-left p-3 rounded-none border transition-all flex items-start justify-between cursor-pointer ${
                          selectedPreset.id === preset.id
                            ? 'bg-brand-accent/5 border-brand-accent text-white'
                            : 'bg-black border-white/10 text-white/60 hover:border-white/30 hover:text-white'
                        }`}
                      >
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-mono text-brand-accent bg-brand-accent/10 px-1.5 py-0.5 rounded-none font-bold uppercase">
                              // {preset.category}
                            </span>
                          </div>
                          <h4 className="text-sm font-black uppercase tracking-tight mt-1.5 italic">{preset.name}</h4>
                          <p className="text-xs text-brand-text-muted mt-1 line-clamp-1 font-sans">
                            {preset.objective}
                          </p>
                        </div>
                        <ArrowRight className={`w-4 h-4 mt-1 transition-transform ${selectedPreset.id === preset.id ? 'translate-x-1 text-brand-accent' : 'opacity-40'}`} />
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="custom-panel"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <label htmlFor="custom-goal-input" className="text-xs font-mono text-white/40 font-bold uppercase tracking-wider block">// DEFINE AGENT GOAL</label>
                    <textarea
                      id="custom-goal-input"
                      value={customGoal}
                      onChange={(e) => setCustomGoal(e.target.value)}
                      disabled={isRunning}
                      placeholder="e.g. Gather today's top 5 news regarding nuclear fusion, align them with EU safety guidelines, and compile an executive summary..."
                      className="w-full h-32 bg-black border border-white/10 rounded-none p-3 text-sm text-white focus:outline-none focus:border-brand-accent transition-colors placeholder:text-zinc-600 resize-none font-mono"
                    />
                  </div>

                  {/* Feature toggles */}
                  <div className="bg-black border border-white/10 rounded-none p-3 space-y-2.5">
                    <span className="text-xs font-mono text-white/40 font-bold uppercase tracking-wider block">// ALLOWED PLATFORM TOOLSETS</span>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-white flex items-center gap-1.5"><Search className="w-3.5 h-3.5 text-brand-accent" /> Web Search API</span>
                      <button
                        id="toggle-web-search"
                        onClick={() => setToolsState(prev => ({ ...prev, webSearch: !prev.webSearch }))}
                        className={`w-8 h-4 rounded-none transition-colors relative cursor-pointer ${toolsState.webSearch ? 'bg-brand-accent' : 'bg-zinc-700'}`}
                      >
                        <span className={`w-3 h-3 bg-black rounded-none absolute top-0.5 transition-all ${toolsState.webSearch ? 'right-0.5' : 'left-0.5'}`} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-white flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-brand-accent" /> Context Cache Memory</span>
                      <button
                        id="toggle-memory-cache"
                        onClick={() => setToolsState(prev => ({ ...prev, memoryCache: !prev.memoryCache }))}
                        className={`w-8 h-4 rounded-none transition-colors relative cursor-pointer ${toolsState.memoryCache ? 'bg-brand-accent' : 'bg-zinc-700'}`}
                      >
                        <span className={`w-3 h-3 bg-black rounded-none absolute top-0.5 transition-all ${toolsState.memoryCache ? 'right-0.5' : 'left-0.5'}`} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-white flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-brand-accent" /> Symbolic Alignment Rules</span>
                      <button
                        id="toggle-symbolic-guard"
                        onClick={() => setToolsState(prev => ({ ...prev, symbolicGuard: !prev.symbolicGuard }))}
                        className={`w-8 h-4 rounded-none transition-colors relative cursor-pointer ${toolsState.symbolicGuard ? 'bg-brand-accent' : 'bg-zinc-700'}`}
                      >
                        <span className={`w-3 h-3 bg-black rounded-none absolute top-0.5 transition-all ${toolsState.symbolicGuard ? 'right-0.5' : 'left-0.5'}`} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/10">
            <button
              id="sandbox-run-button"
              onClick={handleStartSimulation}
              disabled={isRunning || (activeTab === 'custom' && !customGoal.trim())}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-none font-bold uppercase tracking-wider text-sm transition-all cursor-pointer ${
                isRunning
                  ? 'bg-white/10 text-white/40 cursor-not-allowed'
                  : 'bg-brand-accent text-black hover:bg-white hover:text-black hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]'
              }`}
            >
              {isRunning ? (
                <>
                  <Cpu className="w-4 h-4 animate-spin" />
                  <span>Processing Engine Cycles...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start Simulation</span>
                </>
              )}
            </button>
            <button
              id="sandbox-reset-button"
              onClick={handleReset}
              className="p-3 bg-black border border-white/10 rounded-none text-zinc-400 hover:text-white hover:border-white/30 transition-colors cursor-pointer"
              title="Reset Sandbox"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Side: Execution Visualization & Live Log Terminal */}
        <div className="w-full lg:w-7/12 flex flex-col gap-4">
          
          {/* Active Steps Progress Grid */}
          <div className="bg-black border border-white/10 rounded-none p-4">
            <span className="text-xs font-mono text-white/40 font-bold uppercase tracking-wider block mb-3">// COGNITIVE PATHWAY PROGRESS</span>
            <div className="space-y-2.5">
              {steps.map((step, idx) => {
                const isCompleted = idx <= currentStepIndex;
                const isActive = idx === currentStepIndex + 1 && isRunning;
                
                return (
                  <div
                    key={step.id}
                    className={`flex items-start gap-3 p-2.5 rounded-none border transition-all duration-300 ${
                      isCompleted
                        ? 'bg-brand-accent/[0.03] border-brand-accent/30 text-white'
                        : isActive
                        ? 'bg-brand-accent/[0.05] border-brand-accent animate-pulse text-white'
                        : 'bg-transparent border-transparent text-zinc-600'
                    }`}
                  >
                    <div className="mt-1">
                      {isCompleted ? (
                        <CheckCircle2 className="w-4.5 h-4.5 text-brand-accent shrink-0" />
                      ) : isActive ? (
                        <div className="w-4.5 h-4.5 rounded-none border-2 border-brand-accent border-t-transparent animate-spin shrink-0" />
                      ) : (
                        <div className="w-4.5 h-4.5 rounded-none border border-white/10 shrink-0 flex items-center justify-center text-[10px] font-mono">
                          {idx + 1}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h5 className={`text-xs font-bold font-mono uppercase tracking-wide ${isCompleted ? 'text-brand-accent' : isActive ? 'text-white font-black' : 'text-zinc-600'}`}>
                          {step.title}
                        </h5>
                        <span className="text-[10px] font-mono text-zinc-500">{step.timestamp}</span>
                      </div>
                      <p className={`text-xs mt-0.5 leading-normal font-sans ${isCompleted || isActive ? 'text-zinc-300' : 'text-zinc-600'}`}>
                        {step.description}
                      </p>
                      {step.metadata && isCompleted && (
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {Object.entries(step.metadata).map(([key, val]) => (
                            <span key={key} className="text-[9px] font-mono bg-[#141414] border border-white/10 text-white/50 px-1.5 py-0.5 rounded-none">
                              {key}: <span className="text-white/80">{val}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Terminal Logs Component */}
          <div className="flex-1 min-h-[220px] bg-black border border-white/10 rounded-none flex flex-col overflow-hidden font-mono text-xs">
            {/* Terminal Header */}
            <div className="bg-[#141414] border-b border-white/10 px-4 py-2 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-2">
                <Terminal className="w-3.5 h-3.5 text-brand-accent" />
                <span className="text-white/60 font-mono text-[11px] font-bold uppercase tracking-wide">// realtime_cognitive_logs.log</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-none bg-[#EF4444]" />
                <span className="w-2 h-2 rounded-none bg-[#F59E0B]" />
                <span className="w-2 h-2 rounded-none bg-brand-accent" />
              </div>
            </div>

            {/* Terminal Body */}
            <div ref={terminalContainerRef} className="flex-1 overflow-y-auto p-4 space-y-1.5 max-h-[260px] text-white/80">
              {logs.map((log, index) => {
                let textClass = 'text-white/80';
                if (log.startsWith('[System]')) {
                  textClass = 'text-brand-accent font-bold';
                } else if (log.includes('⚠️ [Audit]')) {
                  textClass = 'text-brand-accent font-bold';
                } else if (log.includes('⚙️ [Tool]')) {
                  textClass = 'text-brand-accent font-bold';
                } else if (log.includes('🧠 [Thinking]')) {
                  textClass = 'text-white/90';
                }
                return (
                  <div key={index} className={`leading-relaxed text-[11px] whitespace-pre-wrap ${textClass}`}>
                    {log}
                  </div>
                );
              })}
              {isRunning && (
                <div className="flex items-center space-x-1 text-brand-accent text-[11px] font-bold">
                  <span className="animate-pulse">●</span>
                  <span>Agent is actively executing logical operations...</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
