import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { CONTAINER } from './layout';

interface StationProps {
  id: string;
  number: string;
  label: string;
  title: string;
  intro?: string;
  children: ReactNode;
}

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEW = { once: true, margin: '-60px' };

export function Station({ id, number, label, title, intro, children }: StationProps) {
  const reduce = useReducedMotion();

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative border-t border-rule py-14 sm:py-20 lg:py-24">
      <div className={`${CONTAINER} relative`}>
        <motion.header
          className="mb-8 sm:mb-12"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEW}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <p className="bp-label flex items-center gap-3">
            <span>Station {number}</span>
            <span aria-hidden="true" className="h-px w-6 bg-rule" />
            <span>{label}</span>
          </p>

          <h2
            id={`${id}-title`}
            className="mt-4 max-w-3xl font-display font-semibold uppercase text-3xl sm:text-5xl lg:text-6xl leading-[0.96] tracking-tight text-balance"
          >
            {title}
          </h2>

          {intro && (
            <p className="mt-4 text-muted text-base lg:text-lg leading-relaxed max-w-2xl">
              {intro}
            </p>
          )}

          <div aria-hidden="true" className="mt-6 sm:mt-8 flex items-center">
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
