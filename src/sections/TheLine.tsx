import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, RefObject } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { StageGlyph } from '../components/blueprint/StageGlyph';
import { Station } from '../components/blueprint/Station';
import { STAGES, station } from '../content/site';

// Scroll distance given to each stage while the sheet is pinned, in viewport heights.
const PER_STAGE_VH = 75;

const BOX_W = 132;
const BOX_H = 150;
const PITCH = 156;
const LEFT = 16;
const BOX_Y = 74;
const BELT_Y = 268;

// Plan view of the line. Stages behind the cursor are passed, the current one is
// inked in, and the ones ahead are still dashed outlines on the drawing.
function LinePlan({ active, progress }: { active: number; progress: number }) {
  const beltStart = LEFT;
  const beltEnd = LEFT + PITCH * (STAGES.length - 1) + BOX_W;
  const beltFill = beltStart + (beltEnd - beltStart) * progress;

  return (
    <svg viewBox="0 0 640 320" className="w-full h-full max-h-full" aria-hidden="true" fill="none" strokeWidth="1.5">
      {/* progress dimension */}
      <g stroke="var(--cyan)" strokeWidth="1">
        <path d={`M${beltStart} 30H${beltEnd}M${beltStart} 24v12M${beltEnd} 24v12`} />
        <path d={`M${beltFill} 22v16`} strokeWidth="1.5" />
      </g>
      <text x={beltStart} y="16" fill="var(--cyan)" stroke="none" className="font-mono" fontSize="10" letterSpacing="2">
        STAGE {String(active + 1).padStart(2, '0')} / {String(STAGES.length).padStart(2, '0')}
      </text>
      <text x={beltEnd} y="16" textAnchor="end" fill="var(--cyan)" stroke="none" className="font-mono" fontSize="10" letterSpacing="2">
        {Math.round(progress * 100)}% ALONG THE LINE
      </text>

      {/* belt */}
      <rect x={beltStart} y={BELT_Y} width={beltEnd - beltStart} height="10" fill="var(--paper-raised)" stroke="var(--ink)" />
      <rect x={beltStart} y={BELT_Y} width={beltFill - beltStart} height="10" fill="var(--red)" />
      {STAGES.map((_, i) => {
        const cx = LEFT + i * PITCH + BOX_W / 2;
        return <path key={i} d={`M${cx} ${BOX_Y + BOX_H}V${BELT_Y}`} stroke="var(--ink)" strokeDasharray="3 4" />;
      })}

      {STAGES.map((stage, i) => {
        const x = LEFT + i * PITCH;
        const done = i < active;
        const current = i === active;
        // The current housing is inked in solid; inside it ink and paper swap so the
        // label and glyph stay readable.
        const swap = current ? ({ '--ink': 'var(--paper)' } as CSSProperties) : undefined;
        return (
          <g key={stage.label} transform={`translate(${x} ${BOX_Y})`}>
            <rect
              width={BOX_W}
              height={BOX_H}
              fill={current ? 'var(--ink)' : 'var(--paper-raised)'}
              stroke="var(--ink)"
              strokeDasharray={!done && !current ? '5 4' : undefined}
            />
            {current && <rect width={BOX_W} height="3" fill="var(--red)" />}
            <g style={swap}>
            <path d={`M0 26h${BOX_W}`} stroke="var(--ink)" />
            <text x="10" y="18" fill="var(--red)" stroke="none" className="font-mono" fontSize="10" letterSpacing="2">
              0{i + 1}
            </text>
            <text x="34" y="18" fill="var(--ink)" stroke="none" className="font-display" fontSize="15" fontWeight="700" letterSpacing="1">
              {stage.label.toUpperCase()}
            </text>
            <g transform={`translate(${BOX_W / 2 - 26} ${BOX_H / 2 - 12}) scale(1.4)`} opacity={!done && !current ? 0.35 : 1}>
              <StageGlyph index={i} />
            </g>
            {done && (
              <g transform={`translate(${BOX_W - 64} ${BOX_H - 26})`}>
                <rect width="54" height="16" fill="none" stroke="var(--red)" />
                <text x="27" y="11.5" textAnchor="middle" fill="var(--red)" stroke="none" className="font-mono" fontSize="8.5" fontWeight="600" letterSpacing="1.5">
                  PASSED
                </text>
              </g>
            )}
            </g>
          </g>
        );
      })}
    </svg>
  );
}

