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

export function Station({ id, number, label, title, intro, children }: StationProps) {
  const reduce = useReducedMotion();

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative border-t border-rule py-16 sm:py-24">
      <motion.div
        className={`${CONTAINER} relative`}
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <span
          aria-hidden="true"
          className="bp-outline hidden md:block absolute right-8 lg:right-10 -top-4 font-display font-black text-[11rem] leading-none select-none"
        >
          {number}
        </span>
        <header className="relative mb-10 sm:mb-14 max-w-3xl">
          <p className="bp-label flex items-center gap-3">
            <span className="text-red font-semibold">Station {number}</span>
            <span aria-hidden="true" className="h-px w-8 bg-rule" />
            <span>{label}</span>
          </p>
          <h2
            id={`${id}-title`}
            className="mt-4 font-display font-black uppercase text-4xl sm:text-6xl leading-[0.95] tracking-tight text-balance"
          >
            {title}
          </h2>
          {intro && <p className="mt-5 text-muted text-base leading-relaxed max-w-2xl">{intro}</p>}
        </header>
        {children}
      </motion.div>
    </section>
  );
}
