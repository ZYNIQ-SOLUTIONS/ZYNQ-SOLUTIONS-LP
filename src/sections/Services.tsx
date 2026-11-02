import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Minus, Plus } from 'lucide-react';
import { Station } from '../components/blueprint/Station';
import { SERVICES } from '../content/services';
import { STATIONS } from '../content/site';

const ROW_GRID = 'grid grid-cols-[2.5rem_1fr_auto] md:grid-cols-[4rem_1fr_16rem_2rem] gap-x-4 items-center';

export function Services() {
  const [openId, setOpenId] = useState<string | null>(SERVICES[0].id);
  const reduce = useReducedMotion();

  return (
    <Station
      {...STATIONS[2]}
      title="Engineering Services"
      intro="Production-grade software engineering, custom intelligence pipelines, and autonomous system operations."
    >
      <div className="border border-ink bg-raised">
        <div className={`${ROW_GRID} px-4 sm:px-6 py-3 border-b border-ink bp-label`}>
          <span>No.</span>
          <span>Service</span>
          <span className="hidden md:block">Discipline</span>
          <span />
        </div>

        <ul>
          {SERVICES.map((service) => {
            const isOpen = service.id === openId;
            const panelId = `service-panel-${service.id}`;
            return (
              <li key={service.id} className="border-b border-rule last:border-b-0">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : service.id)}
                    className={`${ROW_GRID} w-full text-left px-4 sm:px-6 py-5 cursor-pointer group`}
                  >
                    <span className={`font-mono text-xs ${isOpen ? 'text-red font-semibold' : 'text-muted'}`}>
                      {service.number}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={`block font-display font-semibold uppercase leading-none text-xl sm:text-3xl break-words transition-colors duration-200 ${
                          isOpen ? 'text-red' : 'group-hover:text-red'
                        }`}
                      >
                        {service.title}
                      </span>
                      <span className="md:hidden block mt-1.5 font-mono text-[11px] text-muted">{service.subtitle}</span>
                    </span>
                    <span className="hidden md:block font-mono text-xs text-muted">{service.subtitle}</span>
                    <span aria-hidden="true" className={isOpen ? 'text-red' : 'text-muted group-hover:text-ink'}>
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
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
                      <div className="px-4 sm:px-6 pb-8 pt-1 grid grid-cols-1 md:grid-cols-[4rem_1fr_1fr] gap-x-4 gap-y-6">
                        <span className="hidden md:block" />
                        <div>
                          <p className="text-base leading-relaxed text-muted max-w-md">{service.description}</p>
                          <a
                            href="#consultation"
                            className="mt-6 inline-flex items-center gap-2 border border-ink text-sm font-medium hover:bg-ink hover:text-paper h-11 px-5 bp-btn"
                          >
                            Request this service
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                        <div>
                          <h4 className="bp-label mb-3">Deliverables</h4>
                          <ul className="border-t border-rule">
                            {service.deliverables.map((item) => (
                              <li key={item} className="flex items-start gap-3 py-2.5 border-b border-rule text-sm font-medium">
                                <span aria-hidden="true" className="mt-1.5 w-1.5 h-1.5 bg-red shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </Station>
  );
}
