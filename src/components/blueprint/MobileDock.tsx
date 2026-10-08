import { ArrowRight } from 'lucide-react';
import type { StationDef } from '../../types';
import { useLineProgress } from './ProductionLine';

// Phones have no room for the nav button, so the call to action rides along the
// bottom edge with the current station. It appears once the line has started and
// steps aside at the last station, where the form itself is on screen.
export function MobileDock({ stations }: { stations: StationDef[] }) {
  const { reached } = useLineProgress(stations);
  const current = reached > 0 ? stations[reached - 1] : null;
  const visible = current !== null && reached < stations.length;
  const shown = current ?? stations[0];

  return (
    <div
      inert={!visible}
      className={`sm:hidden [@media(max-height:500px)]:hidden fixed bottom-0 inset-x-0 z-40 border-t border-ink bg-paper/95 backdrop-blur-md transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center justify-between gap-3 pl-5 pr-2 py-2">
        <p className="bp-label min-w-0 truncate">
          <span className="text-red font-semibold">{shown.number}</span>
          <span aria-hidden="true"> / </span>
          {shown.label}
        </p>
        <a
          href="#consultation"
          className="shrink-0 inline-flex items-center gap-2 h-11 px-3.5 bg-red text-white font-mono text-[11px] font-semibold uppercase tracking-[0.14em]"
        >
          Start a build
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
