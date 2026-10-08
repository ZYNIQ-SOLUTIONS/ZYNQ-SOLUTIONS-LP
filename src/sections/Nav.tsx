import { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { LogoIcon } from '../components/LogoIcon';
import { ZyniqTextLogo } from '../components/ZyniqTextLogo';
import { ThemeToggle } from '../components/ThemeToggle';
import { STATIONS } from '../content/site';

// The Output station is reached by scrolling; the nav lists the four main destinations.
const LINKS = STATIONS.filter((s) => s.id !== 'output');

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md border-b border-rule">
      <div className="mx-auto max-w-7xl h-16 px-5 sm:px-8 lg:px-10 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5 shrink-0" aria-label="ZYNIQ Studio, back to top">
          <LogoIcon className="w-8 h-8" />
          <ZyniqTextLogo className="h-4 w-auto" />
          <span className="font-display font-black text-xl leading-none tracking-wide text-red translate-y-px">STUDIO</span>
        </a>

        <nav aria-label="Main" className="hidden md:flex items-center gap-7 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          {LINKS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="hover:text-ink transition-colors">
              <span className="text-red mr-1.5">{s.number}</span>
              {s.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-3">
          <ThemeToggle />
          <a
            href="#consultation"
            className="hidden sm:inline-flex items-center gap-2 bg-red text-white font-mono text-[11px] font-semibold uppercase tracking-[0.14em] px-4 py-2.5 hover:bg-ink hover:text-paper transition-colors"
          >
            Start a build
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <button
            type="button"
            className="md:hidden p-2 text-muted hover:text-ink cursor-pointer"
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
        <nav id="mobile-menu" aria-label="Mobile" className="md:hidden absolute top-16 inset-x-0 bg-paper border-b border-rule">
          <ul className="px-5 py-2 font-display font-black uppercase text-3xl">
            {LINKS.map((s) => (
              <li key={s.id} className="border-b border-rule last:border-b-0">
                <a href={`#${s.id}`} onClick={() => setOpen(false)} className="flex items-baseline gap-4 py-4">
                  <span className="font-mono text-[11px] font-normal tracking-widest text-red">{s.number}</span>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
