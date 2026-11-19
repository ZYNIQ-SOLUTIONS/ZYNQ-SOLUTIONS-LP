import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { StageGlyph } from '../components/blueprint/StageGlyph';
import { CornerMarks } from '../components/blueprint/CornerMarks';
import { LineDrawing } from '../components/blueprint/LineDrawing';
import { CONTAINER } from '../components/blueprint/layout';
import { STAGES } from '../content/site';

const HEADLINE = ['The future', 'is coded', 'by us'];

const BOX_H = 74;
const GAP = 38;
const STEP = BOX_H + GAP;

// Phones and tablets: the line stands upright, one stage under the next.
function FactorySchematic() {
  const height = STAGES.length * STEP - GAP + 2;
  return (
    <svg viewBox={`0 0 400 ${height}`} className="w-full max-w-md mx-auto" aria-hidden="true">
      {/* height dimension line */}
      <g stroke="var(--ink-muted)" strokeWidth="1" fill="none">
        <path d={`M388 1v${height - 2}M382 1h12M382 ${height - 1}h12`} />
      </g>
      <text
        x="372"
        y={height / 2}
        transform={`rotate(-90 372 ${height / 2})`}
        textAnchor="middle"
        className="font-mono"
        fontSize="9"
        letterSpacing="2"
        fill="var(--ink-muted)"
      >
        ONE LINE / FOUR STAGES
      </text>

      {STAGES.map((stage, i) => {
        const y = i * STEP + 1;
        return (
          <g key={stage.label}>
            {i > 0 && <path d={`M60 ${y - GAP}v${GAP}`} stroke="var(--ink)" strokeWidth="1.5" />}
            <rect x="1" y={y} width="350" height={BOX_H} fill="var(--paper-raised)" stroke="var(--ink)" strokeWidth="1.5" />
            <text x="18" y={y + 24} className="font-mono" fontSize="10" letterSpacing="1" fill="var(--ink-muted)">
              0{i + 1}
            </text>
            <text x="18" y={y + 52} className="font-display" fontSize="28" fontWeight="700" fill="var(--ink)">
              {stage.label.toUpperCase()}
            </text>
            <text x="150" y={y + 50} className="font-mono hidden sm:block" fontSize="9.5" letterSpacing="0.5" fill="var(--ink-muted)">
              {stage.note}
            </text>
            <g transform={`translate(300 ${y + 20})`}>
              <StageGlyph index={i} />
            </g>
          </g>
        );
      })}
    </svg>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="hero-title" className="pt-6 pb-10 sm:pt-10 sm:pb-16 lg:pt-8 lg:pb-20">
      <div className={CONTAINER}>
        <div className="relative border border-ink bg-paper/70 px-4 pt-8 pb-6 sm:px-10 sm:pt-12 sm:pb-8 lg:px-12 lg:pt-12">
          <CornerMarks />

          {/* Drawing header: what this sheet is, where it was drawn */}
          <div className="relative flex flex-wrap items-center justify-between gap-x-6 gap-y-2 pb-5 mb-8 sm:mb-10 border-b border-rule bp-label">
            <span>
              <span className="text-red font-semibold">00</span> / General arrangement
            </span>
            <span className="hidden sm:inline text-cyan">Software factory and innovation lab / Dubai, UAE</span>
            <span>Rev C</span>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 lg:gap-10 lg:items-end">
            <div className="lg:col-span-8">
              <h1
                id="hero-title"
                className="font-display font-black uppercase leading-[0.84] tracking-[-0.01em] text-[clamp(3.5rem,18vw,8.5rem)] lg:text-[clamp(6rem,10.5vw,11rem)]"
              >
                {HEADLINE.map((line, i) => (
                  <span key={line} className="block overflow-hidden pt-[0.04em]">
                    <motion.span
                      className={`block ${i === HEADLINE.length - 1 ? 'text-red' : ''}`}
                      initial={reduce ? false : { y: '100%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.55, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>
            </div>

            <div className="lg:col-span-4 lg:pb-3">
              <p className="mt-8 lg:mt-0 max-w-md text-lg xl:text-xl leading-relaxed text-muted">
                Custom software, AI models and automation, built by specialist agent crews and signed off by our
                engineering leads before it ships.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <a
                  href="#consultation"
                  className="inline-flex items-center justify-center gap-2 bg-red text-white text-sm font-medium hover:bg-ink hover:text-paper h-12 px-6 whitespace-nowrap bp-btn"
                >
                  Get free consultation
                  <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
                </a>
                <a
                  href="#line"
                  className="inline-flex items-center gap-2 min-h-11 font-mono text-xs font-medium underline decoration-1 underline-offset-4 hover:text-red transition-colors"
                >
                  See how the line works
                  <ArrowDown className="w-3.5 h-3.5" strokeWidth={1.75} />
                </a>
              </div>
            </div>
          </div>

          <div className="relative mt-10 lg:hidden">
            <FactorySchematic />
          </div>
          <div className="relative mt-12 hidden lg:block">
            <LineDrawing />
          </div>
        </div>
      </div>
    </section>
  );
}
