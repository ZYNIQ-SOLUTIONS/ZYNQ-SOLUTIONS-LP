import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowUpRight,
  Sparkles,
  Layers,
  Cpu,
  Search,
  CheckCircle,
  HelpCircle,
  Clock,
  Phone,
  Mail,
  Send,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Twitch,
  Heart,
  Video,
  Settings,
  ChevronRight,
  Code2,
  Terminal,
  Play
} from 'lucide-react';
import ParticleGrid from './components/ParticleGrid';
import PillarsSection from './components/PillarsSection';
import UseCasesSection from './components/UseCasesSection';
import AgentSandbox from './components/AgentSandbox';
import { ServicesSection } from './components/ServicesSection';
import { LogoIcon } from './components/LogoIcon';
import { ZyniqTextLogo } from './components/ZyniqTextLogo';

interface Brand {
  name: string;
  useCase: string;
}

const BRANDS: Brand[] = [
  { name: 'Swile', useCase: 'Automating multi-jurisdiction benefit alignment rules.' },
  { name: 'Hinge Health', useCase: 'Synthesizing patient care compliance timelines.' },
  { name: 'Polestar', useCase: 'Parsing battery telemetry schemas dynamically.' },
  { name: 'Merck', useCase: 'Orchestrating clinical trial documentation extraction.' },
  { name: 'Semrush', useCase: 'Benchmarking competitor pricing and features.' },
  { name: 'NBCUniversal', useCase: 'Triggering ad-hoc licensing schema realignment.' },
  { name: 'Klarna', useCase: 'Verifying instant ledger payment policy trees.' },
  { name: 'Framer', useCase: 'Drafting design assets code translation routines.' },
];

