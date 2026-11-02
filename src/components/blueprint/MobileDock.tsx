import { ArrowRight } from 'lucide-react';
import type { StationDef } from '../../types';
import { useLineProgress } from './ProductionLine';

export function MobileDock({ stations }: { stations: StationDef[] }) {
  const { reached } = useLineProgress(stations);
  const current = reached > 0 ? stations[reached - 1] : null;
  const visible = current !== null && reached < stations.length;
  const shown = current ?? stations[0];

  return (
    <div
      inert={!visible}
      className={`sm:hidden [@media(max-height:500px)]:hidden fixed bottom-0 inset-x-0 z-40 border-t border-ink bg-paper/95 backdrop-blur-md transition-transform duration-200 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center justify-between gap-3 pl-4 pr-3 py-2">
        <p className="bp-label min-w-0 truncate">
          <span className="text-red font-medium">{shown.number}</span>
          <span aria-hidden="true" className="text-muted/60"> / </span>
          <span>{shown.label}</span>
        </p>
        <a
          href="#consultation"
          className="shrink-0 inline-flex items-center gap-1.5 h-10 px-3.5 bg-red text-white text-xs font-medium hover:bg-ink hover:text-paper bp-btn"
        >
          Consultation
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
