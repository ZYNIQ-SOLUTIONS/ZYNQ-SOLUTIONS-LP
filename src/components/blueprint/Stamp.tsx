import { useEffect, useRef, useState } from 'react';

interface StampProps {
  /** Top line, e.g. "Checked" */
  label: string;
  /** Big centre mark, e.g. the sheet number */
  mark: string;
  /** Bottom line, e.g. "ZYQ / QC" */
  foot?: string;
  rotate?: number;
  className?: string;
}

// The red inspection stamp. It presses in once, the first time it scrolls into view,
// which is the page's way of saying a lead has signed this sheet off.
export function Stamp({ label, mark, foot = 'ZYNIQ / QC', rotate = -6, className = '' }: StampProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -20% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-on={on}
      className={`bp-stamp select-none border-2 border-red text-red px-2.5 py-1.5 text-center font-mono leading-none ${className}`}
      style={{ ['--stamp-rot' as string]: `${rotate}deg` }}
    >
      <span className="block text-[9px] font-semibold uppercase tracking-[0.18em]">{label}</span>
      <span className="block mt-1 font-display font-black text-2xl leading-none tracking-wide">{mark}</span>
      <span className="block mt-1 border-t border-red/60 pt-1 text-[8px] tracking-[0.14em]">{foot}</span>
    </div>
  );
}
