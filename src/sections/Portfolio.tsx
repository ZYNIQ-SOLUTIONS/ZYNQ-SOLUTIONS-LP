import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { CornerMarks } from '../components/blueprint/CornerMarks';
import { PortfolioSchematic } from '../components/blueprint/PortfolioSchematic';
import { Station } from '../components/blueprint/Station';
import { PORTFOLIO_ITEMS } from '../content/portfolio';
import { STATIONS } from '../content/site';

export function Portfolio() {
  const active = PORTFOLIO_ITEMS[0];
  const station = STATIONS.find((s) => s.id === 'portfolio') ?? {
    id: 'portfolio',
    number: '04',
    label: 'Portfolio',
  };

  return (
    <Station
      {...station}
      title="Engineered & Shipped"
      intro="Flagship sovereign AI infrastructure architected, assembled, and verified on the ZYNIQ production line."
    >
      {/* Active Build Spec Sheet */}
      <article id="portfolio-spec-sheet" className="relative border border-ink bg-raised">
        <CornerMarks />
        <header className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-8 py-4 border-b border-ink bp-label">
          <span>
            Flagship Build Specification / {active.code} / {active.year}
          </span>
          <span className="inline-flex items-center gap-2 !text-red font-semibold">
            <span aria-hidden="true" className="w-1.5 h-1.5 bg-red" />
            {active.status} · {active.category}
          </span>
        </header>

        <div className="p-5 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-7">
            <p className="bp-label">{active.division}</p>
            <h3 className="mt-2 font-display font-black uppercase text-4xl sm:text-6xl leading-[0.92]">{active.title}</h3>
            <p className="mt-2 font-mono text-xs uppercase tracking-wider text-red">{active.subtitle}</p>
            <p className="mt-4 text-base text-ink/90 leading-relaxed">{active.summary}</p>

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
                  <dd className="sm:mt-1.5 shrink-0 font-display font-black text-2xl sm:text-3xl leading-none tabular-nums">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {active.stack.map((tech) => (
                <span
                  key={tech}
                  className="border border-rule bg-paper px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider"
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
              <h4 className="bp-label mb-2.5">Shipped Deliverables</h4>
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
                className="inline-flex items-center gap-2 bg-red text-white font-mono text-[11px] font-semibold uppercase tracking-[0.14em] px-5 py-3.5 bp-sweep"
              >
                Inspect full case study
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              {active.href && (
                <a
                  href={active.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-ink bg-paper font-mono text-[11px] font-semibold uppercase tracking-[0.14em] px-4 py-3.5 bp-sweep"
                >
                  Live platform
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    </Station>
  );
}
