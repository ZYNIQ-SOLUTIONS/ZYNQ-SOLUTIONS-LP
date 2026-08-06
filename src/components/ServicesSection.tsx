import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  Brain, 
  Compass, 
  Bot, 
  Server, 
  BarChart, 
  Network, 
  GitMerge, 
  Rocket, 
  Users,
  ChevronRight,
  Crosshair
} from 'lucide-react';

interface Service {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  icon: React.ElementType;
}

const SERVICES: Service[] = [
  {
    id: 'digital-architecture',
    number: '01',
    title: 'DIGITAL ARCHITECTURE',
    subtitle: 'Software Development',
    description: 'We do not just write code; we build the skeleton of the future. From the first line of code to the final enterprise deployment, we engineer digital reality.',
    deliverables: [
      'Desktop, Web & Mobile Apps',
      'High-Fidelity UI/UX Design',
      '3D Modeling & Visualization',
      'MVP & Prototype Rapid Labs',
      'Enterprise Scaling Architecture'
    ],
    icon: Code2
  },
  {
    id: 'artificial-intelligence',
    number: '02',
    title: 'ARTIFICIAL INTELLIGENCE',
    subtitle: 'Custom AI Solutions',
    description: 'Your business is unique; your intelligence should be too. We craft proprietary AI models from scratch to solve your most complex "impossible" problems.',
    deliverables: [
      'Predictive Analytics Engines',
      'Personalized Recommendation Systems',
      'Computer Vision & NLP Models',
      'Proprietary LLM Training'
    ],
    icon: Brain
  },
  {
    id: 'strategic-foresight',
    number: '03',
    title: 'STRATEGIC FORESIGHT',
    subtitle: 'AI Strategy & Consulting',
    description: 'Turn ambition into a roadmap. We assess your readiness and identify high-impact opportunities to inject intelligence into your workflow.',
    deliverables: [
      'AI Readiness Assessment',
      'Ethical AI Frameworks',
      'ROI-Driven Implementation Roadmaps',
      'Global Growth Strategy'
    ],
    icon: Compass
  },
  {
    id: 'autonomous-systems',
    number: '04',
    title: 'AUTONOMOUS SYSTEMS',
    subtitle: 'Intelligent Automation (RPA)',
    description: 'Replace repetition with precision. We deploy invisible bots that handle the mundane, freeing your human workforce for strategic dominance.',
    deliverables: [
      'Workflow Automation Pipelines',
      'Data Entry & Processing Bots',
      'Smart Customer Support Systems',
      'Error-Reduction Protocols'
    ],
    icon: Bot
  },
  {
    id: 'the-core-engine',
    number: '05',
    title: 'THE CORE ENGINE',
    subtitle: 'High-Performance Back-ends',
    description: 'The unseen engine of your digital existence. We design modular microservices and deploy lightning-fast, secure APIs built for infinite scale.',
    deliverables: [
      'Microservices Architecture',
      'Secure API Development',
      'Cloud Infrastructure (AWS/Azure/GCP)',
      'Database Optimization'
    ],
    icon: Server
  },
  {
    id: 'data-alchemy',
    number: '06',
    title: 'DATA ALCHEMY',
    subtitle: 'Advanced Analytics & BI',
    description: 'Turn raw noise into strategic signal. We uncover hidden patterns and build interactive dashboards for smarter, faster command decisions.',
    deliverables: [
      'Interactive BI Dashboards',
      'Real-time Data Visualization',
      'Pattern Recognition',
      'Market Prediction Models'
    ],
    icon: BarChart
  },
  {
    id: 'decentralized-trust',
    number: '07',
    title: 'DECENTRALIZED TRUST',
    subtitle: 'Web3 & Blockchain',
    description: 'Step into the next internet. From dApps to NFT marketplaces, we bring Web3 to life with security, transparency, and geometric precision.',
    deliverables: [
      'Smart Contract Auditing & Dev',
      'dApp Creation',
      'NFT Ecosystems',
      'Blockchain Security Layers'
    ],
    icon: Network
  },
  {
    id: 'system-mutation',
    number: '08',
    title: 'SYSTEM MUTATION',
    subtitle: 'AI Integration Services',
    description: 'Seamless deployment, maximum ROI. We embed AI into your existing platforms, ensuring a scalable, future-proof evolution without breaking your current core.',
    deliverables: [
      'Legacy System Upgrades',
      'API Connectors',
      'Cloud AI Migration',
      'Security Compliance'
    ],
    icon: GitMerge
  },
  {
    id: 'hyper-scaling',
    number: '09',
    title: 'HYPER-SCALING',
    subtitle: 'New Idea Integrations',
    description: 'The "Growth Hack" Protocol. We study your company data, target clients, and workflows to inject a custom system that automates revenue generation.',
    deliverables: [
      'Business Logic Analysis',
      'Automated Scaling Systems',
      'Revenue Optimization Tools',
      'Time-Winning Workflows'
    ],
    icon: Rocket
  },
  {
    id: 'workforce-rental',
    number: '10',
    title: 'WORKFORCE RENTAL',
    subtitle: 'ZYNIQ SYNTH (AI Staffing)',
    description: 'Why hire humans when you can rent perfection? We provide individual AI Agents or full "Crews" integrated as employees into your company structure.',
    deliverables: [
      'Single Unit: Expert AI Specialist',
      'Crew-7: Full Swarm Team',
      'Short & Long Term Rental',
      '24/7 Productivity'
    ],
    icon: Users
  }
];

