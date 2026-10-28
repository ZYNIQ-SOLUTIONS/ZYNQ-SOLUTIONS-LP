import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Layers, X } from 'lucide-react';
import { LogoIcon } from '../components/LogoIcon';
import { ThemeToggle } from '../components/ThemeToggle';
import { ZyniqTextLogo } from '../components/ZyniqTextLogo';
import { CornerMarks } from '../components/blueprint/CornerMarks';
import { LineStatus } from '../components/blueprint/LineStatus';
import { PortfolioSchematic } from '../components/blueprint/PortfolioSchematic';
import { PORTFOLIO_ITEMS } from '../content/portfolio';
import { CONTACT_EMAILS, SITE, SOCIALS } from '../content/site';
import type { PortfolioItem } from '../types';

export default function PortfolioPage() {
  const [selected, setSelected] = useState<PortfolioItem | null>(null);
  const flagship = PORTFOLIO_ITEMS[0];

  useEffect(() => {
    document.title = `Portfolio — Z-OLLA | ${SITE.name}`;
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (hash) {
      const match = PORTFOLIO_ITEMS.find((item) => item.id === hash);
      if (match) {
        setSelected(match);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  return (
    <div className="min-h-screen bg-paper text-ink font-sans antialiased bp-grid">
      <a
        href="#portfolio-main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-ink focus:text-paper focus:px-4 focus:py-2 font-mono text-xs uppercase tracking-widest"
      >
        Skip to portfolio
      </a>

      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md border-b border-rule">
        <div className="mx-auto max-w-7xl h-16 px-5 sm:px-8 lg:px-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2.5 h-11 shrink-0" aria-label="ZYNIQ Studio, back to home">
              <LogoIcon className="w-8 h-8" />
              <ZyniqTextLogo className="h-4 w-auto" />
              <span className="font-display font-black text-xl leading-none tracking-wide text-red translate-y-px">STUDIO</span>
            </a>
            <span aria-hidden="true" className="hidden sm:inline-block h-4 w-px bg-rule" />
            <span className="hidden sm:inline-block bp-label !text-ink">Sheet P-01 / Z-OLLA Flagship Dossier</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <a
              href="/"
              className="inline-flex items-center gap-2 min-h-11 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted hover:text-ink transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to factory</span>
              <span className="sm:hidden">Home</span>
            </a>
            <ThemeToggle />
            <a
              href="/#consultation"
              className="hidden md:inline-flex items-center gap-2 bg-red text-white font-mono text-[11px] font-semibold uppercase tracking-[0.14em] px-4 py-2.5 bp-sweep"
            >
              Get free consultation
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      <main id="portfolio-main" className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-10 sm:py-16">
        {/* Blueprint Sheet Hero */}
        <section aria-labelledby="portfolio-heading" className="relative border border-ink bg-raised p-6 sm:p-10 lg:p-12">
          <CornerMarks />
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-rule bp-label">
            <span className="flex items-center gap-3">
              <span className="text-red font-semibold">Flagship Build // {flagship.code}</span>
              <span aria-hidden="true" className="h-px w-8 bg-rule" />
              <span>{flagship.division}</span>
            </span>
            <LineStatus />
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-end">
            <div className="lg:col-span-8">
              <p className="bp-label !text-red font-semibold">{flagship.category}</p>
              <h1
                id="portfolio-heading"
                className="mt-3 font-display font-black uppercase text-5xl sm:text-7xl lg:text-8xl leading-[0.88] tracking-tight"
              >
                {flagship.title} <span className="text-red">Platform.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base sm:text-lg text-muted leading-relaxed">
                {flagship.summary}
              </p>
            </div>

            <div className="lg:col-span-4">
              <dl className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 border-l border-t border-ink bg-paper">
                {flagship.metrics.map((m) => (
                  <div key={m.label} className="p-4 border-r border-b border-ink flex items-baseline justify-between gap-4">
                    <dt className="bp-label">{m.label}</dt>
                    <dd className="font-display font-black text-3xl leading-none text-red tabular-nums">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Detailed Flagship Build Breakdown */}
        {PORTFOLIO_ITEMS.map((item) => (
          <article
            key={item.id}
            id={item.id}
            className="mt-10 relative border border-ink bg-raised"
          >
            <CornerMarks />
            <header className="flex flex-wrap items-center justify-between gap-2 px-5 sm:px-8 py-4 border-b border-ink bp-label">
              <span className="flex items-center gap-2">
                <span className="text-red font-semibold">{item.code}</span>
                <span aria-hidden="true">/</span>
                <span>{item.division}</span>
                <span aria-hidden="true">/</span>
                <span>Technical Architecture</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span aria-hidden="true" className="w-1.5 h-1.5 bg-red" />
                {item.status} · {item.year}
              </span>
            </header>

            <div className="p-5 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <h2 className="font-display font-black uppercase text-3xl sm:text-5xl leading-none">
                    {item.subtitle}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="border border-rule bg-paper p-5">
                    <h3 className="bp-label !text-red font-semibold mb-2">01 / Operational Challenge</h3>
                    <p className="text-sm leading-relaxed text-ink/90">{item.challenge}</p>
                  </div>
                  <div className="border border-rule bg-paper p-5">
                    <h3 className="bp-label !text-red font-semibold mb-2">02 / Engineered Architecture</h3>
                    <p className="text-sm leading-relaxed text-ink/90">{item.architecture}</p>
                  </div>
                </div>

                <div>
                  <h3 className="bp-label mb-3">03 / Shipped Deliverables</h3>
                  <ul className="border-t border-rule bg-paper px-4">
                    {item.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-3 py-3 border-b border-rule last:border-b-0 text-sm font-medium">
                        <Check className="w-4 h-4 text-red shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div className="border border-rule bg-paper p-5">
                  <PortfolioSchematic type={item.schematic} code={item.code} className="w-full" />
                </div>

                <div>
                  <h3 className="bp-label mb-3">04 / Production Stack</h3>
                  <ul className="flex flex-wrap gap-2" aria-label="Technology stack">
                    {item.stack.map((tech) => (
                      <li
                        key={tech}
                        className="border border-ink bg-paper px-3 py-1.5 font-mono text-xs uppercase tracking-wider"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-rule flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSelected(item)}
                    className="inline-flex items-center gap-2 border border-ink bg-paper font-mono text-xs font-semibold uppercase tracking-[0.14em] px-5 py-3.5 cursor-pointer bp-sweep"
                  >
                    <Layers className="w-3.5 h-3.5 text-red" />
                    Inspect technical dossier
                  </button>

                  {item.href && (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-red text-white font-mono text-xs font-semibold uppercase tracking-[0.14em] px-5 py-3.5 bp-sweep"
                    >
                      Launch Z-OLLA
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}

        {/* Bottom CTA Block */}
        <section aria-labelledby="portfolio-cta-heading" className="mt-14 sm:mt-20 relative border border-ink bg-ink text-paper p-6 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <p className="bp-label !text-red font-semibold">Next Work Order</p>
              <h2
                id="portfolio-cta-heading"
                className="mt-3 font-display font-black uppercase text-4xl sm:text-6xl leading-[0.92]"
              >
                Ready to Put Your Build on the Line?
              </h2>
              <p className="mt-4 max-w-xl text-base text-paper/75 leading-relaxed">
                Share your product brief or automation bottleneck with our Commanders. We’ll scope the architecture, assign the right Specialist Crew, and map your deployment timeline.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
              <a
                href="/#consultation"
                className="inline-flex items-center justify-center gap-2 bg-red text-white font-mono text-xs font-semibold uppercase tracking-[0.14em] px-7 py-4 whitespace-nowrap hover:bg-white hover:text-ink transition-colors"
              >
                Get free consultation
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${CONTACT_EMAILS[0]}`}
                className="inline-flex items-center justify-center gap-2 border border-paper/30 text-paper font-mono text-xs uppercase tracking-[0.14em] px-7 py-4 whitespace-nowrap hover:border-red hover:text-red transition-colors"
              >
                {CONTACT_EMAILS[0]}
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Case Study Technical Spec Modal */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="spec-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelected(null);
          }}
        >
          <div className="relative w-full max-w-4xl border border-ink bg-raised text-ink my-auto max-h-[90dvh] overflow-y-auto">
            <CornerMarks />
            <header className="sticky top-0 z-10 flex items-center justify-between gap-4 px-5 sm:px-8 py-4 border-b border-ink bg-raised/95 backdrop-blur-md">
              <div className="bp-label">
                <span className="text-red font-semibold">{selected.code}</span> / {selected.division} / Technical Dossier
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close technical dossier"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted hover:text-red cursor-pointer p-1"
              >
                <span>ESC</span>
                <X className="w-4 h-4" />
              </button>
            </header>

            <div className="p-5 sm:p-8 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7">
                  <p className="bp-label !text-red font-semibold">
                    {selected.category} · {selected.status} ({selected.year})
                  </p>
                  <h2 id="spec-modal-title" className="mt-2 font-display font-black uppercase text-4xl sm:text-5xl leading-none">
                    {selected.title}
                  </h2>
                  <p className="mt-2 font-mono text-xs text-muted">{selected.subtitle}</p>
                  <p className="mt-4 text-base leading-relaxed">{selected.summary}</p>
                </div>
                <div className="lg:col-span-5 border border-rule bg-paper p-4">
                  <PortfolioSchematic type={selected.schematic} code={selected.code} />
                </div>
              </div>

              <dl className="grid grid-cols-1 sm:grid-cols-3 border-l border-t border-ink bg-paper">
                {selected.metrics.map((m) => (
                  <div key={m.label} className="p-4 border-r border-b border-ink">
                    <dt className="bp-label">{m.label}</dt>
                    <dd className="mt-1.5 font-display font-black text-3xl leading-none text-red tabular-nums">{m.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-rule bg-paper p-5">
                  <h3 className="bp-label !text-red font-semibold mb-2">01 / Operational Challenge</h3>
                  <p className="text-sm leading-relaxed text-ink/90">{selected.challenge}</p>
                </div>
                <div className="border border-rule bg-paper p-5">
                  <h3 className="bp-label !text-red font-semibold mb-2">02 / Engineered Architecture</h3>
                  <p className="text-sm leading-relaxed text-ink/90">{selected.architecture}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="bp-label mb-3">03 / Shipped Deliverables</h3>
                  <ul className="border-t border-rule">
                    {selected.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-3 py-2.5 border-b border-rule text-sm font-medium">
                        <Check className="w-4 h-4 text-red shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="bp-label mb-3">04 / Production Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {selected.stack.map((tech) => (
                      <span
                        key={tech}
                        className="border border-ink bg-paper px-3 py-1.5 font-mono text-xs uppercase tracking-wider"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-rule flex flex-wrap gap-3">
                    <a
                      href="/#consultation"
                      className="inline-flex items-center gap-2 bg-red text-white font-mono text-xs font-semibold uppercase tracking-[0.14em] px-5 py-3.5 bp-sweep"
                    >
                      Request a similar build
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                    {selected.href && (
                      <a
                        href={selected.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-ink bg-paper font-mono text-xs font-semibold uppercase tracking-[0.14em] px-5 py-3.5 bp-sweep"
                      >
                        Open live platform
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-rule mt-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bp-label">
          <span>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved. · HQ: {SITE.hq}
          </span>
          <div className="flex flex-wrap gap-6">
            <a href="/" className="hover:text-red transition-colors">
              Home
            </a>
            <a href="/terms" className="hover:text-red transition-colors">
              Terms of service
            </a>
            <a href="/privacy" className="hover:text-red transition-colors">
              Privacy policy
            </a>
            <a href={SOCIALS[2].href} target="_blank" rel="noopener noreferrer" className="hover:text-red transition-colors">
              GitHub ↗
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
