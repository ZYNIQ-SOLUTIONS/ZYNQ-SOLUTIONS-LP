import { useCallback, useEffect, useState } from 'react';
import { LogoIcon } from '../LogoIcon';
import { ZyniqTextLogo } from '../ZyniqTextLogo';
import { Stamp } from './Stamp';

const SEEN_KEY = 'zyniq_intro_seen';
const HOLD_MS = 1300;
const LIFT_MS = 600;

function shouldPlay() {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return sessionStorage.getItem(SEEN_KEY) !== '1';
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    // Private mode or blocked storage: it just plays again next time.
  }
}

// Opening sheet: the frame and title block draw in, the lead's stamp lands,
// and the sheet lifts off the page. Plays once per browser session.
export function Intro() {
  const [visible, setVisible] = useState(shouldPlay);
  const [leaving, setLeaving] = useState(false);

  const lift = useCallback(() => setLeaving(true), []);

  useEffect(() => {
    if (!visible) return;
    markSeen();
    const hold = window.setTimeout(lift, HOLD_MS);
    window.addEventListener('keydown', lift);
    window.addEventListener('wheel', lift, { passive: true });
    window.addEventListener('touchmove', lift, { passive: true });
    return () => {
      window.clearTimeout(hold);
      window.removeEventListener('keydown', lift);
      window.removeEventListener('wheel', lift);
      window.removeEventListener('touchmove', lift);
    };
  }, [visible, lift]);

  useEffect(() => {
    if (!leaving) return;
    const done = window.setTimeout(() => setVisible(false), LIFT_MS);
    return () => window.clearTimeout(done);
  }, [leaving]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      data-leaving={leaving}
      onClick={lift}
      className="bp-intro fixed inset-0 z-[80] bg-paper bp-grid flex items-center justify-center p-5 cursor-pointer"
    >
      <div className="relative w-full max-w-xl aspect-[3/2]">
        <svg viewBox="0 0 600 400" className="absolute inset-0 w-full h-full" fill="none" stroke="var(--ink)">
          <rect className="bp-intro-draw" pathLength={1} x="1" y="1" width="598" height="398" strokeWidth="2" />
          <rect
            className="bp-intro-draw"
            pathLength={1}
            x="14"
            y="14"
            width="572"
            height="372"
            strokeWidth="1"
            style={{ animationDelay: '0.1s' }}
          />
          <path
            className="bp-intro-draw"
            pathLength={1}
            d="M346 386V300H586M346 330H586M466 300V386"
            strokeWidth="1"
            style={{ animationDelay: '0.3s' }}
          />
          <path
            className="bp-intro-draw"
            pathLength={1}
            d="M40 60H220M40 54v12M220 54v12"
            stroke="var(--cyan)"
            strokeWidth="1"
            style={{ animationDelay: '0.35s' }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col">
          <p
            className="bp-intro-fade absolute left-[6.6%] top-[8%] font-mono text-[10px] sm:text-xs text-cyan"
            style={{ animationDelay: '0.45s' }}
          >
            SHEET 00 / GENERAL ARRANGEMENT
          </p>

          <div
            className="bp-intro-fade m-auto flex items-center gap-3 -translate-y-4"
            style={{ animationDelay: '0.35s' }}
          >
            <LogoIcon className="w-10 h-10 sm:w-12 sm:h-12" />
            <ZyniqTextLogo className="h-5 sm:h-6 w-auto" />
            <span className="font-display font-black text-2xl sm:text-3xl leading-none tracking-wide text-red translate-y-px">
              STUDIO
            </span>
          </div>

          <dl
            className="bp-intro-fade absolute right-[2.4%] bottom-[3.6%] w-[40%] h-[21.5%] grid grid-cols-2 grid-rows-2 font-mono text-[8px] sm:text-[10px] leading-tight"
            style={{ animationDelay: '0.55s' }}
          >
            <div className="px-2 py-1">
              <dt className="text-muted">Drawn</dt>
              <dd>Agent crew</dd>
            </div>
            <div className="px-2 py-1">
              <dt className="text-muted">Rev</dt>
              <dd>C</dd>
            </div>
            <div className="px-2 py-1">
              <dt className="text-muted">Site</dt>
              <dd>Dubai</dd>
            </div>
            <div className="px-2 py-1">
              <dt className="text-muted">Checked</dt>
              <dd>Lead</dd>
            </div>
          </dl>

          <div className="absolute left-[8%] bottom-[10%]">
            <IntroStamp />
          </div>
        </div>
      </div>
    </div>
  );
}

// The stamp waits for the frame to finish drawing before it lands.
function IntroStamp() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 750);
    return () => window.clearTimeout(t);
  }, []);
  return ready ? <Stamp label="Approved" mark="00" foot="Ready to build" rotate={-7} /> : null;
}