export function ServicesSection() {
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES[0].id);
  const activeService = SERVICES.find(s => s.id === activeServiceId) || SERVICES[0];

  const handleServiceClick = (id: string) => {
    setActiveServiceId(id);
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        const el = document.getElementById('service-details-panel');
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <section id="services-section" className="relative z-10 py-16 sm:py-24 lg:py-32 bg-black border-t border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-brand-accent/10 border border-brand-accent/25 text-brand-accent px-4 py-2 rounded-none text-xs font-mono tracking-widest font-bold uppercase">
            <Crosshair className="w-3.5 h-3.5" />
            <span>// A MENU OF POWER</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-tighter leading-none">
            OPERATIONAL DIRECTIVES
          </h2>
          <p className="text-brand-text-muted text-sm leading-relaxed font-sans font-medium">
            Deploying military-grade software pipelines and synthetic intelligence to dominate the digital landscape.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Service List (Left) */}
          <div className="lg:col-span-5 flex flex-col space-y-2">
            {SERVICES.map((service) => (
              <button
                key={service.id}
                onClick={() => handleServiceClick(service.id)}
                className={`flex items-center justify-between w-full text-left p-4 border transition-all rounded-none cursor-pointer group ${
                  activeServiceId === service.id 
                    ? 'bg-brand-accent text-white border-brand-accent' 
                    : 'bg-surface text-zinc-500 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <span className={`font-mono text-xs font-bold ${activeServiceId === service.id ? 'text-black' : 'text-zinc-600 group-hover:text-zinc-400'}`}>
                    [{service.number}]
                  </span>
                  <span className={`font-display font-black uppercase tracking-wide text-sm sm:text-base ${activeServiceId === service.id ? 'text-white' : ''}`}>
                    {service.title}
                  </span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${activeServiceId === service.id ? 'text-white translate-x-1' : 'text-zinc-600 group-hover:text-white group-hover:translate-x-1'}`} />
              </button>
            ))}
          </div>

          {/* Service Details (Right) */}
          <div className="lg:col-span-7" id="service-details-panel">
            <div className="sticky top-24">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="bg-surface border border-white/10 rounded-none p-8 sm:p-10 flex flex-col h-full relative overflow-hidden"
                >
                  {/* Background Accent */}
                  <div className="absolute -right-20 -top-20 opacity-5 pointer-events-none">
                    <activeService.icon className="w-96 h-96 text-brand-accent" />
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="p-3 bg-brand-accent/10 border border-brand-accent/20">
                        <activeService.icon className="w-6 h-6 text-brand-accent" />
                      </div>
                      <div>
                        <span className="text-xs font-mono text-brand-accent font-bold uppercase tracking-widest block mb-1">
                          // DIRECTIVE {activeService.number}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight leading-none">
                          {activeService.subtitle}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-zinc-400 text-sm leading-relaxed font-sans mb-8">
                      {activeService.description}
                    </p>

                    <div className="mt-auto">
                      <h4 className="text-[10px] font-mono text-white/50 uppercase tracking-widest font-bold mb-4 flex items-center">
                        <span className="w-2 h-px bg-brand-accent mr-2" />
                        OPERATIONAL OUTPUT
                      </h4>
                      <ul className="space-y-3">
                        {activeService.deliverables.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-3 text-sm text-white font-sans font-medium">
                            <span className="text-brand-accent font-mono text-xs mt-0.5">»</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-10 pt-6 border-t border-white/10">
                      <button className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-transparent border border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-black transition-all font-black uppercase tracking-wider text-xs py-3 px-6 rounded-none cursor-pointer">
                        <span>INITIATE PROTOCOL</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
