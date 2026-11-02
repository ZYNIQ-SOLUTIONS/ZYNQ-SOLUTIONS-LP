import { ArrowRight } from 'lucide-react';
import { Station } from '../components/blueprint/Station';
import { STATIONS } from '../content/site';
import { STATS } from '../content/stats';

export function Output() {
  return (
    <Station
      {...STATIONS[0]}
      title="Engineered Output"
      intro="Measured performance metrics across our automated software factory pipelines and autonomous agent deployments."
    >
      <ul className="grid grid-cols-1 md:grid-cols-3 border border-ink bg-raised">
        {STATS.map((stat, i) => (
          <li
            key={stat.label}
            className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-ink last:border-b-0 md:last:border-r-0 flex flex-col justify-between"
          >
            <div>
              <span className="bp-label">Metric 0{i + 1}</span>
              <div className="mt-4 font-display font-semibold text-5xl lg:text-6xl tabular-nums leading-none">
                {stat.value}
                <span className="text-red ml-0.5">{stat.suffix}</span>
              </div>
              <h3 className="mt-3 font-mono text-xs font-semibold">{stat.label}</h3>
            </div>
            <p className="mt-4 text-sm text-muted leading-relaxed">{stat.note}</p>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-muted leading-relaxed">
        Results from ZYNIQ internal tests and client engagements. Individual results vary.
      </p>

      <a
        href="#services"
        className="mt-6 inline-flex items-center gap-2 font-mono text-xs font-medium underline decoration-1 underline-offset-4 hover:text-red transition-colors"
      >
        Explore services
        <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </Station>
  );
}
