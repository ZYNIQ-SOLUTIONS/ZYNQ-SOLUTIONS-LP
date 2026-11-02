import { CONTAINER } from '../components/blueprint/layout';

export function Manifesto() {
  return (
    <section aria-label="Manifesto" className="relative overflow-hidden bg-ink text-paper py-14 sm:py-20 lg:py-28">
      <div className={`${CONTAINER} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end`}>
        <div className="lg:col-span-9">
          <p className="bp-label !text-paper/50 mb-4 sm:mb-6">Factory principle</p>
          <blockquote className="font-display font-semibold uppercase leading-[0.92] tracking-tight text-[clamp(2.25rem,6.5vw,5.5rem)] text-balance">
            “At ZYNIQ, we believe the human mind was meant to <span className="text-red">explore</span>, not just execute.”
          </blockquote>
        </div>

        <div className="lg:col-span-3 space-y-4 border-l border-paper/20 pl-6">
          <p className="text-sm sm:text-base leading-relaxed text-paper/75">
            Autonomous agent crews handle the routine building, compilation, and testing. Human engineering leads steer the
            system and define the architecture.
          </p>
          <p className="font-mono text-xs leading-relaxed text-paper/50">
            Engineered in Dubai for real-world deployment.
          </p>
        </div>
      </div>
    </section>
  );
}