export default function App() {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setEmailSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setEmailSubscribed(false);
      }, 3000);
    }
  };

  const handleSmoothScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-bg text-white selection:bg-brand-accent selection:text-black font-sans antialiased">
      
      {/* Dynamic interactive background canvas */}
      <div className="absolute inset-0 h-[800px] overflow-hidden pointer-events-none z-0">
        <ParticleGrid />
        {/* Dark radial fade beneath the grid */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-bg to-transparent pointer-events-none" />
      </div>

      {/* HEADER / NAVIGATION BAR */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative">
              <LogoIcon className="w-8 h-8" />
              <div className="absolute -inset-1 border border-brand-accent/25 rounded-none animate-ping" style={{ animationDuration: '3s' }} />
            </div>
            <div>
              <ZyniqTextLogo className="h-5 w-auto mb-1" />
              <span className="text-[10px] font-mono text-brand-accent block leading-none font-bold uppercase tracking-widest">// SOLUTIONS</span>
            </div>
          </div>

          {/* Links */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-bold uppercase tracking-wider text-white/60">
            <button onClick={() => handleSmoothScroll('pillars-section')} className="hover:text-brand-accent transition-colors cursor-pointer">
              Our Sectors
            </button>
            <button onClick={() => handleSmoothScroll('services-section')} className="hover:text-brand-accent transition-colors cursor-pointer">
              Services
            </button>
            <button onClick={() => handleSmoothScroll('usecases-section')} className="hover:text-brand-accent transition-colors cursor-pointer">
              Use Cases
            </button>
            <button onClick={() => handleSmoothScroll('agent-sandbox')} className="hover:text-brand-accent transition-colors cursor-pointer flex items-center gap-1.5">
              <span>Sandbox</span>
              <span className="w-1.5 h-1.5 bg-brand-accent rounded-none animate-ping" />
            </button>
          </nav>

          {/* CTAs */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleSmoothScroll('agent-sandbox')}
              className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-mono text-white/50 hover:text-white transition-colors uppercase font-bold cursor-pointer"
            >
              <span>FACTORY_STATUS</span>
              <span className="text-brand-accent font-black">● ONLINE</span>
            </button>
            <button
              onClick={() => handleSmoothScroll('agent-sandbox')}
              className="inline-flex items-center space-x-2 bg-[#141414] border border-white/10 text-white text-xs font-mono font-bold uppercase py-2.5 px-4 rounded-none hover:border-brand-accent hover:bg-white hover:text-black transition-all cursor-pointer"
            >
              <span>ACCESS TERMINAL</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-20 pb-24 lg:pt-32 lg:pb-36 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <div className="inline-flex items-center space-x-2 bg-brand-accent/10 border border-brand-accent/25 text-brand-accent px-4 py-2 rounded-none text-xs font-mono tracking-wider font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>// AI-DRIVEN SOFTWARE FACTORY & INNOVATION LAB</span>
          </div>

          <h1 className="max-w-4xl mx-auto text-4xl sm:text-5xl lg:text-7xl font-display font-black tracking-tighter text-white leading-tight uppercase italic">
            THE FUTURE IS <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-brand-accent pr-2 pb-1">
              CODED BY US
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-brand-text-muted leading-relaxed font-sans font-medium">
            We don’t just adapt to the future, we engineer it. Where ideas ship fast and hold up in the real world. Architecting synthetic brains to power universal discovery.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="hero-primary-cta"
              onClick={() => handleSmoothScroll('agent-sandbox')}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-brand-accent text-white font-black uppercase tracking-wider text-xs py-3.5 px-8 rounded-none hover:bg-white hover:text-black transition-all cursor-pointer"
            >
              <span>COMMAND THE CODE</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              id="hero-secondary-cta"
              onClick={() => handleSmoothScroll('pillars-section')}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#141414] border border-white/10 text-white hover:text-brand-accent hover:border-brand-accent/50 transition-all font-black uppercase tracking-wider text-xs py-3.5 px-8 rounded-none cursor-pointer"
            >
              <span>EXPLORE LAB</span>
              <Settings className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
            </button>
          </div>
        </div>
      </section>

      {/* TRUSTED BY / MARQUEE SECTION */}
      <section className="relative z-10 border-t border-b border-white/10 bg-black py-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[10px] font-mono tracking-widest text-white/40 uppercase font-bold">
            // TRUSTED BY 8,000+ USERS FROM FORWARD-THINKING ENTERPRISES
          </p>

          {/* Interactive Marquee Container */}
          <div className="mt-6 relative">
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {BRANDS.map((brand) => (
                <button
                  id={`brand-tag-${brand.name.toLowerCase()}`}
                  key={brand.name}
                  onClick={() => setSelectedBrand(brand)}
                  className="group font-display text-base font-black uppercase italic text-white/50 hover:text-brand-accent transition-all relative py-1 cursor-pointer"
                >
                  <span className="tracking-tight">{brand.name}</span>
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </button>
              ))}
            </div>

            {/* Micro Interaction Drawer */}
            <AnimatePresence>
              {selectedBrand && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 bg-[#141414] border border-white/10 rounded-none p-4 max-w-xl mx-auto text-center relative"
                >
                  <span className="text-[10px] font-mono text-brand-accent font-bold uppercase block tracking-wider">
                    // {selectedBrand.name} Operational Routine
                  </span>
                  <p className="text-xs text-zinc-300 mt-1 font-mono">
                    "{selectedBrand.useCase}"
                  </p>
                  <button
                    onClick={() => setSelectedBrand(null)}
                    className="absolute top-2 right-2 text-[10px] font-mono text-white/40 hover:text-white font-bold cursor-pointer"
                  >
                    CLOSE [X]
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* STATISTICS SECTION */}
      <section className="relative z-10 py-24 lg:py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Header */}
            <div className="lg:col-span-5 xl:col-span-5 space-y-4 pr-0 xl:pr-4">
              <span className="text-xs font-mono text-brand-accent block uppercase tracking-widest font-bold">// THE ASSEMBLY LINE</span>
              <h2 className="text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-display font-black uppercase tracking-tight text-white leading-tight italic">
                Architecting Synthetic Brains
              </h2>
              <p className="text-brand-text-muted text-sm leading-relaxed font-sans font-medium max-w-lg">
                ZYNIQ provides the "Crews" and "Specialist Agents" to handle the building, leaving the "Commanders" to navigate the unknown. We are building a Quantic Calculator for the soul of humanity.
              </p>
              <div className="pt-2">
                <button
                  id="stats-section-cta"
                  onClick={() => handleSmoothScroll('agent-sandbox')}
                  className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold uppercase tracking-wider text-brand-accent hover:text-white transition-all group cursor-pointer"
                >
                  <span>Explore The Factory</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Right Statistics Grid */}
            <div className="lg:col-span-7 xl:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="bg-[#141414] border border-white/10 rounded-none p-6 hover:border-brand-accent transition-all group flex flex-col justify-center">
                <div className="text-5xl lg:text-6xl font-display font-black text-brand-accent tracking-tighter group-hover:text-white transition-colors italic">
                  97%
                </div>
                <h4 className="text-[10px] font-mono text-white/40 mt-3 font-bold uppercase tracking-wider block">
                  // Task success rate
                </h4>
                <p className="text-brand-text-muted text-[11px] mt-1 leading-normal font-sans">
                  Validated on complex multi-step tool and API call cascades.
                </p>
              </div>

              <div className="bg-[#141414] border border-white/10 rounded-none p-6 hover:border-brand-accent transition-all group flex flex-col justify-center">
                <div className="text-5xl lg:text-6xl font-display font-black text-brand-accent tracking-tighter group-hover:text-white transition-colors italic">
                  88%
                </div>
                <h4 className="text-[10px] font-mono text-white/40 mt-3 font-bold uppercase tracking-wider block">
                  // Logical Accuracy
                </h4>
                <p className="text-brand-text-muted text-[11px] mt-1 leading-normal font-sans">
                  Consistent compliance alignment over unstructured inputs.
                </p>
              </div>

              <div className="bg-[#141414] border border-white/10 rounded-none p-6 hover:border-brand-accent transition-all group flex flex-col justify-center">
                <div className="text-5xl lg:text-6xl font-display font-black text-brand-accent tracking-tighter group-hover:text-white transition-colors italic">
                  3X
                </div>
                <h4 className="text-[10px] font-mono text-white/40 mt-3 font-bold uppercase tracking-wider block">
                  // Schema adaptation
                </h4>
                <p className="text-brand-text-muted text-[11px] mt-1 leading-normal font-sans">
                  Faster autonomous alignment to API signature changes.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* DEPARTMENTS SECTION */}
      <section id="pillars-section" className="relative z-10 py-20 bg-[#141414]/30 border-t border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs font-mono text-brand-accent block uppercase tracking-widest font-bold">// OUR CORE SECTORS</span>
            <h2 className="text-3xl font-display font-black uppercase text-white tracking-tight leading-none italic">
              The Software Factory of the Next Era
            </h2>
            <p className="text-brand-text-muted text-sm leading-relaxed font-sans">
              Combining synthetic intelligence, niche problem-solving, and uncompromising quality to deliver powerful, intelligent solutions.
            </p>
          </div>

          <PillarsSection />
        </div>
      </section>

      {/* MANIFESTO / STATEMENT SECTION */}
      <section className="relative z-10 py-24 lg:py-32 overflow-hidden bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-8">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black uppercase italic text-white leading-tight tracking-tight">
                "At ZYNIQ, we believe the human mind was meant to explore, not just execute."
              </h3>
            </div>

            <div className="lg:col-span-4 space-y-6 border-l border-white/10 pl-6 lg:pl-8">
              <p className="text-brand-text-muted text-sm leading-relaxed font-sans">
                Our Software Factory provides the 'Crews' and 'Specialist Agents' to handle the building, leaving the 'Commanders' to navigate the unknown.
              </p>
              <p className="text-zinc-500 text-xs font-mono leading-relaxed uppercase font-bold">
                // We are building a Quantic Calculator for the soul of humanity.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <ServicesSection />

      {/* USE CASES SECTION */}
      <section id="usecases-section" className="relative z-10 py-20 bg-[#141414]/30 border-t border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-xl space-y-3">
            <span className="text-xs font-mono text-brand-accent block uppercase tracking-widest font-bold">// INDUSTRY USE CASE</span>
            <h2 className="text-3xl font-display font-black uppercase text-white tracking-tight leading-none italic">
              Boosting Capabilities Beyond Limits
            </h2>
            <p className="text-brand-text-muted text-sm leading-relaxed font-sans">
              Explore how production teams leverage autonomous agents with strict rule structures to automate intensive manual workflows.
            </p>
          </div>

          <UseCasesSection />
        </div>
      </section>

      {/* SANDBOX INTEGRATION SECTION */}
      <section className="relative z-10 py-24 lg:py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <span className="text-xs font-mono text-brand-accent block uppercase tracking-widest font-bold">// ACTIVE EXECUTION MONITOR</span>
            <h2 className="text-3xl font-display font-black uppercase text-white tracking-tight italic">
              Test the Mind of Our AI Agent
            </h2>
            <p className="text-brand-text-muted text-sm max-w-xl mx-auto font-sans">
              Simulate full decision cycles. Watch how our sandbox parses your targets, triggers sandboxed tools, and applies security constraints.
            </p>
          </div>

          <AgentSandbox />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 bg-black py-16 text-xs text-brand-text-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            
            {/* Branding Column */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center space-x-3">
                <LogoIcon className="w-7 h-7" />
                <ZyniqTextLogo className="h-4 w-auto" />
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed max-w-xs font-sans">
                AI-Driven Software Factory & Innovation Lab. We don't just adapt to the future, we engineer it.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a href="https://x.com/zyniq_solutions" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-none bg-[#141414] border border-white/10 hover:bg-brand-accent hover:text-black transition-all">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="https://www.linkedin.com/company/zyniq-solutions" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-none bg-[#141414] border border-white/10 hover:bg-brand-accent hover:text-black transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="https://github.com/ZYNIQ-AI-Driven-Development-Firm" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-none bg-[#141414] border border-white/10 hover:bg-brand-accent hover:text-black transition-all">
                  <Github className="w-4 h-4" />
                </a>
                <a href="https://www.instagram.com/zyniq_solutions/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-none bg-[#141414] border border-white/10 hover:bg-brand-accent hover:text-black transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://www.youtube.com/@zyniq.solutions" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-none bg-[#141414] border border-white/10 hover:bg-brand-accent hover:text-black transition-all">
                  <Youtube className="w-4 h-4" />
                </a>
                <a href="https://www.twitch.tv/zyniqsolutions" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-none bg-[#141414] border border-white/10 hover:bg-brand-accent hover:text-black transition-all">
                  <Twitch className="w-4 h-4" />
                </a>
                <a href="https://www.tiktok.com/@zyniq.solutions" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-none bg-[#141414] border border-white/10 hover:bg-brand-accent hover:text-black transition-all flex items-center justify-center gap-1.5" title="TikTok">
                  <Video className="w-4 h-4" />
                  <span className="text-[10px] uppercase font-bold tracking-widest hidden sm:inline">TikTok</span>
                </a>
                <a href="https://patreon.com/ZYNIQSolutions" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-none bg-[#141414] border border-white/10 hover:bg-brand-accent hover:text-black transition-all flex items-center justify-center gap-1.5" title="Patreon">
                  <Heart className="w-4 h-4" />
                  <span className="text-[10px] uppercase font-bold tracking-widest hidden sm:inline">Patreon</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-white block mb-4 font-bold">// SYSTEM QUICKLINKS</span>
              <ul className="space-y-2.5 font-mono text-white/60">
                <li><a href="#pillars-section" className="hover:text-brand-accent transition-colors font-bold uppercase">Our Sectors</a></li>
                <li><a href="#services-section" className="hover:text-brand-accent transition-colors font-bold uppercase">Services</a></li>
                <li><a href="#usecases-section" className="hover:text-brand-accent transition-colors font-bold uppercase">Use Cases</a></li>
                <li><a href="#agent-sandbox" className="hover:text-brand-accent transition-colors font-bold uppercase flex items-center gap-1.5 text-white"><span>Sandbox Simulator</span><span className="w-1 h-1 bg-brand-accent rounded-none animate-ping" /></a></li>
                <li><a href="#docs" className="hover:text-brand-accent transition-colors font-bold uppercase">API Docs [V3]</a></li>
              </ul>
            </div>

            {/* Contact Directory */}
            <div className="lg:col-span-3 min-w-0">
              <span className="text-[10px] font-mono uppercase tracking-widest text-white block mb-4 font-bold">// CONTACT DIRECTORY</span>
              <ul className="space-y-3 font-mono text-white/60 text-[11px] sm:text-xs">
                <li className="flex items-center gap-2 min-w-0"><Mail className="w-3.5 h-3.5 text-brand-accent shrink-0" /> <span className="truncate">contact@zyniq.solutions</span></li>
                <li className="flex items-center gap-2 min-w-0"><Mail className="w-3.5 h-3.5 text-brand-accent shrink-0" /> <span className="truncate">marketing@zyniq.solutions</span></li>
                <li className="flex items-center gap-2 min-w-0"><Mail className="w-3.5 h-3.5 text-brand-accent shrink-0" /> <span className="truncate">finance@zyniq.solutions</span></li>
                <li className="text-zinc-600 block pt-1 font-bold uppercase text-[10px]">// HQ: Dubai, UAE</li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-white block mb-2 font-bold">// SUBSCRIBE TO loop_stream</span>
              <p className="text-zinc-500 text-xs leading-relaxed font-sans">
                Get premium technical breakdowns on synthetic intelligence, scalable software factories, and Quantic operations delivered monthly.
              </p>
              
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  id="newsletter-email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="enter_developer_email@domain.com"
                  className="bg-[#141414] border border-white/10 rounded-none px-3 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-brand-accent flex-1 min-w-0 placeholder:text-zinc-700"
                />
                <button
                  id="newsletter-submit-button"
                  type="submit"
                  className="bg-brand-accent hover:bg-white text-black font-black uppercase tracking-wider text-[10px] py-2 px-4 rounded-none flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                  <span>Subscribe</span>
                </button>
              </form>

              <AnimatePresence>
                {emailSubscribed && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-xs font-mono text-brand-accent font-bold uppercase"
                  >
                    ✓ Subscription activated. Welcome to the loop.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Legal / Copyright Bottom */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-zinc-600 font-mono text-[10px] uppercase font-bold">
            <span>© {new Date().getFullYear()} ZYNIQ Solutions. All rights reserved.</span>
            <div className="flex space-x-6">
              <a href="#terms" className="hover:text-brand-accent transition-colors">// TERMS OF SERVICE</a>
              <a href="#privacy" className="hover:text-brand-accent transition-colors">// PRIVACY POLICY</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
