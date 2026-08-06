import { ArrowUpRight } from 'lucide-react';

export function ConsultationSection() {
  return (
    <section id="consultation-section" className="relative z-10 py-24 lg:py-32 bg-[#141414]/30 border-t border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <span className="text-xs font-mono text-brand-accent block uppercase tracking-widest font-bold">// INITIATE SEQUENCE</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black uppercase text-white tracking-tight italic">
            Get Free Consultation
          </h2>
          <p className="text-brand-text-muted text-sm max-w-xl mx-auto font-sans leading-relaxed">
            Ready to architect your custom synthetic brain? Connect with our specialist commanders and start engineering the future today.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <form className="bg-surface border border-white/10 rounded-none p-6 sm:p-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="firstName" className="text-[10px] font-mono text-white/60 font-bold uppercase tracking-wider block">First Name</label>
                <input id="firstName" type="text" className="w-full bg-black border border-white/10 rounded-none p-3 text-sm text-white focus:outline-none focus:border-brand-accent transition-colors placeholder:text-zinc-700 font-mono" placeholder="COMMANDER" />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="lastName" className="text-[10px] font-mono text-white/60 font-bold uppercase tracking-wider block">Last Name</label>
                <input id="lastName" type="text" className="w-full bg-black border border-white/10 rounded-none p-3 text-sm text-white focus:outline-none focus:border-brand-accent transition-colors placeholder:text-zinc-700 font-mono" placeholder="PRIME" />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-[10px] font-mono text-white/60 font-bold uppercase tracking-wider block">Email Address</label>
              <input id="email" type="email" className="w-full bg-black border border-white/10 rounded-none p-3 text-sm text-white focus:outline-none focus:border-brand-accent transition-colors placeholder:text-zinc-700 font-mono" placeholder="commander@domain.com" />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="message" className="text-[10px] font-mono text-white/60 font-bold uppercase tracking-wider block">Mission Brief</label>
              <textarea id="message" rows={4} className="w-full bg-black border border-white/10 rounded-none p-3 text-sm text-white focus:outline-none focus:border-brand-accent transition-colors placeholder:text-zinc-700 font-mono resize-none" placeholder="Describe your operational targets..."></textarea>
            </div>

            <button
              type="button"
              className="w-full mt-4 inline-flex items-center justify-center space-x-2 bg-brand-accent text-white font-black uppercase tracking-wider text-xs py-3.5 px-8 rounded-none hover:bg-white hover:text-black transition-all cursor-pointer"
            >
              <span>SUBMIT TRANSMISSION</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
