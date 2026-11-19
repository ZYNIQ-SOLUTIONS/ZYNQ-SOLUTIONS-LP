import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Minus, Plus } from 'lucide-react';
import { Station } from '../components/blueprint/Station';
import { SERVICES } from '../content/services';
import { station } from '../content/site';
import type { Service } from '../types';

function Deliverables({ items }: { items: string[] }) {
  return (
    <ul className="border-t border-rule">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 py-2.5 border-b border-rule text-sm font-medium">
          <span aria-hidden="true" className="mt-1.5 w-1.5 h-1.5 bg-red shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function RequestLink() {
  return (
    <a
      href="#consultation"
      className="inline-flex items-center gap-2 bg-red text-white text-sm font-medium hover:bg-ink hover:text-paper h-11 px-5 bp-btn"
    >
      Request this service
      <ArrowRight className="w-3.5 h-3.5" />
    </a>
  );
}

// Desktop: the full index on the left, one service drawn out in detail on the right.
function ServiceIndex({ activeId, onSelect }: { activeId: string; onSelect: (id: string) => void }) {
  const reduce = useReducedMotion();
  const active = SERVICES.find((s) => s.id === activeId) ?? SERVICES[0];

  return (
    <div className="hidden lg:grid grid-cols-12 gap-10 items-start">
      <ul className="col-span-6 border-t border-ink" aria-label="Services">
        {SERVICES.map((service) => {
          const isActive = service.id === active.id;
          return (
            <li key={service.id} className="border-b border-rule">
              <button
                type="button"
                aria-pressed={isActive}
                aria-controls="service-detail"
                onClick={() => onSelect(service.id)}
                onPointerEnter={(e) => e.pointerType === 'mouse' && onSelect(service.id)}
                className="group w-full grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-4 text-left cursor-pointer"
              >
                <span className={`font-mono text-xs ${isActive ? 'text-red font-semibold' : 'text-muted'}`}>
                  {service.number}
                </span>
                <span
                  className={`font-display font-bold uppercase text-3xl xl:text-4xl leading-none transition-colors ${
                    isActive ? 'text-ink' : 'text-muted group-hover:text-ink'
                  }`}
                >
                  {service.title}
                </span>
                <span
                  aria-hidden="true"
                  className={`h-px self-center transition-all duration-200 ${isActive ? 'w-10 bg-red' : 'w-0 bg-transparent'}`}
                />
              </button>
            </li>
          );
        })}
      </ul>

      <article id="service-detail" className="col-span-6 sticky top-24 border border-ink bg-raised">
        <header className="flex items-center justify-between gap-3 px-8 py-3.5 border-b border-ink bp-label">
          <span>Service {active.number} / {String(SERVICES.length).padStart(2, '0')}</span>
          <span className="text-cyan">{active.subtitle}</span>
        </header>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="p-8 xl:p-10"
          >
            <h3 className="font-display font-black uppercase text-5xl xl:text-6xl leading-[0.88] tracking-tight">
              {active.title}
            </h3>
            <p className="mt-5 text-base xl:text-lg leading-relaxed text-muted">{active.description}</p>
            <h4 className="bp-label mt-8 mb-2">Deliverables</h4>
            <Deliverables items={active.deliverables} />
            <div className="mt-8">
              <RequestLink />
            </div>
          </motion.div>
        </AnimatePresence>
      </article>
    </div>
  );
}

// Phones and tablets: an accordion, one row per service.
interface ServiceRowProps {
  service: Service;
  open: boolean;
  onToggle: () => void;
}

function ServiceRow({ service, open, onToggle }: ServiceRowProps) {
  const reduce = useReducedMotion();
  const panelId = `service-panel-${service.id}`;

  return (
    <>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="grid grid-cols-[2.5rem_1fr_auto] gap-x-4 items-center w-full text-left px-4 sm:px-6 py-5 cursor-pointer group"
        >
          <span className={`font-mono text-xs ${open ? 'text-red font-semibold' : 'text-muted'}`}>{service.number}</span>
          <span className="min-w-0">
            <span
              className={`block font-display font-bold uppercase leading-none text-2xl sm:text-3xl break-words transition-colors ${
                open ? 'text-red' : 'group-hover:text-red'
              }`}
            >
              {service.title}
            </span>
            <span className="block mt-1.5 font-mono text-[11px] text-muted">{service.subtitle}</span>
          </span>
          <span aria-hidden="true" className={open ? 'text-red' : 'text-muted group-hover:text-ink'}>
            {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-label={service.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-6 pb-8 pt-1 sm:pl-[5.5rem] space-y-6">
              <p className="text-base leading-relaxed text-muted">{service.description}</p>
              <div>
                <h4 className="bp-label mb-2">Deliverables</h4>
                <Deliverables items={service.deliverables} />
              </div>
              <RequestLink />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Services() {
  const [activeId, setActiveId] = useState(SERVICES[0].id);
  const [openId, setOpenId] = useState<string | null>(SERVICES[0].id);

  return (
    <Station
      {...station('services')}
      title="What comes off the line"
      intro="Ten engineering services, from a first prototype to the systems that run your operations. Each one runs through the same line and the same sign-offs."
    >
      <ServiceIndex activeId={activeId} onSelect={setActiveId} />

      <ul className="lg:hidden border border-ink bg-raised">
        {SERVICES.map((service) => (
          <li key={service.id} className="border-b border-rule last:border-b-0">
            <ServiceRow
              service={service}
              open={service.id === openId}
              onToggle={() => setOpenId(service.id === openId ? null : service.id)}
            />
          </li>
        ))}
      </ul>
    </Station>
  );
}
