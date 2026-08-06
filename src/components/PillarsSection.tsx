import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, Cpu, ShieldAlert, Link, ChevronRight, Binary, ServerCrash, Key } from 'lucide-react';
import { Pillar } from '../types';

const PILLARS: Pillar[] = [
  {
    id: 'cloud',
    number: '[01]',
    title: 'ZYNIQ Cloud',
    description: 'Scale your infrastructure seamlessly. ZYNIQ Cloud provides the foundational compute and storage environment for Quantic operations.',
    detailTitle: 'Global Scalable Infrastructure',
    detailExplanation: 'Operate without limits. ZYNIQ Cloud handles the massive data flow and compute power needed to run synthetic brains and industrial-grade software pipelines globally, securely, and seamlessly.'
  },
  {
    id: 'core',
    number: '[02]',
    title: 'ZYNIQ Core',
    description: 'The algorithmic heart of the factory. ZYNIQ Core houses the intelligence engines that drive automated decision-making and discovery.',
    detailTitle: 'Central Intelligence Framework',
    detailExplanation: 'Where neural models meet symbolic reasoning. The Core acts as the foundational brain, orchestrating complex problem-solving routines and maintaining strict logic across all factory processes.'
  },
  {
    id: 'studio',
    number: '[03]',
    title: 'ZYNIQ Studio',
    description: 'The creative assembly line. ZYNIQ Studio brings human Commanders together with synthetic intelligence to design and shape reality.',
    detailTitle: 'Collaborative Engineering Environment',
    detailExplanation: 'The space where ideas take form. Studio provides the tools, interfaces, and visual environments for Commanders to instruct the Crews, shaping abstract concepts into tangible, deployable realities.'
  },
  {
    id: 'solutions',
    number: '[04]',
    title: 'ZYNIQ Solutions',
    description: 'At ZYNIQ Solutions, we architect transformation. We combine synthetic intelligence, niche problem-solving, and uncompromising quality.',
    detailTitle: 'Tailored Industrial Solutions',
    detailExplanation: 'From concept to code, we make the future tangible. ZYNIQ Solutions delivers powerful, intelligent platforms tailored to solve specific, complex enterprise challenges at scale.'
  }
];

