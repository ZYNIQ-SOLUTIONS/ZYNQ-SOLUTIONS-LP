import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CornerMarks } from '../components/blueprint/CornerMarks';
import { Station } from '../components/blueprint/Station';
import { SECTORS } from '../content/sectors';
import { STATIONS } from '../content/site';

function SectorSchematic({ id }: { id: string }) {
  const stroke = { fill: 'none', stroke: 'var(--ink)', strokeWidth: 1.5 };
  const red = { fill: 'var(--red)' };

  return (
    <svg viewBox="0 0 240 160" className="w-full max-w-xs" aria-hidden="true">
      {id === 'cloud' && (
        // three linked node clusters
        <g {...stroke}>
          <path d="M50 110L120 40L190 110Z" strokeDasharray="4 4" />
          {[
            [120, 40],
            [50, 110],
            [190, 110],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <rect x={x - 22} y={y - 16} width="44" height="32" fill="var(--paper-raised)" />
              <path d={`M${x - 14} ${y - 6}h28M${x - 14} ${y + 6}h28`} />
              <rect x={x + 8} y={y - 9} width="6" height="6" stroke="none" {...red} />
            </g>
          ))}
        </g>
      )}
      {id === 'core' && (
        // a central engine with signals radiating out
        <g {...stroke}>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <path key={a} d="M120 80L120 14" transform={`rotate(${a} 120 80)`} strokeDasharray="3 5" />
          ))}
          <circle cx="120" cy="80" r="52" />
          <rect x="94" y="54" width="52" height="52" fill="var(--paper-raised)" />
          <rect x="108" y="68" width="24" height="24" stroke="none" {...red} />
        </g>
      )}
      {id === 'studio' && (
        // a drawing board with a layout and a cursor
        <g {...stroke}>
          <rect x="30" y="20" width="180" height="120" fill="var(--paper-raised)" />
          <path d="M30 44h180" />
          <rect x="46" y="60" width="70" height="64" />
          <path d="M132 64h62M132 80h62M132 96h40" />
          <rect x="132" y="108" width="34" height="14" stroke="none" {...red} />
          <path d="M176 96l22 10-9 4-4 9z" fill="var(--ink)" />
        </g>
      )}
      {id === 'solutions' && (
        // interlocking blocks: a system fitted to the problem
        <g {...stroke}>
          <rect x="40" y="30" width="70" height="46" fill="var(--paper-raised)" />
          <rect x="130" y="30" width="70" height="46" fill="var(--paper-raised)" />
          <rect x="40" y="90" width="70" height="46" fill="var(--paper-raised)" />
          <rect x="130" y="90" width="70" height="46" stroke="var(--red)" {...red} />
          <path d="M110 53h20M110 113h20M75 76v14M165 76v14" strokeWidth="3" />
        </g>
      )}
    </svg>
  );
}

export function Sectors() {
  const [activeId, setActiveId] = useState(SECTORS[0].id);
  const active = SECTORS.find((s) => s.id === activeId) ?? SECTORS[0];

  return (
    <Station
      {...STATIONS[1]}
      title="The Software Factory of the Next Era"
      intro="Combining synthetic intelligence, niche problem-solving, and uncompromising quality to deliver powerful, intelligent solutions."
    >
      {/* Floor plan: four bays */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-l border-t border-ink">
        {SECTORS.map((sector) => {
          const isActive = sector.id === activeId;
          return (
            <button
              key={sector.id}
              type="button"
              aria-pressed={isActive}
              aria-controls="sector-detail"
              onClick={() => setActiveId(sector.id)}
              className={`relative text-left p-6 min-h-[200px] flex flex-col border-r border-b border-ink cursor-pointer transition-colors ${
                isActive ? 'bg-raised' : 'hover:bg-raised/60'
              }`}
            >
              <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1 ${isActive ? 'bg-red' : 'bg-transparent'}`} />
              <span className={`bp-label ${isActive ? '!text-red font-semibold' : ''}`}>Bay {sector.number}</span>
              <span className="mt-3 font-display font-black uppercase text-3xl leading-none">{sector.title}</span>
              <span className="mt-3 text-sm text-muted leading-relaxed">{sector.description}</span>
            </button>
          );
        })}
      </div>

      <div id="sector-detail" className="relative mt-6 border border-rule bg-raised p-6 sm:p-10">
        <CornerMarks />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-7">
              <p className="bp-label">
                Detail / Bay {active.number} / {active.title}
              </p>
              <h3 className="mt-3 font-display font-black uppercase text-3xl sm:text-4xl leading-none">{active.detailTitle}</h3>
              <p className="mt-4 text-base text-muted leading-relaxed max-w-xl">{active.detailExplanation}</p>
            </div>
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <SectorSchematic id={active.id} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Station>
  );
}
