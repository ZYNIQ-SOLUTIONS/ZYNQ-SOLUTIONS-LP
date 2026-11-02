import { useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import { BRANDS } from '../content/brands';

export function PartsStrip() {
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
    <section aria-label="Technologies we build with" className="border-y border-rule bg-raised py-6 sm:py-8" onKeyDown={onKeyDown}>
      <p className="bp-label text-center">Core stack and integrations</p>

      <div className="mt-4 max-w-5xl mx-auto px-5 sm:px-8">
        <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
          {BRANDS.map((brand, i) => (
            <li key={brand.name} className="flex items-center">
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
                    : 'border-rule bg-paper/60 text-ink hover:border-ink hover:text-ink'
                }`}
              >
                {brand.name}
              </button>
              {i < BRANDS.length - 1 && (
                <span aria-hidden="true" className="ml-2 font-mono text-xs text-muted/40">
                  /
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <p aria-live="polite" className="mt-4 px-5 min-h-6 text-center font-mono text-xs leading-relaxed text-muted">
        {active ? (
          <>
            <span className="text-ink font-semibold">{active.name}:</span> {active.useCase}
          </>
        ) : (
          'Select a component to inspect its role in the pipeline.'
        )}
      </p>
    </section>
  );
}
