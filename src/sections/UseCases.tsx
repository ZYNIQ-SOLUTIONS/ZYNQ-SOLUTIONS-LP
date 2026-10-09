import { useRef, useState } from 'react';
import { CornerMarks } from '../components/blueprint/CornerMarks';
import { Station } from '../components/blueprint/Station';
import { STATIONS } from '../content/site';
import { USE_CASES } from '../content/useCases';

// Height of the nav plus the pinned tab strip, matching scroll-mt-32 on the ticket.
const TICKET_OFFSET = 128;

export function UseCases() {
  const [activeId, setActiveId] = useState(USE_CASES[0].id);
  const activeIndex = Math.max(
    0,
    USE_CASES.findIndex((u) => u.id === activeId),
  );
  const active = USE_CASES[activeIndex];
  const ticket = useRef<HTMLElement>(null);

  const select = (id: string) => {
    setActiveId(id);
    // Below the desktop layout the tabs stay pinned while the ticket scrolls, so a
    // reader deep in one ticket is taken back to the top of the next.
    if (window.innerWidth < 1024 && ticket.current && ticket.current.getBoundingClientRect().top < TICKET_OFFSET) {
      requestAnimationFrame(() => ticket.current?.scrollIntoView({ block: 'start' }));
    }
  };

  return (
    <Station
      {...STATIONS[3]}
      title="Boosting Capabilities Beyond Limits"
      intro="Explore how production teams leverage autonomous agents with strict rule structures to automate intensive manual workflows."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Phones and tablets: tab strip pinned under the nav */}
        <div
          role="group"
          aria-label="Use cases"
          className="lg:hidden bp-noscroll sticky top-[66px] z-30 -mx-5 sm:-mx-8 px-5 sm:px-8 flex overflow-x-auto bg-paper/95 backdrop-blur-md border-y border-ink [@media(max-height:500px)]:static"
        >
          {USE_CASES.map((uc, i) => {
            const isActive = uc.id === activeId;
            return (
              <button
                key={uc.id}
                type="button"
                aria-pressed={isActive}
                aria-controls="usecase-ticket"
                onClick={(e) => {
                  select(uc.id);
                  e.currentTarget.scrollIntoView({ block: 'nearest', inline: 'center' });
                }}
                className={`shrink-0 h-12 px-4 first:pl-0 font-mono text-[11px] uppercase tracking-[0.14em] whitespace-nowrap border-b-2 -mb-px cursor-pointer transition-colors ${
                  isActive ? 'border-red text-ink font-semibold' : 'border-transparent text-muted'
                }`}
              >
                <span className="text-red mr-2">0{i + 1}</span>
                {uc.category}
              </button>
            );
          })}
        </div>

        {/* Desktop selector */}
        <ul className="hidden lg:block lg:col-span-4 border-t border-ink">
          {USE_CASES.map((uc, i) => {
            const isActive = uc.id === activeId;
            return (
              <li key={uc.id} className="border-b border-ink">
                <button
                  type="button"
                  aria-pressed={isActive}
                  aria-controls="usecase-ticket"
                  onClick={() => select(uc.id)}
                  className={`relative w-full text-left py-5 pl-5 pr-3 cursor-pointer transition-colors ${
                    isActive ? 'bg-ink text-paper' : 'hover:bg-raised'
                  }`}
                >
                  <span aria-hidden="true" className={`absolute inset-y-0 left-0 w-1 ${isActive ? 'bg-red' : 'bg-transparent'}`} />
                  <span className={`bp-label ${isActive ? '!text-red font-semibold' : ''}`}>
                    0{i + 1} / {uc.category}
                  </span>
                  <span className="mt-2 block font-display font-black uppercase text-2xl leading-none">{uc.title}</span>
                  <span className={`mt-2 block text-sm leading-relaxed ${isActive ? 'text-paper/70' : 'text-muted'}`}>{uc.summary}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Work order ticket */}
        <article ref={ticket} id="usecase-ticket" className="relative scroll-mt-32 lg:scroll-mt-24 lg:col-span-8 border border-ink bg-raised min-w-0">
          <CornerMarks />
          <header className="flex flex-wrap items-center justify-between gap-2 px-5 sm:px-8 py-4 border-b border-ink bp-label">
            <span>
              Work order 0{activeIndex + 1}/0{USE_CASES.length}
            </span>
            <span className="!text-red font-semibold">{active.category}</span>
          </header>

          <div className="px-5 sm:px-8 py-6 sm:py-8">
            <h3 className="font-display font-black uppercase text-3xl sm:text-4xl lg:text-5xl leading-none">{active.title}</h3>
            <p className="lg:hidden mt-4 text-base font-medium leading-relaxed">{active.summary}</p>
            <p className="mt-4 text-base text-muted leading-relaxed max-w-2xl">{active.description}</p>

            <dl className="mt-6 grid grid-cols-1 sm:grid-cols-3 border-l border-t border-rule">
              {active.metrics.map((m) => (
                <div
                  key={m.label}
                  className="flex items-center justify-between gap-4 sm:block px-4 py-3 sm:p-4 border-r border-b border-rule"
                >
                  <dt className="bp-label">{m.label}</dt>
                  <dd className="sm:mt-1.5 shrink-0 font-display font-black text-2xl sm:text-3xl leading-none">{m.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="bp-label mb-3">Guidelines</h4>
                <ol className="space-y-2.5 text-sm leading-relaxed">
                  {active.mockConfig.guidelines.map((g, i) => (
                    <li key={g} className="flex gap-3">
                      <span className="font-mono text-xs text-red mt-0.5">{i + 1}</span>
                      {g}
                    </li>
                  ))}
                </ol>

                <h4 className="bp-label mt-6 mb-3">Tools</h4>
                <ul className="flex flex-wrap gap-2">
                  {active.mockConfig.allowedTools.map((t) => (
                    <li key={t} className="border border-rule px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="min-w-0">
                <h4 className="bp-label mb-3">Sample log</h4>
                <ol className="bg-paper border border-rule p-4 space-y-2 font-mono text-[11px] leading-relaxed">
                  {active.mockConfig.sampleLogs.map((log) => (
                    <li key={log.time + log.text} className="flex gap-2.5">
                      <span className="text-muted shrink-0">{log.time}</span>
                      <span className={log.type === 'action' ? 'text-muted' : 'font-medium'}>
                        {log.type === 'success' && (
                          <span aria-hidden="true" className="inline-block w-1.5 h-1.5 bg-red mr-1.5 -translate-y-px" />
                        )}
                        {log.text}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </article>
      </div>
    </Station>
  );
}
