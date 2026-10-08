import { useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import { useReducedMotion } from 'motion/react';
import { BRANDS } from '../content/brands';

export function PartsStrip() {
  const reduce = useReducedMotion();
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

  // Hover only applies to a real mouse; on touch a tap selects instead.
  const hoverProps = (name: string) => ({
    onPointerEnter: (e: PointerEvent) => e.pointerType === 'mouse' && setHovered(name),
    onPointerLeave: () => setHovered(null),
  });

  const renderParts = (copy: 'main' | 'clone') => (
    <ul
      aria-hidden={copy === 'clone' ? true : undefined}
      className={reduce ? 'flex flex-wrap justify-center' : 'flex shrink-0'}
    >
      {BRANDS.map((brand) => (
        <li key={brand.name} className="flex items-center">
          <button
            type="button"
            tabIndex={copy === 'clone' ? -1 : undefined}
            aria-pressed={copy === 'main' ? selected === brand.name : undefined}
            onClick={() => setSelected(selected === brand.name ? null : brand.name)}
            onFocus={() => setHovered(brand.name)}
            onBlur={() => setHovered(null)}
            {...hoverProps(brand.name)}
            className={`px-6 sm:px-8 py-2 font-display font-black uppercase text-2xl sm:text-3xl tracking-wide cursor-pointer transition-colors ${
              activeName === brand.name ? 'text-red' : 'text-ink hover:text-red'
            }`}
          >
            {brand.name}
          </button>
          <span aria-hidden="true" className="font-mono text-xs text-muted">
            +
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Technologies we build with" className="border-y border-rule bg-raised py-8" onKeyDown={onKeyDown}>
      <p className="bp-label text-center">Powered by</p>

      <div className="mt-5 overflow-hidden">
        {reduce ? (
          renderParts('main')
        ) : (
          <div
            className="flex w-max"
            style={{
              animation: 'bp-marquee 36s linear infinite',
              animationPlayState: activeName ? 'paused' : 'running',
            }}
          >
            {renderParts('main')}
            {renderParts('clone')}
          </div>
        )}
      </div>

      <p aria-live="polite" className="mt-5 px-5 min-h-10 text-center font-mono text-xs leading-relaxed text-muted">
        {active ? (
          <>
            <span className="text-red font-semibold uppercase tracking-wider">{active.name}:</span> {active.useCase}
          </>
        ) : (
          'Select a part to see what we use it for.'
        )}
      </p>
    </section>
  );
}
