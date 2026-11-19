import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { STATIONS } from '../../content/site';
import { CONTAINER } from './layout';
import { Stamp } from './Stamp';

type Tone = 'paper' | 'raised' | 'night';
type Spacing = 'tight' | 'normal' | 'loose';

interface StationProps {
  id: string;
  number: string;
  label: string;
  title: string;
  intro?: string;
  tone?: Tone;
  spacing?: Spacing;
  /** Who "drew" this sheet, shown in the title block */
  drawn?: string;
  children: ReactNode;
}

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEW = { once: true, margin: '-60px' };

const TONE: Record<Tone, string> = {
  paper: '',
  raised: 'bg-raised',
  night: 'sheet-night bp-grid',
};

const SPACING: Record<Spacing, string> = {
  tight: 'py-12 sm:py-16 lg:py-20',
  normal: 'py-16 sm:py-24 lg:py-28',
  loose: 'py-20 sm:py-28 lg:py-40',
};

// The small block in the corner of every engineering drawing: sheet number,
// revision, who drew it and who checked it. The stamp lands on top of it.
function SheetBlock({ number, drawn }: { number: string; drawn: string }) {
  const cell = 'px-2.5 py-1.5 border-rule';
  return (
    <div className="relative">
      <dl className="grid grid-cols-[1fr_auto] border border-ink font-mono text-[10px] leading-tight">
        <div className={`${cell} border-r border-b`}>
          <dt className="text-muted">Sheet</dt>
          <dd className="text-ink font-semibold">
            {number} / {String(STATIONS.length).padStart(2, '0')}
          </dd>
        </div>
        <div className={`${cell} border-b`}>
          <dt className="text-muted">Rev</dt>
          <dd className="text-ink font-semibold">C</dd>
        </div>
        <div className={`${cell} border-r`}>
          <dt className="text-muted">Drawn</dt>
          <dd className="text-ink">{drawn}</dd>
        </div>
        <div className={cell}>
          <dt className="text-muted">Chk</dt>
          <dd className="text-ink">Lead</dd>
        </div>
      </dl>
      <Stamp label="Checked" mark={number} className="absolute -top-14 right-16 bg-paper/85" rotate={-8} />
    </div>
  );
}

export function Station({
  id,
  number,
  label,
  title,
  intro,
  tone = 'paper',
  spacing = 'normal',
  drawn = 'Agent crew',
  children,
}: StationProps) {
  const reduce = useReducedMotion();

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative border-t border-rule ${TONE[tone]} ${SPACING[spacing]}`}
    >
      <div className={`${CONTAINER} relative`}>
        <motion.header
          className="mb-10 sm:mb-14"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEW}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
            <div className="lg:col-span-9">
              <div className="flex items-start justify-between gap-4">
                <p className="bp-label flex items-center gap-3">
                  <span className="text-red font-semibold">{number}</span>
                  <span aria-hidden="true" className="h-px w-8 bg-cyan/60" />
                  <span>{label}</span>
                </p>
                <Stamp label="Checked" mark={number} rotate={-8} className="lg:hidden shrink-0 -mt-1 scale-[0.8] origin-top-right" />
              </div>

              <h2
                id={`${id}-title`}
                className="mt-5 max-w-4xl font-display font-bold uppercase text-[2.5rem] sm:text-6xl lg:text-7xl leading-[0.92] tracking-tight text-balance"
              >
                {title}
              </h2>

              {intro && <p className="mt-5 text-muted text-base lg:text-lg leading-relaxed max-w-2xl">{intro}</p>}
            </div>

            <div className="hidden lg:block lg:col-span-3 lg:justify-self-end w-52">
              <SheetBlock number={number} drawn={drawn} />
            </div>
          </div>

          <div aria-hidden="true" className="mt-8 sm:mt-10 flex items-center">
            <span className="w-1.5 h-1.5 bg-red" />
            <span className="h-px flex-1 bg-rule" />
            <span className="h-1.5 w-px bg-rule" />
          </div>
        </motion.header>

        <motion.div
          className="relative"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEW}
          transition={{ duration: 0.4, delay: 0.05, ease: EASE }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
