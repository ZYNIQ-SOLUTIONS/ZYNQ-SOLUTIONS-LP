import { useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import { CONTAINER } from '../components/blueprint/layout';
import { BRANDS } from '../content/brands';
import { STATS } from '../content/stats';

const TICKS = 20;

// A drafting gauge: a ruled scale with the measured length drawn in red.
function Gauge({ fill }: { fill: number }) {
  return (
    <div aria-hidden="true" className="mt-5">
      <div className="relative h-2 border-x border-ink">
        <div className="absolute inset-y-0 left-0 bg-red" style={{ width: `${fill * 100}%` }} />
      </div>
      <div className="mt-1 flex justify-between">
        {Array.from({ length: TICKS + 1 }, (_, i) => (
          <span key={i} className={`w-px bg-ink/40 ${i % 5 === 0 ? 'h-2' : 'h-1'}`} />
        ))}
      </div>
    </div>
  );
}

// Performance figures and the bill of materials, read together as one spec sheet.
export function SpecBand() {
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const activeName = hovered ?? selected;
  const active = BRANDS.find((b) => b.name === activeName);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSelected(null);
      setHovered(null);
    }
  };

  const hoverProps = (name: string) => ({
    onPointerEnter: (e: PointerEvent) => e.pointerType === 'mouse' && setHovered(name),
    onPointerLeave: () => setHovered(null),
  });

  return (
    <section id="output" aria-labelledby="output-title" className="border-y border-ink bg-raised" onKeyDown={onKeyDown}>
      <div className={CONTAINER}>
        <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-b border-rule bp-label">
          <h2 id="output-title">Specification / measured output</h2>
          <span className="hidden sm:flex items-center gap-2 text-cyan">
            <span aria-hidden="true">|&larr;</span>
            <span>Internal tests and client engagements</span>
            <span aria-hidden="true">&rarr;|</span>
          </span>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3">
          {STATS.map((stat, i) => (
            <li
              key={stat.label}
              className="py-6 md:py-10 md:px-8 first:md:pl-0 last:md:pr-0 border-b md:border-b-0 md:border-r last:border-0 border-rule"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="bp-label">M-0{i + 1}</span>
                <h3 className="font-mono text-xs font-semibold text-right">{stat.label}</h3>
              </div>
              <div className="mt-4 font-display font-black text-6xl sm:text-7xl lg:text-8xl tabular-nums leading-[0.85] tracking-tight">
                {stat.value}
                <span className="text-red">{stat.suffix}</span>
              </div>
              <Gauge fill={stat.fill} />
              <p className="mt-4 text-sm text-muted leading-relaxed">{stat.note}</p>
            </li>
          ))}
        </ul>

        <div className="border-t border-rule py-5 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center">
          <p className="bp-label lg:col-span-2">Bill of materials</p>
          <ul className="lg:col-span-10 flex flex-wrap items-center gap-2">
            {BRANDS.map((brand) => (
              <li key={brand.name}>
                <button
                  type="button"
                  aria-pressed={selected === brand.name}
                  onClick={() => setSelected(selected === brand.name ? null : brand.name)}
                  onFocus={() => setHovered(brand.name)}
                  onBlur={() => setHovered(null)}
                  {...hoverProps(brand.name)}
                  className={`px-3 py-1.5 font-mono text-xs font-medium cursor-pointer border transition-colors bp-btn ${
                    activeName === brand.name
                      ? 'border-red bg-paper text-red'
                      : 'border-rule bg-paper/60 text-ink hover:border-ink'
                  }`}
                >
                  {brand.name}
                </button>
              </li>
            ))}
          </ul>
          <p aria-live="polite" className="lg:col-start-3 lg:col-span-10 min-h-5 font-mono text-xs leading-relaxed text-muted">
            {active ? (
              <>
                <span className="text-ink font-semibold">{active.name}:</span> {active.useCase}
              </>
            ) : (
              'Select a part to see its role on the line.'
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
