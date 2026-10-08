import { ArrowRight } from 'lucide-react';
import { Gauge } from '../components/blueprint/Gauge';
import { Station } from '../components/blueprint/Station';
import { STATIONS } from '../content/site';
import { STATS } from '../content/stats';

export function Output() {
  return (
    <Station
      {...STATIONS[0]}
      title="Architecting Synthetic Brains"
      intro={'ZYNIQ provides the "Crews" and "Specialist Agents" to handle the building, leaving the "Commanders" to navigate the unknown. We are building a Quantic Calculator for the soul of humanity.'}
    >
      <dl className="grid grid-cols-1 md:grid-cols-3 border border-ink bg-raised">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className="flex flex-col items-center text-center p-8 border-rule border-b last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
          >
            <span className="bp-label self-start">Gauge 0{i + 1}</span>
            <dd className="mt-4 w-full flex justify-center">
              <Gauge value={stat.value} suffix={stat.suffix} fill={stat.fill} />
              <span className="sr-only">
                {stat.value}
                {stat.suffix}
              </span>
            </dd>
            <dt className="mt-2 font-mono text-xs font-semibold uppercase tracking-[0.14em]">{stat.label}</dt>
            <p className="mt-2 text-sm text-muted leading-relaxed max-w-[26ch]">{stat.note}</p>
          </div>
        ))}
      </dl>

      <a
        href="#services"
        className="mt-8 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] border-b border-ink pb-1 hover:text-red hover:border-red transition-colors"
      >
        Explore services
        <ArrowRight className="w-4 h-4" />
      </a>
    </Station>
  );
}
