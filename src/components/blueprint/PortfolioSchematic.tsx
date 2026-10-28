import type { PortfolioItem } from '../../types';

export function PortfolioSchematic({
  type,
  code,
  className = 'w-full h-auto',
}: {
  type: PortfolioItem['schematic'];
  code?: string;
  className?: string;
}) {
  const stroke = { fill: 'none', stroke: 'var(--ink)', strokeWidth: 1.5 };
  const mutedStroke = { fill: 'none', stroke: 'var(--ink-muted)', strokeWidth: 1 };
  const raised = { fill: 'var(--paper-raised)', stroke: 'var(--ink)', strokeWidth: 1.5 };
  const red = { fill: 'var(--red)', stroke: 'none' };

  return (
    <svg viewBox="0 0 360 200" className={className} aria-hidden="true">
      {/* Subtle blueprint frame ticks */}
      <g {...mutedStroke} opacity="0.45">
        <path d="M12 20V12h8M348 20V12h-8M12 180v8h8M348 180v8h-8" />
        <line x1="20" y1="100" x2="340" y2="100" strokeDasharray="2 6" />
        <line x1="180" y1="20" x2="180" y2="180" strokeDasharray="2 6" />
      </g>

      {code && (
        <text x="20" y="28" className="font-mono" fontSize="9" letterSpacing="2" fill="var(--ink-muted)">
          FIG // {code}
        </text>
      )}

      {type === 'gateway' && (
        <g {...stroke}>
          {/* Left client nodes */}
          {[48, 100, 152].map((y, idx) => (
            <g key={y}>
              <line x1="74" y1={y} x2="142" y2="100" strokeDasharray={idx === 1 ? undefined : '3 3'} />
              <rect x="30" y={y - 14} width="44" height="28" {...raised} />
              <rect x="38" y={y - 3} width="6" height="6" {...red} />
              <line x1="50" y1={y} x2="66" y2={y} />
            </g>
          ))}
          {/* Central Brain Gateway */}
          <circle cx="180" cy="100" r="38" {...raised} />
          <circle cx="180" cy="100" r="26" strokeDasharray="4 3" />
          <rect x="170" y="90" width="20" height="20" {...red} />
          {/* Right model targets */}
          {[52, 100, 148].map((y, idx) => (
            <g key={y}>
              <line x1="218" y1="100" x2="278" y2={y} stroke={idx === 0 ? 'var(--red)' : 'var(--ink)'} />
              <rect x="278" y={y - 14} width="52" height="28" {...raised} />
              <line x1="288" y1={y - 4} x2="320" y2={y - 4} />
              <line x1="288" y1={y + 4} x2="308" y2={y + 4} />
            </g>
          ))}
        </g>
      )}

      {type === 'identity' && (
        <g {...stroke}>
          {/* NFC Card + Pass */}
          <rect x="46" y="42" width="150" height="116" {...raised} />
          <rect x="62" y="58" width="28" height="28" {...red} />
          <line x1="102" y1="64" x2="176" y2="64" />
          <line x1="102" y1="78" x2="154" y2="78" />
          <line x1="62" y1="108" x2="176" y2="108" />
          <line x1="62" y1="124" x2="140" y2="124" />
          {/* NFC wave arcs */}
          <path d="M218 84a24 24 0 0 1 0 32" stroke="var(--red)" strokeWidth="2" />
          <path d="M230 74a38 38 0 0 1 0 52" stroke="var(--red)" strokeWidth="1.5" />
          <path d="M242 64a52 52 0 0 1 0 72" strokeDasharray="3 3" />
          {/* Mobile wallet pass frame */}
          <rect x="264" y="34" width="60" height="132" {...raised} />
          <line x1="264" y1="54" x2="324" y2="54" />
          <rect x="278" y="68" width="32" height="32" />
          <rect x="288" y="78" width="12" height="12" {...red} />
          <line x1="276" y1="118" x2="312" y2="118" />
          <line x1="276" y1="130" x2="304" y2="130" />
        </g>
      )}

      {type === 'workflow' && (
        <g {...stroke}>
          {/* DAG Edges */}
          <path d="M98 100H142V60H174" />
          <path d="M120 100V140H174" />
          <path d="M234 60H262V100H282" stroke="var(--red)" strokeWidth="2" />
          <path d="M234 140H262V100" strokeDasharray="3 3" />
          {/* Trigger node */}
          <rect x="38" y="80" width="60" height="40" {...raised} />
          <rect x="48" y="94" width="12" height="12" {...red} />
          <line x1="66" y1="100" x2="88" y2="100" />
          {/* Branch nodes */}
          <rect x="174" y="40" width="60" height="40" {...raised} />
          <line x1="186" y1="56" x2="222" y2="56" />
          <line x1="186" y1="66" x2="210" y2="66" />
          <rect x="174" y="120" width="60" height="40" {...raised} />
          <line x1="186" y1="136" x2="222" y2="136" />
          <line x1="186" y1="146" x2="210" y2="146" />
          {/* Output node */}
          <rect x="282" y="78" width="48" height="44" fill="var(--red)" stroke="var(--ink)" strokeWidth="1.5" />
          <path d="M298 100l6 6 12-12" stroke="#fff" strokeWidth="2" />
        </g>
      )}

      {type === 'swarm' && (
        <g {...stroke}>
          {/* Grid horizon lines */}
          {[56, 84, 112, 140].map((y) => (
            <line key={y} x1="40" y1={y} x2="320" y2={y} stroke="var(--ink-muted)" strokeDasharray="2 4" strokeWidth="1" />
          ))}
          {/* Telemetry waveform */}
          <polyline
            points="40,136 82,122 118,130 154,88 188,108 224,54 258,76 296,42 320,48"
            stroke="var(--red)"
            strokeWidth="2.5"
            fill="none"
          />
          {/* Execution nodes */}
          {[
            [154, 88],
            [224, 54],
            [296, 42],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <rect x={x - 6} y={y - 6} width="12" height="12" {...raised} />
              <rect x={x - 2} y={y - 2} width="4" height="4" {...red} />
            </g>
          ))}
          {/* Bottom metrics bar */}
          <rect x="40" y="152" width="280" height="20" {...raised} />
          <rect x="46" y="158" width="68" height="8" {...red} />
          <line x1="128" y1="162" x2="210" y2="162" />
          <line x1="226" y1="162" x2="310" y2="162" />
        </g>
      )}

      {type === 'coaching' && (
        <g {...stroke}>
          {/* Biometric rings */}
          <circle cx="114" cy="102" r="54" {...raised} />
          <circle cx="114" cy="102" r="38" strokeDasharray="6 4" />
          <path d="M114 48 A54 54 0 1 1 62 118" stroke="var(--red)" strokeWidth="4" />
          <circle cx="114" cy="102" r="8" {...red} />
          {/* Adaptive schedule blocks */}
          <rect x="194" y="48" width="126" height="30" {...raised} />
          <rect x="202" y="57" width="12" height="12" {...red} />
          <line x1="222" y1="63" x2="306" y2="63" />

          <rect x="194" y="88" width="126" height="30" {...raised} />
          <line x1="204" y1="103" x2="294" y2="103" />

          <rect x="194" y="128" width="126" height="30" {...raised} />
          <line x1="204" y1="143" x2="278" y2="143" />
        </g>
      )}

      {type === 'commerce' && (
        <g {...stroke}>
          {/* Assortment modular box */}
          <rect x="48" y="40" width="124" height="124" {...raised} />
          {[0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => {
              const active = (r === 0 && c === 1) || (r === 1 && c === 1) || (r === 2 && c === 2);
              return (
                <rect
                  key={`${r}-${c}`}
                  x={60 + c * 36}
                  y={52 + r * 36}
                  width="28"
                  height="28"
                  fill={active ? 'var(--red)' : 'var(--paper)'}
                  stroke="var(--ink)"
                  strokeWidth="1.5"
                />
              );
            }),
          )}
          {/* Arrow to mobile checkout */}
          <line x1="184" y1="102" x2="224" y2="102" stroke="var(--red)" strokeWidth="2" />
          <polyline points="216,94 226,102 216,110" stroke="var(--red)" strokeWidth="2" />
          {/* Mobile storefront card */}
          <rect x="238" y="36" width="76" height="132" {...raised} />
          <line x1="250" y1="56" x2="302" y2="56" />
          <rect x="250" y="70" width="52" height="44" />
          <rect x="250" y="132" width="52" height="20" {...red} />
        </g>
      )}

      {type === 'luxury' && (
        <g {...stroke}>
          {/* Architectural diamond / showroom perspective */}
          <polygon points="180,32 256,84 180,168 104,84" {...raised} />
          <polygon points="180,32 218,84 180,168 142,84" />
          <line x1="104" y1="84" x2="256" y2="84" />
          <circle cx="180" cy="84" r="7" {...red} />
          {/* Editorial frame specs */}
          <line x1="40" y1="52" x2="88" y2="52" />
          <line x1="40" y1="64" x2="72" y2="64" />
          <line x1="272" y1="136" x2="320" y2="136" />
          <line x1="288" y1="148" x2="320" y2="148" />
        </g>
      )}

      {type === 'brand' && (
        <g {...stroke}>
          {/* Asymmetric editorial grid */}
          <rect x="42" y="38" width="168" height="124" {...raised} />
          <line x1="42" y1="62" x2="210" y2="62" />
          <rect x="56" y="76" width="68" height="72" fill="var(--red)" stroke="none" />
          <line x1="138" y1="84" x2="196" y2="84" />
          <line x1="138" y1="100" x2="196" y2="100" />
          <line x1="138" y1="116" x2="176" y2="116" />
          <rect x="138" y="132" width="48" height="16" />
          {/* Overlapping booking stamp */}
          <rect x="228" y="58" width="90" height="104" {...raised} />
          <line x1="242" y1="80" x2="304" y2="80" />
          <line x1="242" y1="98" x2="304" y2="98" />
          <line x1="242" y1="116" x2="288" y2="116" />
          <rect x="242" y="132" width="62" height="16" {...red} />
        </g>
      )}
    </svg>
  );
}