function Outputs({ items }: { items: string[] }) {
  return (
    <ul className="border-t border-rule">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 py-2.5 border-b border-rule text-sm font-medium">
          <span aria-hidden="true" className="mt-1.5 w-1.5 h-1.5 bg-red shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function usePinnedProgress(track: RefObject<HTMLDivElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = track.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const range = el.offsetHeight - window.innerHeight;
        const p = range > 0 ? -rect.top / range : 0;
        setProgress(Math.max(0, Math.min(1, p)));
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [track]);

  return progress;
}

export function TheLine() {
  const reduce = useReducedMotion();
  const track = useRef<HTMLDivElement>(null);
  const progress = usePinnedProgress(track);
  const active = Math.min(STAGES.length - 1, Math.floor(progress * STAGES.length));
  const stage = STAGES[active];

  // Jump the scroll position to the middle of a stage's stretch of the track.
  const goTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    const range = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + range * ((i + 0.5) / STAGES.length), behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <Station
      {...station('line')}
      title="One line, idea to shipped"
      intro="Every project runs down the same line. Agent crews do the building, our engineering leads sign off each stage, and you can see where your work is at every step."
      spacing="loose"
      drawn="Studio"
    >
      {/* Desktop: the sheet pins while the line advances one stage at a time */}
      <div
        ref={track}
        className="hidden lg:block relative"
        style={{ height: `calc(100svh + ${PER_STAGE_VH * (STAGES.length - 1)}svh)` }}
      >
        <div className="sticky top-16 h-[calc(100svh-4rem)] flex flex-col justify-center py-8">
          <div className="grid grid-cols-12 gap-10 items-center border border-ink bg-raised p-10 xl:p-12 min-h-0">
            <div className="col-span-5 min-w-0">
              <ol className="flex gap-1.5 mb-8" aria-label="Stages">
                {STAGES.map((s, i) => (
                  <li key={s.label} className="flex-1">
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={i === active ? 'step' : undefined}
                      className="group w-full text-left cursor-pointer"
                    >
                      <span
                        className={`block h-1 transition-colors ${i <= active ? 'bg-red' : 'bg-rule group-hover:bg-ink/40'}`}
                      />
                      <span
                        className={`mt-2 block font-mono text-[10px] ${i === active ? 'text-ink font-semibold' : 'text-muted'}`}
                      >
                        0{i + 1} {s.label}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={stage.label}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-end gap-5">
                    <span className="font-display font-black text-[7rem] xl:text-[9rem] leading-[0.8] text-red tabular-nums">
                      0{active + 1}
                    </span>
                    <span className="pb-2 bp-label">{stage.note}</span>
                  </div>
                  <h3 className="mt-4 font-display font-black uppercase text-6xl xl:text-7xl leading-[0.85] tracking-tight">
                    {stage.label}
                  </h3>
                  <p className="mt-5 text-base xl:text-lg text-muted leading-relaxed max-w-md">{stage.detail}</p>
                  <div className="mt-6 max-w-md">
                    <p className="bp-label mb-2">Comes off this stage</p>
                    <Outputs items={stage.outputs} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="col-span-7 min-w-0 self-stretch flex items-center">
              <LinePlan active={active} progress={progress} />
            </div>
          </div>
          <p className="mt-3 bp-label text-right">Scroll to advance the line</p>
        </div>
      </div>

      {/* Phones and tablets: the four stages stacked as cards */}
      <ol className="lg:hidden border-t border-ink">
        {STAGES.map((s, i) => (
          <li key={s.label} className="grid grid-cols-[auto_1fr] gap-x-5 py-8 border-b border-ink">
            <span className="font-display font-black text-6xl sm:text-7xl leading-[0.8] text-red tabular-nums">0{i + 1}</span>
            <div className="min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display font-black uppercase text-4xl sm:text-5xl leading-[0.85]">{s.label}</h3>
                  <p className="mt-1 bp-label">{s.note}</p>
                </div>
                <svg viewBox="-2 -2 48 40" className="w-12 h-10 shrink-0" aria-hidden="true">
                  <StageGlyph index={i} />
                </svg>
              </div>
              <p className="mt-4 text-base text-muted leading-relaxed">{s.detail}</p>
              <div className="mt-5">
                <Outputs items={s.outputs} />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Station>
  );
}
