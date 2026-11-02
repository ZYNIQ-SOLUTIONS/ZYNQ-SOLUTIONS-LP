import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PortfolioSchematic } from '../components/blueprint/PortfolioSchematic';
import { Station } from '../components/blueprint/Station';
import { PORTFOLIO_ITEMS } from '../content/portfolio';
import { STATIONS } from '../content/site';

const FEATURED = PORTFOLIO_ITEMS.filter((item) => item.featured);

export function Portfolio() {
  const [activeId, setActiveId] = useState(FEATURED[0].id);
  const reduce = useReducedMotion();
  const active = FEATURED.find((item) => item.id === activeId) ?? FEATURED[0];
  const station = STATIONS.find((s) => s.id === 'portfolio') ?? {
    id: 'portfolio',
    number: '04',
    label: 'Portfolio',
  };

  return (
    <Station
      {...station}
      title="Shipped Systems"
      intro="Flagship AI infrastructure, autonomous agent frameworks, and enterprise software platforms deployed to production."
    >
      {/* Featured project ledger */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-l border-t border-ink">
        {FEATURED.map((item) => {
          const isActive = item.id === active.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={isActive}
              aria-controls="portfolio-spec-sheet"
              onClick={() => setActiveId(item.id)}
              className={`relative text-left p-5 sm:p-6 flex flex-col justify-between border-r border-b border-ink cursor-pointer transition-colors ${
                isActive ? 'bg-ink text-paper' : 'bg-paper hover:bg-raised'
              }`}
            >
              <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-0.5 ${isActive ? 'bg-red' : 'bg-transparent'}`} />
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className={`bp-label ${isActive ? '!text-paper/70' : ''}`}>{item.code}</span>
                  <span className={`font-mono text-[10px] ${isActive ? 'text-paper/60' : 'text-muted'}`}>
                    {item.division}
                  </span>
                </div>
                <h3 className="mt-3 font-display font-semibold uppercase text-xl sm:text-2xl leading-none">{item.title}</h3>
                <p className={`mt-2.5 text-sm leading-relaxed ${isActive ? 'text-paper/75' : 'text-muted'}`}>{item.summary}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-current/15 flex items-center justify-between gap-2 font-mono text-xs">
                <span className={isActive ? 'text-red font-semibold' : 'text-ink font-medium'}>{item.metrics[0].value}</span>
                <span className={isActive ? 'text-paper/70' : 'text-muted'}>{item.metrics[0].label}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Build Spec Sheet */}
      <article id="portfolio-spec-sheet" className="relative mt-6 border border-ink bg-raised">
        <header className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-8 py-3.5 border-b border-ink bp-label">
          <span>
            Specification // {active.code} // {active.year}
          </span>
          <span className="inline-flex items-center gap-2">
            <span aria-hidden="true" className="w-1.5 h-1.5 bg-red" />
            <span className="text-ink font-medium">{active.status}</span>
            <span className="text-muted">· {active.category}</span>
          </span>
        </header>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="p-5 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start"
          >
            <div className="lg:col-span-7">
              <p className="bp-label">{active.division}</p>
              <h3 className="mt-2 font-display font-semibold uppercase text-2xl sm:text-4xl leading-[0.96]">{active.title}</h3>
              <p className="mt-1 font-mono text-xs text-muted">{active.subtitle}</p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="bp-label mb-2">Challenge</h4>
                  <p className="text-sm text-muted leading-relaxed">{active.challenge}</p>
                </div>
                <div>
                  <h4 className="bp-label mb-2">Architecture</h4>
                  <p className="text-sm text-muted leading-relaxed">{active.architecture}</p>
                </div>
              </div>

              <dl className="mt-6 grid grid-cols-1 sm:grid-cols-3 border-l border-t border-rule bg-paper">
                {active.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="flex items-center justify-between gap-4 sm:block px-4 py-3 sm:p-4 border-r border-b border-rule"
                  >
                    <dt className="bp-label">{m.label}</dt>
                    <dd className="sm:mt-1.5 shrink-0 font-display font-semibold text-2xl sm:text-3xl leading-none tabular-nums">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                {active.stack.map((tech) => (
                  <span
                    key={tech}
                    className="border border-rule bg-paper px-2.5 py-1 font-mono text-xs text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-5">
              <div className="border border-rule bg-paper p-4">
                <PortfolioSchematic type={active.schematic} code={active.code} />
              </div>

              <div>
                <h4 className="bp-label mb-2.5">Deliverables</h4>
                <ul className="border-t border-rule">
                  {active.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-3 py-2 border-b border-rule text-sm font-medium">
                      <span aria-hidden="true" className="mt-1.5 w-1.5 h-1.5 bg-red shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={`/portfolio#${active.id}`}
                  className="inline-flex items-center gap-2 bg-red text-white text-sm font-medium hover:bg-ink hover:text-paper h-11 px-5 bp-btn"
                >
                  Inspect case study
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                {active.href && (
                  <a
                    href={active.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-ink bg-paper text-sm font-medium hover:bg-ink hover:text-paper h-11 px-4 bp-btn"
                  >
                    Live platform
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </article>

      {/* Archive Callout Bar */}
      <div className="mt-6 border border-ink bg-paper p-5 sm:px-8 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="bp-label">Production Archive // {PORTFOLIO_ITEMS.length} Projects</p>
          <p className="mt-1 text-base font-medium">
            Explore Z-OLLA, IZN, Agent T, Tchiko Assistant, and our core agent infrastructure modules.
          </p>
        </div>
        <a
          href="/portfolio"
          className="shrink-0 inline-flex items-center justify-center gap-2 border border-ink text-sm font-medium hover:bg-ink hover:text-paper h-12 px-6 bp-btn"
        >
          Open portfolio archive ({PORTFOLIO_ITEMS.length})
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </Station>
  );
}
