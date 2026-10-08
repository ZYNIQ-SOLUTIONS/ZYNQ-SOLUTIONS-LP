import { useEffect, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { LogoIcon } from '../components/LogoIcon';
import { ZyniqTextLogo } from '../components/ZyniqTextLogo';
import { ThemeToggle } from '../components/ThemeToggle';
import { useLineProgress } from '../components/blueprint/ProductionLine';
import { CONTACT_EMAILS, SITE, STATIONS } from '../content/site';

// The Output station is reached by scrolling; the nav lists the four main destinations.
const LINKS = STATIONS.filter((s) => s.id !== 'output');

export function Nav() {
  const [open, setOpen] = useState(false);
  const { reached } = useLineProgress(STATIONS);
  const currentId = reached > 0 ? STATIONS[reached - 1].id : null;

  // While the menu covers the screen: hold the page still, close on Escape,
  // and close if the window grows into the desktop layout.
  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia('(min-width: 1024px)');
    const close = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    desktop.addEventListener('change', close);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', close);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md border-b border-rule">
      <div className="mx-auto max-w-7xl h-16 px-5 sm:px-8 lg:px-10 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5 h-11 shrink-0" aria-label="ZYNIQ Studio, back to top">
          <LogoIcon className="w-8 h-8" />
          <ZyniqTextLogo className="h-4 w-auto" />
          <span className="font-display font-black text-xl leading-none tracking-wide text-red translate-y-px">STUDIO</span>
        </a>

        <nav aria-label="Main" className="hidden lg:flex items-center gap-7 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          {LINKS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={s.id === currentId ? 'location' : undefined}
              className={`py-1 border-b-2 transition-colors ${
                s.id === currentId ? 'text-ink border-red' : 'border-transparent hover:text-ink'
              }`}
            >
              <span className="text-red mr-1.5">{s.number}</span>
              {s.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center sm:gap-3">
          <ThemeToggle />
          <a
            href="#consultation"
            className="hidden sm:inline-flex items-center gap-2 bg-red text-white font-mono text-[11px] font-semibold uppercase tracking-[0.14em] px-4 h-11 lg:h-auto lg:py-2.5 hover:bg-ink hover:text-paper transition-colors"
          >
            Start a build
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <button
            type="button"
            className="lg:hidden w-11 h-11 -mr-2.5 inline-flex items-center justify-center text-muted hover:text-ink cursor-pointer"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="lg:hidden absolute top-16 inset-x-0 h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain bg-paper bp-grid border-t border-rule flex flex-col px-5 sm:px-8"
          style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
        >
          <p className="bp-label pt-6 pb-2">Index / Stations</p>
          <ul className="border-t border-ink font-display font-black uppercase text-4xl">
            {LINKS.map((s) => (
              <li key={s.id} className="border-b border-rule">
                <a
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={s.id === currentId ? 'location' : undefined}
                  className="flex items-baseline gap-4 py-4"
                >
                  <span className="font-mono text-[11px] font-normal tracking-widest text-red">{s.number}</span>
                  <span className="flex-1">{s.label}</span>
                  {s.id === currentId && <span className="bp-label !text-red font-semibold self-center">You are here</span>}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-8">
            <a
              href="#consultation"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 bg-red text-white font-mono text-xs font-semibold uppercase tracking-[0.14em] px-7 py-4"
            >
              Start a build
              <ArrowRight className="w-4 h-4" />
            </a>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 bp-label">
              <a href={`mailto:${CONTACT_EMAILS[0]}`} className="inline-flex items-center min-h-11 normal-case tracking-normal text-ink">
                {CONTACT_EMAILS[0]}
              </a>
              <span>HQ: {SITE.hq}</span>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
