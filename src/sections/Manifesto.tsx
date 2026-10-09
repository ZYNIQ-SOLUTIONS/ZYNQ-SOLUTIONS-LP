import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import type { MotionValue } from 'motion/react';
import { CONTAINER } from '../components/blueprint/layout';

const QUOTE = '“At ZYNIQ, we believe the human mind was meant to explore, not just execute.”';
const WORDS = QUOTE.split(' ');
const ACCENT = 'explore,';

// Each word inks in as the reader scrolls through the band.
function Word({ text, index, progress }: { text: string; index: number; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [index / WORDS.length, (index + 1) / WORDS.length], [0.16, 1]);
  const accent = text === ACCENT;
  return (
    <motion.span style={{ opacity }}>
      {accent ? <span className="text-red">{text.slice(0, -1)}</span> : text}
      {accent && ','}{' '}
    </motion.span>
  );
}

export function Manifesto() {
  const reduce = useReducedMotion();
  const quote = useRef<HTMLQuoteElement>(null);
  const { scrollYProgress } = useScroll({ target: quote, offset: ['start 0.85', 'end 0.45'] });

  return (
    <section aria-label="Manifesto" className="relative overflow-hidden bg-ink text-paper py-16 sm:py-28 lg:py-36">
      <div className={`${CONTAINER} grid grid-cols-1 lg:grid-cols-12 gap-10 items-end`}>
        <div className="lg:col-span-9">
          <p className="bp-label !text-paper/50 mb-6">Manifesto / Rev. A</p>
          <blockquote
            ref={quote}
            className="font-display font-black uppercase leading-[0.9] tracking-tight text-[clamp(2.5rem,8vw,7rem)] text-balance"
          >
            {reduce ? (
              <>
                “At ZYNIQ, we believe the human mind was meant to <span className="text-red">explore</span>, not just execute.”
              </>
            ) : (
              WORDS.map((word, i) => (
                <span key={word + i}>
                  <Word text={word} index={i} progress={scrollYProgress} />
                </span>
              ))
            )}
          </blockquote>
        </div>

        <div className="lg:col-span-3 space-y-5 border-l border-paper/25 pl-6">
          <p className="text-base leading-relaxed text-paper/75">
            Our Software Factory provides the 'Crews' and 'Specialist Agents' to handle the building, leaving the
            'Commanders' to navigate the unknown.
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.14em] leading-relaxed text-paper/60">
            We are building a Quantic Calculator for the soul of humanity.
          </p>
        </div>
      </div>

      {/* the stamp lands once the band is on screen */}
      <motion.div
        aria-hidden="true"
        className="hidden sm:block absolute top-8 right-8 lg:top-12 lg:right-16 border-[3px] border-red text-red px-5 py-2.5 text-center font-mono text-[11px] font-semibold uppercase tracking-[0.2em] leading-relaxed"
        initial={reduce ? { rotate: -12 } : { opacity: 0, scale: 2.4, rotate: -28 }}
        whileInView={{ opacity: 1, scale: 1, rotate: -12 }}
        viewport={{ once: true, margin: '-120px' }}
        transition={{ type: 'spring', stiffness: 420, damping: 22, delay: 0.35 }}
      >
        Approved
        <br />
        ZYNIQ Studio
      </motion.div>
    </section>
  );
}
