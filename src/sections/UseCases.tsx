import { useState } from 'react';
import { CornerMarks } from '../components/blueprint/CornerMarks';
import { Station } from '../components/blueprint/Station';
import { STATIONS } from '../content/site';
import { USE_CASES } from '../content/useCases';

export function UseCases() {
  const [activeId, setActiveId] = useState(USE_CASES[0].id);
  const activeIndex = Math.max(
    0,
    USE_CASES.findIndex((u) => u.id === activeId),
  );
  const active = USE_CASES[activeIndex];

  return (
    <Station
      {...STATIONS[3]}
      title="Boosting Capabilities Beyond Limits"
      intro="Explore how production teams leverage autonomous agents with strict rule structures to automate intensive manual workflows."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Selector */}
        <ul className="lg:col-span-4 border-t border-ink">
          {USE_CASES.map((uc, i) => {
            const isActive = uc.id === activeId;
            return (
              <li key={uc.id} className="border-b border-ink">
                <button
                  type="button"
                  aria-pressed={isActive}
                  aria-controls="usecase-ticket"
                  onClick={() => setActiveId(uc.id)}
                  className={`relative w-full text-left py-5 pl-5 pr-3 cursor-pointer transition-colors ${
                    isActive ? 'bg-raised' : 'hover:bg-raised/60'
                  }`}
                >
                  <span aria-hidden="true" className={`absolute inset-y-0 left-0 w-1 ${isActive ? 'bg-red' : 'bg-transparent'}`} />
                  <span className={`bp-label ${isActive ? '!text-red font-semibold' : ''}`}>
                    0{i + 1} / {uc.category}
                  </span>
                  <span className="mt-2 block font-display font-black uppercase text-2xl leading-none">{uc.title}</span>
                  <span className="mt-2 block text-sm text-muted leading-relaxed">{uc.summary}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Work order ticket */}
        <article id="usecase-ticket" className="relative lg:col-span-8 border border-ink bg-raised min-w-0">
          <CornerMarks />
          <header className="flex flex-wrap items-center justify-between gap-2 px-5 sm:px-8 py-4 border-b border-ink bp-label">
            <span>
              Work order 0{activeIndex + 1}/0{USE_CASES.length}
            </span>
            <span className="!text-red font-semibold">{active.category}</span>
          </header>

          <div className="px-5 sm:px-8 py-6 sm:py-8">
            <h3 className="font-display font-black uppercase text-3xl sm:text-4xl leading-none">{active.title}</h3>
            <p className="mt-4 text-base text-muted leading-relaxed max-w-2xl">{active.description}</p>

            <dl className="mt-6 grid grid-cols-1 sm:grid-cols-3 border-l border-t border-rule">
              {active.metrics.map((m) => (
                <div key={m.label} className="p-4 border-r border-b border-rule">
                  <dt className="bp-label">{m.label}</dt>
                  <dd className="mt-1.5 font-display font-black text-3xl leading-none">{m.value}</dd>
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
