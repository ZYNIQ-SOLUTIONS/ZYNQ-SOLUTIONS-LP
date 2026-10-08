import { CONTAINER } from '../components/blueprint/layout';

export function Manifesto() {
  return (
    <section aria-label="Manifesto" className="relative overflow-hidden bg-ink text-paper py-20 sm:py-28">
      <div className={`${CONTAINER} grid grid-cols-1 lg:grid-cols-12 gap-10 items-end`}>
        <blockquote className="lg:col-span-8 font-display font-black uppercase leading-[0.92] tracking-tight text-[clamp(2.5rem,7vw,5.5rem)] text-balance">
          “At ZYNIQ, we believe the human mind was meant to <span className="text-red">explore</span>, not just execute.”
        </blockquote>

        <div className="lg:col-span-4 space-y-5 border-l border-paper/25 pl-6">
          <p className="text-base leading-relaxed text-paper/75">
            Our Software Factory provides the 'Crews' and 'Specialist Agents' to handle the building, leaving the
            'Commanders' to navigate the unknown.
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.14em] leading-relaxed text-paper/60">
            We are building a Quantic Calculator for the soul of humanity.
          </p>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="hidden sm:block absolute top-8 right-8 lg:right-16 -rotate-12 border-2 border-red text-red px-4 py-2 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.2em] leading-relaxed"
      >
        Approved
        <br />
        ZYNIQ Studio
      </div>
    </section>
  );
}
