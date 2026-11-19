import { CONTAINER } from '../components/blueprint/layout';
import { Stamp } from '../components/blueprint/Stamp';

export function Manifesto() {
  return (
    <section aria-label="Manifesto" className="sheet-night bp-grid relative overflow-hidden border-t border-ink py-20 sm:py-28 lg:py-40">
      <div className={`${CONTAINER} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end`}>
        <div className="lg:col-span-9">
          <p className="bp-label mb-6 sm:mb-8 flex items-center gap-3">
            <span className="text-red font-semibold">&sect;</span>
            <span aria-hidden="true" className="h-px w-8 bg-cyan/60" />
            Factory principle
          </p>
          <blockquote className="font-display font-black uppercase leading-[0.88] tracking-tight text-[clamp(2.5rem,7vw,6.5rem)] text-balance">
            “At ZYNIQ, we believe the human mind was meant to <span className="text-red">explore</span>, not just execute.”
          </blockquote>
        </div>

        <div className="lg:col-span-3 space-y-4 relative border-l border-rule pl-6">
          <Stamp label="Approved" mark="ZYQ" foot="Studio principle" rotate={-4} className="inline-block mb-4" />
          <p className="text-sm sm:text-base leading-relaxed text-muted">
            Autonomous agent crews handle the routine building, compilation, and testing. Human engineering leads steer the
            system and define the architecture.
          </p>
          <p className="font-mono text-xs leading-relaxed text-cyan">
            Engineered in Dubai for real-world deployment.
          </p>
        </div>
      </div>
    </section>
  );
}
