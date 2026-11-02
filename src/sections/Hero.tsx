import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { CornerMarks } from '../components/blueprint/CornerMarks';
import { LineDrawing } from '../components/blueprint/LineDrawing';
import { CONTAINER } from '../components/blueprint/layout';
import { STAGES } from '../content/site';

const HEADLINE = ['The future', 'is coded', 'by us'];

const BOX_H = 74;
const GAP = 38;
const STEP = BOX_H + GAP;

function StageGlyph({ index }: { index: number }) {
  const ink = 'var(--ink)';
  switch (index) {
    case 0: // a brief: a sheet with lines
      return (
        <g fill="none" stroke={ink} strokeWidth="1.5">
          <rect x="0" y="0" width="26" height="34" />
          <path d="M6 9h14M6 16h14M6 23h9" />
        </g>
      );
    case 1: // crew of seven
      return (
        <g>
          {Array.from({ length: 7 }, (_, i) => (
            <rect
              key={i}
              x={(i % 4) * 11 + (i > 3 ? 5.5 : 0)}
              y={i > 3 ? 20 : 6}
              width="8"
              height="8"
              fill="var(--red)"
            />
          ))}
        </g>
      );
    case 2: // checks
      return (
        <g fill="none" stroke={ink} strokeWidth="1.5">
          <rect x="0" y="4" width="11" height="11" />
          <rect x="0" y="21" width="11" height="11" />
          <path d="M2.5 9.5l2.5 2.5 4-5M2.5 26.5l2.5 2.5 4-5" stroke="var(--red)" />
          <path d="M17 9.5h18M17 26.5h18" />
        </g>
      );
    default: // ship
      return (
        <g fill="none" stroke={ink} strokeWidth="1.5">
          <path d="M4 30L30 4M12 4h18v18" />
        </g>
      );
  }
}

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
            <text x="18" y={y + 52} className="font-display" fontSize="28" fontWeight="600" fill="var(--ink)">
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
    <section aria-labelledby="hero-title" className="py-6 sm:py-12 lg:py-8">
      <div className={CONTAINER}>
        <div className="relative border border-rule bg-paper/60 px-4 py-8 sm:px-10 sm:py-12 lg:py-10">
          <CornerMarks />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 lg:gap-8 lg:items-end">
            <div className="lg:col-span-8">
              <p className="bp-label">Software factory and innovation lab, Dubai</p>

              <h1
                id="hero-title"
                className="mt-4 font-display font-semibold uppercase leading-[0.88] tracking-tight text-[clamp(3.25rem,17vw,8rem)] lg:text-[clamp(5rem,9vw,9rem)]"
              >
                {HEADLINE.map((line, i) => (
                  <span key={line} className="block overflow-hidden pt-[0.04em]">
                    <motion.span
                      className={`block ${i === HEADLINE.length - 1 ? 'text-red' : ''}`}
                      initial={reduce ? false : { y: '100%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>
            </div>

            <div className="lg:col-span-4 lg:pb-2">
              <p className="mt-6 max-w-xl text-lg lg:text-base xl:text-lg leading-relaxed text-muted">
                Custom software, AI models and automation, built by specialist agent crews and reviewed by our leads
                before it ships.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row lg:flex-col gap-3">
                <a
                  href="#consultation"
                  className="inline-flex items-center justify-center gap-2 bg-red text-white text-sm font-medium hover:bg-ink hover:text-paper h-12 px-6 whitespace-nowrap bp-btn"
                >
                  Get free consultation
                  <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
                </a>
                <a
                  href="#sectors"
                  className="inline-flex items-center justify-center gap-2 border border-ink text-sm font-medium hover:bg-ink hover:text-paper h-12 px-6 whitespace-nowrap bp-btn"
                >
                  See the line
                  <ArrowDown className="w-4 h-4" strokeWidth={1.75} />
                </a>
              </div>
            </div>
          </div>

          <div className="relative mt-10 lg:hidden">
            <FactorySchematic />
          </div>
          <div className="relative mt-8 hidden lg:block">
            <LineDrawing />
          </div>
        </div>
      </div>
    </section>
  );
}
