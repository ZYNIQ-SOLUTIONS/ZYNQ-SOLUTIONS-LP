import { useEffect } from 'react';
import { ProductionLine } from './components/blueprint/ProductionLine';
import { Station } from './components/blueprint/Station';
import { STATIONS } from './content/site';
import { Hero } from './sections/Hero';
import { Manifesto } from './sections/Manifesto';
import { Nav } from './sections/Nav';
import { Output } from './sections/Output';
import { PartsStrip } from './sections/PartsStrip';
import { Sectors } from './sections/Sectors';
import { TitleBlock } from './sections/TitleBlock';

export default function App() {
  // The page renders after the browser has already tried to follow the URL hash,
  // so jump to the target once the sections exist.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'auto' });
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink font-sans antialiased bp-grid">
      <Nav />
      <ProductionLine stations={STATIONS} />
      <main id="top">
        <Hero />
        <PartsStrip />
        <Output />
        <Sectors />
        <Manifesto />
        {STATIONS.slice(2).map((s) => (
          <div key={s.id}>
            <Station id={s.id} number={s.number} label={s.label} title={s.label}>
              <div className="h-64" />
            </Station>
          </div>
        ))}
      </main>
      <TitleBlock />
    </div>
  );
}
