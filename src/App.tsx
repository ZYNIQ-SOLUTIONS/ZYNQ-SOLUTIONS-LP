import { useEffect } from 'react';
import { ProductionLine } from './components/blueprint/ProductionLine';
import { STATIONS } from './content/site';
import { Consultation } from './sections/Consultation';
import { Hero } from './sections/Hero';
import { Manifesto } from './sections/Manifesto';
import { Nav } from './sections/Nav';
import { Output } from './sections/Output';
import { PartsStrip } from './sections/PartsStrip';
import { Sectors } from './sections/Sectors';
import { Services } from './sections/Services';
import { TitleBlock } from './sections/TitleBlock';
import { UseCases } from './sections/UseCases';

export default function App() {
  // The page renders after the browser has already tried to follow the URL hash,
  // so jump to the target once the sections exist, and again once the web fonts
  // have loaded, because the font swap changes the height of everything above it.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const jump = () => document.getElementById(id)?.scrollIntoView({ behavior: 'instant' });
    jump();
    document.fonts?.ready.then(jump);
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink font-sans antialiased bp-grid">
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-ink focus:text-paper focus:px-4 focus:py-2 font-mono text-xs uppercase tracking-widest"
      >
        Skip to content
      </a>
      <Nav />
      <ProductionLine stations={STATIONS} />
      <main id="top">
        <Hero />
        <PartsStrip />
        <Output />
        <Sectors />
        <Manifesto />
        <Services />
        <UseCases />
        <Consultation />
      </main>
      <TitleBlock />
    </div>
  );
}