export default function PillarsSection() {
  const [activePillarId, setActivePillarId] = useState<string>('cloud');
  const activePillar = PILLARS.find(p => p.id === activePillarId) || PILLARS[0];

  const handlePillarClick = (id: string) => {
    setActivePillarId(id);
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        const el = document.getElementById('pillar-details-panel');
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <div className="space-y-6">
      {/* Grid containing the Pillars cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {PILLARS.map((pillar) => {
          const isActive = pillar.id === activePillarId;
          return (
            <button
              id={`pillar-card-${pillar.id}`}
              key={pillar.id}
              onClick={() => handlePillarClick(pillar.id)}
              className={`text-left p-6 rounded-none border transition-all relative flex flex-col justify-between min-h-[220px] group overflow-hidden ${
                isActive
                  ? 'bg-surface border-brand-accent shadow-[0_0_20px_rgba(217,255,0,0.06)]'
                  : 'bg-surface/45 border-white/10 hover:border-white/30 hover:bg-surface'
              }`}
            >
              {/* Subtle top edge bar for active state */}
              <div className={`absolute top-0 left-0 right-0 h-[2px] transition-all duration-300 ${isActive ? 'bg-brand-accent' : 'bg-transparent'}`} />

              <div className="space-y-4">
                <span className="text-xs font-mono text-brand-accent tracking-wider block font-bold uppercase">
                  // {pillar.number.replace('[', '').replace(']', '')}
                </span>
                <h4 className="text-lg font-display font-black uppercase tracking-tight text-white group-hover:text-brand-accent transition-colors italic">
                  {pillar.title}
                </h4>
                <p className="text-brand-text-muted text-xs leading-relaxed line-clamp-3 font-sans">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 flex items-center text-xs font-mono text-brand-accent font-bold uppercase mt-auto opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Inspect Pipeline</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Under-the-hood Pipeline Explainer Area */}
      <div id="pillar-details-panel" className="bg-surface border border-white/10 rounded-none p-6 lg:p-8 relative overflow-hidden">
        {/* Subtle dot pattern inside the explainer */}
        <div className="absolute inset-0 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activePillarId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10"
          >
            {/* Explainer Left: Text */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-mono text-brand-accent bg-brand-accent/10 border border-brand-accent/20 px-2.5 py-0.5 rounded-none font-bold uppercase">
                  // PIPELINE DETAIL {activePillar.number.replace('[', '').replace(']', '')}
                </span>
                <div className="h-px bg-white/10 flex-1" />
              </div>
              <h4 className="text-2xl font-display font-black uppercase tracking-tight text-white italic">
                {activePillar.detailTitle}
              </h4>
              <p className="text-brand-text-muted text-sm leading-relaxed font-sans">
                {activePillar.detailExplanation}
              </p>
              
              <div className="pt-2">
                <span className="text-xs font-mono text-white/40 block uppercase tracking-widest font-bold">// COMPILING SPECIFICATION</span>
                <div className="flex gap-2 mt-2">
                  <span className="text-[10px] font-mono bg-black border border-white/10 px-2.5 py-1 rounded-none text-white/80 flex items-center gap-1.5 uppercase">
                    <Binary className="w-3.5 h-3.5 text-brand-accent" /> AST Engine
                  </span>
                  <span className="text-[10px] font-mono bg-black border border-white/10 px-2.5 py-1 rounded-none text-white/80 flex items-center gap-1.5 uppercase">
                    <ServerCrash className="w-3.5 h-3.5 text-brand-accent" /> gRPC Sandboxes
                  </span>
                </div>
              </div>
            </div>

            {/* Explainer Right: Interactive Visual Diagram */}
            <div className="lg:col-span-7 bg-black border border-white/10 rounded-none p-5 flex flex-col justify-between min-h-[220px]">
              
              {/* Context Memory Schema Visualizer */}
              {activePillarId === 'cloud' && (
                <div className="space-y-4 w-full flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-center text-[10px] font-mono border-b border-white/10 pb-2 text-white/40 font-bold">
                    <span>MEMORY VECTOR INDEX</span>
                    <span className="text-brand-accent flex items-center gap-1"><span className="w-1.5 h-1.5 bg-brand-accent rounded-none animate-ping" /> INDEX SYNCED</span>
                  </div>
                  
                  <div className="space-y-2 font-mono text-xs">
                    <div className="bg-surface border border-white/10 rounded-none p-2.5 flex items-start gap-3">
                      <div className="bg-brand-accent/10 text-brand-accent text-[9px] px-1.5 py-0.5 rounded-none font-bold uppercase mt-0.5">Session 14</div>
                      <div className="flex-1">
                        <div className="text-white font-bold">Cached API Token Header Key</div>
                        <div className="text-[10px] text-white/50 mt-0.5">token: "Bearer jwt_prod_7a1e..." (re-assigned: 2 mins ago)</div>
                      </div>
                    </div>
                    <div className="bg-surface border border-white/10 rounded-none p-2.5 flex items-start gap-3">
                      <div className="bg-brand-accent/10 text-brand-accent text-[9px] px-1.5 py-0.5 rounded-none font-bold uppercase mt-0.5">Session 03</div>
                      <div className="flex-1">
                        <div className="text-white font-bold">User Preferences Matrix</div>
                        <div className="text-[10px] text-white/50 mt-0.5">rules: [ "Enforce GDPR encryption", "Output: standard JSON" ]</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono pt-2 text-white/40 border-t border-white/10">
                    <span>COMPRESSION RATE: 94.2%</span>
                    <span>ACTIVE POOL: 4,096 BITS</span>
                  </div>
                </div>
              )}

              {/* Toolchain Ingestion Visualizer */}
              {activePillarId === 'core' && (
                <div className="space-y-4 w-full flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-center text-[10px] font-mono border-b border-white/10 pb-2 text-white/40 font-bold">
                    <span>API TOOL DEFINITION SCHEMA</span>
                    <span className="text-brand-accent uppercase font-bold">OPENAPI v3.0</span>
                  </div>

                  <div className="bg-surface border border-white/10 rounded-none p-3 font-mono text-xs text-white/70 space-y-1.5 overflow-x-auto">
                    <div><span className="text-brand-accent font-bold uppercase">POST</span> <span className="text-white">/api/v1/ledger-write</span></div>
                    <div className="text-white/40 pl-4">"description": "Post audited ledger transaction entry"</div>
                    <div className="pl-4">"parameters": &#123;</div>
                    <div className="pl-8">"amount": <span className="text-brand-accent">"Float"</span>, <span className="text-white/40">// strict boundary checked</span></div>
                    <div className="pl-8">"target_currency": <span className="text-brand-accent">"EUR | USD"</span></div>
                    <div className="pl-4">&#125;</div>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] font-mono text-white/40 pt-2 border-t border-white/10">
                    <span className="bg-brand-accent/10 text-brand-accent px-1.5 py-0.5 rounded-none font-bold">AUTO-BIND COMPLETED</span>
                    <span className="bg-white/10 text-white/70 px-1.5 py-0.5 rounded-none">gRPC SANDBOX CONSTRAINED</span>
                  </div>
                </div>
              )}

              {/* Symbolic Guard Visualizer */}
              {activePillarId === 'studio' && (
                <div className="space-y-4 w-full flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-center text-[10px] font-mono border-b border-white/10 pb-2 text-white/40 font-bold">
                    <span>DECLARATIVE RULES TREE VALIDATION</span>
                    <span className="text-brand-accent flex items-center gap-1">AST COMPILE</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded-none bg-brand-accent/5 border border-brand-accent/20 text-xs font-mono">
                      <div className="flex items-center gap-2 text-white">
                        <span className="w-2 h-2 rounded-none bg-brand-accent animate-pulse" />
                        <span>Rule-01: payload.amount &lt; 10000</span>
                      </div>
                      <span className="text-brand-accent text-[10px] font-bold">VERIFIED (PASS)</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-none bg-brand-accent/5 border border-brand-accent/20 text-xs font-mono">
                      <div className="flex items-center gap-2 text-white">
                        <span className="w-2 h-2 rounded-none bg-brand-accent animate-pulse" />
                        <span>Rule-02: payload.destination_country === allowed_countries</span>
                      </div>
                      <span className="text-brand-accent text-[10px] font-bold">VERIFIED (PASS)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono pt-2 text-white/40 border-t border-white/10">
                    <span>TOTAL AUDITED LOGIC NODES: 42</span>
                    <span className="text-brand-accent font-bold uppercase">SAFE STATE SECURED</span>
                  </div>
                </div>
              )}

              {/* Dynamic APIs Mesh Visualizer */}
              {activePillarId === 'solutions' && (
                <div className="space-y-4 w-full flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-center text-[10px] font-mono border-b border-white/10 pb-2 text-white/40 font-bold">
                    <span>SCHEMA EVOLUTION GRAPH</span>
                    <span className="text-brand-accent uppercase font-bold">RE-ALIGNING INSTANTLY</span>
                  </div>

                  <div className="flex justify-around items-center h-24 relative">
                    {/* Visual API schema realignment */}
                    <div className="text-center p-2 rounded-none bg-surface border border-white/10 w-24">
                      <span className="text-[10px] font-mono text-white/40 block">SOURCE SCHEMA</span>
                      <span className="text-xs font-mono font-bold text-white mt-1 block">id: "string"</span>
                    </div>
                    
                    <div className="flex-1 flex flex-col items-center justify-center">
                      <span className="text-[9px] font-mono text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-1 py-0.5 rounded-none font-bold">Auto-Map</span>
                      <div className="w-full h-px border-t border-dashed border-brand-accent relative my-2">
                        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-brand-accent rounded-none -translate-x-1/2 -translate-y-1/2 animate-ping" />
                      </div>
                    </div>

                    <div className="text-center p-2 rounded-none bg-surface border border-white/10 w-28">
                      <span className="text-[10px] font-mono text-white/40 block">EVOLVED DEST</span>
                      <span className="text-xs font-mono font-bold text-white mt-1 block">entity_id: "uuid"</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono pt-2 text-white/40 border-t border-white/10">
                    <span>REALIGNMENT DURATION: 14ms</span>
                    <span>TYPE CONVERTER: ACTIVE</span>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
