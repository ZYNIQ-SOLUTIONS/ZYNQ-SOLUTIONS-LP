import { useRef } from 'react';
import type { PointerEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { CornerMarks } from '../components/blueprint/CornerMarks';
import { CONTAINER } from '../components/blueprint/layout';
import { STAGES } from '../content/site';

const HEADLINE = ['The future', 'is coded', 'by us.'];

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
              className="bp-crew"
              style={{ animationDelay: `${i * 0.18}s` }}
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

function FactorySchematic() {
  const height = STAGES.length * STEP - GAP + 2;
  return (
    <svg viewBox={`0 0 400 ${height}`} className="w-full max-w-md mx-auto lg:ml-auto lg:mr-0" aria-hidden="true">
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
            {i > 0 && (
              <g>
                <path d={`M60 ${y - GAP}v${GAP}`} stroke="var(--red)" strokeWidth="2" />
                <rect
                  x="56"
                  y={y - GAP - 4}
                  width="8"
                  height="8"
                  fill="var(--red)"
                  className="bp-flow"
                  style={{ animationDelay: `${i * 0.5}s` }}
                />
              </g>
            )}
            <rect x="1" y={y} width="350" height={BOX_H} fill="var(--paper-raised)" stroke="var(--ink)" strokeWidth="1.5" />
            <text x="18" y={y + 24} className="font-mono" fontSize="10" letterSpacing="2" fill="var(--red)">
              0{i + 1}
            </text>
            <text x="18" y={y + 52} className="font-display" fontSize="28" fontWeight="900" fill="var(--ink)">
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
  const frame = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLSpanElement>(null);

  // Drafting crosshair: follows a mouse inside the frame and reports its position.
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = frame.current;
    if (!el || e.pointerType !== 'mouse') return;
    const rect = el.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    el.style.setProperty('--cx', `${x}px`);
    el.style.setProperty('--cy', `${y}px`);
    el.dataset.tracking = 'true';
    if (readout.current) {
      readout.current.textContent = `X ${String(x).padStart(4, '0')} / Y ${String(y).padStart(4, '0')}`;
    }
  };

  const onPointerLeave = () => {
    if (frame.current) delete frame.current.dataset.tracking;
  };

  return (
    <section aria-labelledby="hero-title" className="py-10 sm:py-14 lg:py-16">
      <div className={CONTAINER}>
        <div
          ref={frame}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          className="group relative border border-rule bg-paper/60 px-5 py-8 sm:px-10 sm:py-12"
        >
          <CornerMarks />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-200 group-data-[tracking=true]:opacity-100"
          >
            <span className="absolute inset-y-0 w-px bg-red/40" style={{ left: 'var(--cx)' }} />
            <span className="absolute inset-x-0 h-px bg-red/40" style={{ top: 'var(--cy)' }} />
            <span ref={readout} className="bp-label !text-red absolute bottom-3 right-5">
              X 0000 / Y 0000
            </span>
          </div>

          <div className="relative bp-label flex justify-between gap-4">
            <span>Sheet 00 / Overview</span>
            <span className="hidden sm:inline">DWG 001-A</span>
          </div>

          <div className="relative mt-8 sm:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-7">
              <p className="bp-label !text-red font-semibold">AI-Driven Software Factory &amp; Innovation Lab</p>

              <h1
                id="hero-title"
                className="mt-5 font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(3.25rem,14vw,9rem)] lg:text-[clamp(5rem,9.5vw,9rem)]"
              >
                {HEADLINE.map((line, i) => (
                  <span key={line} className="block overflow-hidden pt-[0.05em]">
                    <motion.span
                      className={`block ${i === HEADLINE.length - 1 ? 'text-red' : ''}`}
                      initial={reduce ? false : { y: '105%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>

              {/* decorative dimension line under the headline */}
              <div aria-hidden="true" className="mt-6 flex items-center gap-3 max-w-md bp-label">
                <span className="h-3 w-px bg-muted" />
                <span className="h-px flex-1 bg-muted" />
                <span>Idea to shipped</span>
                <span className="h-px flex-1 bg-muted" />
                <span className="h-3 w-px bg-muted" />
              </div>

              <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted">
                We don’t just adapt to the future, we engineer it. Where ideas ship fast and hold up in the real world.
                Architecting synthetic brains to power universal discovery.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#consultation"
                  className="inline-flex items-center justify-center gap-2 bg-red text-white font-mono text-xs font-semibold uppercase tracking-[0.14em] px-7 py-4 hover:bg-ink hover:text-paper transition-colors"
                >
                  Start a build
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#sectors"
                  className="inline-flex items-center justify-center gap-2 border border-ink font-mono text-xs font-semibold uppercase tracking-[0.14em] px-7 py-4 hover:bg-ink hover:text-paper transition-colors"
                >
                  See the line
                  <ArrowDown className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <FactorySchematic />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
