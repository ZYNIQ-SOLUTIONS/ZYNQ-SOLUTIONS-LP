import { Fragment, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { LogoIcon } from '../components/LogoIcon';
import { LEGAL_DOCS, type LegalPath } from '../content/legal';
import { SITE } from '../content/site';

const slug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export default function LegalPage({ doc }: { doc: LegalPath }) {
  const page = LEGAL_DOCS.find((d) => d.path === doc) ?? LEGAL_DOCS[0];
  const others = LEGAL_DOCS.filter((d) => d !== page);
  const name = page.name ?? page.title;

  useEffect(() => {
    document.title = `${name} | ZYNIQ Studio`;
    window.scrollTo(0, 0);
  }, [name]);

  return (
    <div className="min-h-screen bg-paper text-ink font-sans antialiased bp-grid">
      <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md border-b border-rule">
        <div className="mx-auto max-w-7xl h-16 px-5 sm:px-8 lg:px-10 flex items-center justify-between gap-4">
          <a href="/" className="flex items-center h-11 shrink-0" aria-label="ZYNIQ Studio, back to the website">
            <LogoIcon className="w-8 h-8" />
          </a>
          <a href="/" className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-ink transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to site
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-12 sm:py-16">
        <p className="bp-label flex flex-wrap items-center gap-x-3 gap-y-1">
          {(page.label ?? ['Documentation']).map((part) => (
            <Fragment key={part}>
              <span>{part}</span>
              <span aria-hidden="true" className="h-px w-6 bg-rule" />
            </Fragment>
          ))}
          <span>Updated {page.updated}</span>
        </p>
        <h1 className="mt-4 font-display font-semibold uppercase text-4xl sm:text-6xl leading-[0.94] tracking-tight">{page.title}</h1>
        <p className="mt-4 max-w-2xl text-muted text-base leading-relaxed">{page.summary}</p>
        <div aria-hidden="true" className="mt-8 flex items-center">
          <span className="w-1.5 h-1.5 bg-red" />
          <span className="h-px flex-1 bg-rule" />
          <span className="h-1.5 w-px bg-rule" />
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <nav aria-label="On this page" className="lg:col-span-4 lg:sticky lg:top-24 border border-rule bg-raised p-5">
            <h2 className="bp-label mb-3">Contents</h2>
            <ol className="space-y-1 font-mono text-xs">
              {page.sections.map((s, i) => (
                <li key={s.title}>
                  <a href={`#${slug(s.title)}`} className="flex gap-3 py-1.5 text-muted hover:text-ink transition-colors">
                    <span className="w-6 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    <span>{s.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="lg:col-span-8 max-w-3xl">
            {page.sections.map((s, i) => (
              <section key={s.title} id={slug(s.title)} className="scroll-mt-24 pb-10 mb-10 border-b border-rule last:border-b-0">
                <h2 className="font-display font-semibold uppercase text-2xl sm:text-3xl leading-snug">
                  <span className="text-muted mr-3 font-mono text-sm align-middle">{String(i + 1).padStart(2, '0')}</span>
                  {s.title}
                </h2>
                {s.paragraphs?.map((p) => (
                  <p key={p} className="mt-4 text-base leading-relaxed text-ink/90">
                    {p}
                  </p>
                ))}
                {s.items && (
                  <ul className="mt-4 space-y-2.5">
                    {s.items.map((item) => (
                      <li key={item} className="flex gap-3 text-base leading-relaxed text-ink/90">
                        <span aria-hidden="true" className="mt-2.5 w-1.5 h-1.5 bg-red shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </article>
        </div>
      </main>

      <footer className="border-t border-rule">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-6 flex flex-col sm:flex-row justify-between gap-3 bp-label">
          <span>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </span>
          <span className="flex flex-wrap gap-x-6 gap-y-2">
            {others.map((d) => (
              <a key={d.path} href={d.path} className="inline-flex items-center hover:text-red transition-colors">
                {d.name ?? d.title}
              </a>
            ))}
            <a href="/" className="inline-flex items-center hover:text-red transition-colors">
              Home
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
