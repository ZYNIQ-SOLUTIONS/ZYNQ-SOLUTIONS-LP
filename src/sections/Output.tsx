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
      <ul className="grid grid-cols-1 md:grid-cols-3 bg-ink text-paper">
        {STATS.map((stat, i) => (
          <li
            key={stat.label}
            className="grid grid-cols-[7.5rem_1fr] gap-x-5 items-center p-5 md:flex md:flex-col md:text-center md:px-8 md:py-12 border-paper/15 border-b last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
          >
            <span className="bp-label !text-paper/50 col-span-2 md:self-start">Gauge 0{i + 1}</span>
            <div className="mt-3 md:mt-4 w-full flex justify-center">
              <Gauge value={stat.value} suffix={stat.suffix} fill={stat.fill} />
            </div>
            <div className="mt-3 md:mt-2">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.14em]">{stat.label}</h3>
              <p className="mt-2 text-sm text-paper/60 leading-relaxed md:max-w-[26ch] md:mx-auto">{stat.note}</p>
            </div>
          </li>
        ))}
      </ul>

      <a
        href="#services"
        className="mt-6 sm:mt-8 inline-flex items-center gap-2 min-h-11 font-mono text-xs font-semibold uppercase tracking-[0.14em] underline decoration-1 underline-offset-8 hover:text-red transition-colors"
      >
        Explore services
        <ArrowRight className="w-4 h-4" />
      </a>
    </Station>
  );
}
