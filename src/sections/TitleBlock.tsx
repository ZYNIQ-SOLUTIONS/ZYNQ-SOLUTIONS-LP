import { LogoIcon } from '../components/LogoIcon';
import { ZyniqTextLogo } from '../components/ZyniqTextLogo';
import { CONTAINER } from '../components/blueprint/layout';
import { CONTACT_EMAILS, SITE, SOCIALS, STATIONS } from '../content/site';

const CELL = 'p-6 sm:p-8 border-rule';
const LINK = 'inline-flex items-center min-h-11 min-w-11 lg:min-h-0 lg:min-w-0 hover:text-red transition-colors';

// Footer laid out like the title block in the corner of a technical drawing.
export function TitleBlock() {
  return (
    <footer className="border-t border-rule pt-12 sm:pt-16 pb-10">
      <div className={CONTAINER}>
        <div className="border border-ink bg-raised">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12">
            <div className={`${CELL} lg:col-span-5 border-b lg:border-r`}>
              <div className="flex items-center gap-2.5">
                <LogoIcon className="w-8 h-8" />
                <ZyniqTextLogo className="h-4 w-auto" />
                <span className="font-display font-black text-xl leading-none tracking-wide text-red translate-y-px">STUDIO</span>
              </div>
              <p className="mt-5 text-sm text-muted leading-relaxed max-w-sm">{SITE.tagline}</p>
            </div>

            <div className={`${CELL} lg:col-span-3 border-b md:border-l lg:border-l-0 lg:border-r`}>
              <h3 className="bp-label mb-4">Index</h3>
              <ul className="grid grid-cols-2 gap-x-4 sm:block lg:space-y-2.5 font-mono text-xs uppercase tracking-wider">
                {STATIONS.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className={LINK}>
                      <span className="text-red mr-2">{s.number}</span>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`${CELL} lg:col-span-4 border-b min-w-0`}>
              <h3 className="bp-label mb-4">Contact</h3>
              <ul className="lg:space-y-2.5 font-mono text-xs">
                {CONTACT_EMAILS.map((email) => (
                  <li key={email} className="truncate">
                    <a href={`mailto:${email}`} className={LINK}>
                      {email}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="bp-label mt-5">HQ: {SITE.hq}</p>
            </div>

            <div className={`${CELL} md:col-span-2 lg:col-span-12 border-b`}>
              <h3 className="bp-label mb-4">Channels</h3>
              <ul className="grid grid-cols-2 gap-x-4 sm:flex sm:flex-wrap sm:gap-x-6 lg:gap-y-2.5 font-mono text-xs uppercase tracking-wider">
                {SOCIALS.map((s) => (
                  <li key={s.name}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className={LINK}>
                      {s.name} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="px-6 sm:px-8 py-4 flex flex-col sm:flex-row justify-between gap-3 bp-label">
            <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
            <span className="flex gap-6 -my-3 lg:my-0">
              <a href="#terms" className={LINK}>Terms of service</a>
              <a href="#privacy" className={LINK}>Privacy policy</a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
