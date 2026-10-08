import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import type { Stat } from '../../types';

const R = 46;
const CIRCUMFERENCE = 2 * Math.PI * R;
const SWEEP = CIRCUMFERENCE * (240 / 360);
const DURATION = 1400;

export function Gauge({ value, suffix, fill }: Pick<Stat, 'value' | 'suffix' | 'fill'>) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setProgress(1);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      setProgress(1 - Math.pow(1 - t, 3));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce]);

  return (
    <div ref={ref} className="relative w-full max-w-[220px]">
      <svg viewBox="0 0 120 96" className="w-full" aria-hidden="true">
        <g transform="rotate(150 60 58)" fill="none" strokeWidth="6">
          <circle cx="60" cy="58" r={R} stroke="var(--rule)" strokeDasharray={`${SWEEP} ${CIRCUMFERENCE}`} />
          <circle
            cx="60"
            cy="58"
            r={R}
            stroke="var(--red)"
            strokeDasharray={`${SWEEP * fill * progress} ${CIRCUMFERENCE}`}
          />
        </g>
        {/* tick marks at the start and end of the scale */}
        <g stroke="var(--ink)" strokeWidth="1">
          <line x1="14" y1="86" x2="8" y2="90" />
          <line x1="106" y1="86" x2="112" y2="90" />
        </g>
      </svg>
      <div className="absolute inset-x-0 top-[38%] text-center font-display font-black text-6xl leading-none tabular-nums">
        {Math.round(value * progress)}
        <span className="text-red">{suffix}</span>
      </div>
    </div>
  );
}
