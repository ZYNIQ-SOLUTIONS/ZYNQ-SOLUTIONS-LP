import { useEffect, useState } from 'react';
import type { StationDef } from '../../types';

// Maps scroll position onto the rail so the fill reaches each node as its station
// crosses the middle of the viewport.
function measure(stations: StationDef[]) {
  const half = window.innerHeight / 2;
  const y = window.scrollY + half;
  const end = Math.max(document.documentElement.scrollHeight - half, half + 1);
  const tops = stations.map((s) => {
    const el = document.getElementById(s.id);
    return el ? el.getBoundingClientRect().top + window.scrollY : end;
  });

  const xs = [half, ...tops, end];
  const ps = [0, ...stations.map((_, i) => (i + 1) / (stations.length + 1)), 1];

  let fill = 1;
  for (let i = 1; i < xs.length; i++) {
    if (y <= xs[i]) {
      const span = xs[i] - xs[i - 1];
      const t = span > 0 ? (y - xs[i - 1]) / span : 1;
      fill = ps[i - 1] + (ps[i] - ps[i - 1]) * Math.max(0, Math.min(1, t));
      break;
    }
  }

  return { fill, reached: tops.filter((t) => y >= t).length };
}

export function ProductionLine({ stations }: { stations: StationDef[] }) {
  const [{ fill, reached }, setState] = useState({ fill: 0, reached: 0 });

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setState(measure(stations)));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [stations]);

  return (
    <>
      {/* Mobile and tablet: progress bar under the nav */}
      <div aria-hidden="true" className="lg:hidden fixed top-16 inset-x-0 z-40 h-0.5 bg-rule">
        <div className="h-full bg-red origin-left" style={{ transform: `scaleX(${fill})` }} />
      </div>

      {/* Desktop: vertical rail with one node per station */}
      <nav
        aria-label="Stations"
        className="hidden lg:block fixed z-30 top-24 bottom-8 w-px bg-rule"
        style={{ left: 'max(2.5rem, calc((100vw - 80rem) / 2 + 2.5rem))' }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-red origin-top"
          style={{ transform: `scaleY(${fill})`, width: 2, left: -0.5 }}
        />
        <ol>
          {stations.map((s, i) => {
            const isReached = i < reached;
            return (
              <li
                key={s.id}
                className="absolute left-0 -translate-x-1/2 -translate-y-1/2"
                style={{ top: `${((i + 1) / (stations.length + 1)) * 100}%` }}
              >
                <a href={`#${s.id}`} className="group flex items-center" aria-label={`Station ${s.number}: ${s.label}`}>
                  <span
                    className={`block w-3 h-3 border-2 transition-colors ${
                      isReached ? 'bg-red border-red' : 'bg-paper border-ink group-hover:border-red'
                    }`}
                  />
                  <span
                    className={`absolute left-5 font-mono text-[10px] tracking-widest transition-colors ${
                      isReached ? 'text-red' : 'text-muted group-hover:text-ink'
                    }`}
                  >
                    {s.number}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
