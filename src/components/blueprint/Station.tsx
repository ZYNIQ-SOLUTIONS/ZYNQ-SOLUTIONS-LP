import { useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { CONTAINER } from './layout';

interface StationProps {
  id: string;
  number: string;
  label: string;
  title: string;
  intro?: string;
  children: ReactNode;
}

const EASE = [0.2, 0.8, 0.2, 1] as const;
const VIEW = { once: true, margin: '-80px' };

export function Station({ id, number, label, title, intro, children }: StationProps) {
  const reduce = useReducedMotion();
  const section = useRef<HTMLElement>(null);

  // The numeral drifts against the scroll, like a sheet number on a layer behind the drawing.
  const { scrollYProgress } = useScroll({ target: section, offset: ['start end', 'end start'] });
  const drift = useTransform(scrollYProgress, [0, 1], [70, -70]);

  return (
    <section ref={section} id={id} aria-labelledby={`${id}-title`} className="relative border-t border-rule py-14 sm:py-24 lg:py-28">
      <div className={`${CONTAINER} relative`}>
        <motion.span
          aria-hidden="true"
          style={reduce ? undefined : { y: drift }}
          className="bp-outline hidden md:block absolute right-8 lg:right-10 -top-8 font-display font-black text-[13rem] lg:text-[17rem] leading-none select-none"
        >
          {number}
        </motion.span>

        <header className="relative mb-8 sm:mb-14">
          <motion.p
            className="bp-label flex items-center gap-3"
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEW}
            transition={{ duration: 0.4 }}
          >
            <span className="text-red font-semibold">Station {number}</span>
            <span aria-hidden="true" className="h-px w-8 bg-rule" />
            <span>{label}</span>
          </motion.p>

          <motion.h2
            id={`${id}-title`}
            className="mt-4 max-w-3xl font-display font-black uppercase text-4xl sm:text-6xl lg:text-7xl leading-[0.95] lg:leading-[0.92] tracking-tight text-balance"
            initial={reduce ? false : { clipPath: 'inset(-10% 0% 100% 0%)', y: 28 }}
            whileInView={{ clipPath: 'inset(-10% 0% -10% 0%)', y: 0 }}
            viewport={VIEW}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {title}
          </motion.h2>

          {intro && (
            <motion.p
              className="mt-5 text-muted text-base lg:text-lg leading-relaxed max-w-2xl"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEW}
              transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
            >
              {intro}
            </motion.p>
          )}

          {/* ruled line that draws across under the header */}
          <motion.div
            aria-hidden="true"
            className="mt-8 sm:mt-10 flex items-center origin-left"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={VIEW}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          >
            <span className="w-2 h-2 bg-red" />
            <span className="h-px flex-1 bg-ink" />
            <span className="h-2 w-px bg-ink" />
          </motion.div>
        </header>

        <motion.div
          className="relative"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEW}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
