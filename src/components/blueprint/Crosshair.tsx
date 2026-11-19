import { useEffect, useRef } from 'react';

const pad = (n: number) => String(Math.max(0, Math.round(n))).padStart(4, '0');

// Drafting crosshair: two hairlines follow a fine pointer and a readout in the
// corner gives the position on the sheet. CSS shows it only on wide screens with
// a mouse, and it never takes pointer events. It writes to the DOM directly so
// moving the mouse does not re-render React.
export function Crosshair() {
  const root = useRef<HTMLDivElement>(null);
  const h = useRef<HTMLDivElement>(null);
  const v = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    let x = 0;
    let y = 0;

    const draw = () => {
      frame = 0;
      if (h.current) h.current.style.transform = `translateY(${y}px)`;
      if (v.current) v.current.style.transform = `translateX(${x}px)`;
      if (readout.current) readout.current.textContent = `X ${pad(x)}  Y ${pad(y + window.scrollY)}`;
    };
    const show = (on: boolean) => root.current?.setAttribute('data-on', String(on));

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x = e.clientX;
      y = e.clientY;
      show(true);
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const onLeave = () => show(false);
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('blur', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('blur', onLeave);
    };
  }, []);

  return (
    <div
      ref={root}
      aria-hidden="true"
      data-on="false"
      className="bp-crosshair pointer-events-none fixed inset-0 z-[65] opacity-0 data-[on=true]:opacity-100 transition-opacity duration-200"
    >
      <div ref={h} className="absolute left-0 right-0 top-0 h-px bg-cyan/25" />
      <div ref={v} className="absolute top-0 bottom-0 left-0 w-px bg-cyan/25" />
      <span
        ref={readout}
        className="absolute right-4 bottom-4 border border-cyan/40 bg-paper/90 px-2 py-1 font-mono text-[10px] text-cyan tabular-nums whitespace-pre"
      >
        X 0000  Y 0000
      </span>
    </div>
  );
}
