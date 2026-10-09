import { STAGES } from '../../content/site';

const CENTRES = [180, 460, 740, 1020];
const HOUSING = { w: 160, h: 110, y: 52 };
const BELT_Y = 178;
const FLOOR_Y = 232;
const PARTS = 6;
const BELT_SECONDS = 14;

const hatch = Array.from({ length: 49 }, (_, i) => `M${24 + i * 24} ${FLOOR_Y}l-8 8`).join('');

function Works({ index }: { index: number }) {
  switch (index) {
    case 0: // intake: a brief dropping in
      return (
        <g>
          <rect x="62" y="34" width="36" height="46" fill="var(--paper)" />
          <path d="M70 46h20M70 56h20M70 66h12" />
          <path d="M80 86v14m-5-5l5 5 5-5" stroke="var(--red)" />
        </g>
      );
    case 1: // crews: seven agents working in sequence
      return (
        <g stroke="none">
          {Array.from({ length: 7 }, (_, i) => (
            <rect
              key={i}
              x={(i > 3 ? 45 : 36) + (i % 4) * 24}
              y={i > 3 ? 68 : 44}
              width="14"
              height="14"
              fill="var(--red)"
              className="bp-crew"
              style={{ animationDelay: `${i * 0.18}s` }}
            />
          ))}
        </g>
      );
    case 2: // checks: a scan line passing over a checklist
      return (
        <g>
          <rect x="34" y="38" width="16" height="16" />
          <rect x="34" y="66" width="16" height="16" />
          <path d="M38 46l3.5 3.5 6-7M38 74l3.5 3.5 6-7" stroke="var(--red)" />
          <path d="M62 46h64M62 74h64" />
          <path d="M14 34h132" stroke="var(--red)" strokeWidth="2" className="bp-scan" />
        </g>
      );
    default: // ship
      return <path d="M56 92l48-48M72 44h32v32" strokeWidth="2.5" />;
  }
}

// Side elevation of the line: parts ride the belt through the four stages,
// arriving as outlines and leaving the crews as solid blocks.
export function LineDrawing() {
  const parts = (filled: boolean) =>
    Array.from({ length: PARTS }, (_, i) => (
      <rect
        key={i}
        x="-14"
        y={BELT_Y - 14}
        width="12"
        height="12"
        fill={filled ? 'var(--red)' : 'none'}
        stroke="var(--red)"
        className="bp-belt"
        style={{ animationDuration: `${BELT_SECONDS}s`, animationDelay: `${(-i * BELT_SECONDS) / PARTS}s` }}
      />
    ));

  return (
    <svg viewBox="0 0 1200 262" className="w-full" aria-hidden="true" fill="none" stroke="var(--ink)" strokeWidth="1.5">
      <defs>
        <clipPath id="ld-raw">
          <rect x="40" y="150" width={CENTRES[1] - 40} height="30" />
        </clipPath>
        <clipPath id="ld-built">
          <rect x={CENTRES[1]} y="150" width={1160 - CENTRES[1]} height="30" />
        </clipPath>
      </defs>

      {/* overall dimension; the small annotations only appear where they are legible */}
      <g stroke="var(--ink-muted)" strokeWidth="1" className="hidden xl:block">
        <path className="bp-draw" pathLength={1} d="M100 14H460M100 6v16" />
        <path className="bp-draw" pathLength={1} d="M1100 14H740M1100 6v16" />
      </g>
      <text x="600" y="18" textAnchor="middle" stroke="none" fill="var(--ink-muted)" className="font-mono hidden xl:block" fontSize="10" letterSpacing="2.5">
        ONE LINE / IDEA TO SHIPPED
      </text>

      {/* floor and belt */}
      <path className="bp-draw" pathLength={1} d={`M20 ${FLOOR_Y}H1180`} />
      <path d={hatch} stroke="var(--ink-muted)" strokeWidth="1" />
      <path d={[60, 320, 600, 880, 1140].map((x) => `M${x} ${BELT_Y + 16}V${FLOOR_Y}`).join('')} />
      <rect x="40" y={BELT_Y} width="1120" height="16" rx="8" fill="var(--paper-raised)" />
      {Array.from({ length: 21 }, (_, i) => (
        <g key={i} className="bp-spin" style={{ transformOrigin: `${48 + i * 55.2}px ${BELT_Y + 8}px` }}>
          <circle cx={48 + i * 55.2} cy={BELT_Y + 8} r="4.5" strokeWidth="1" />
          <path d={`M${48 + i * 55.2 - 4.5} ${BELT_Y + 8}h9`} strokeWidth="1" />
        </g>
      ))}

      <g clipPath="url(#ld-raw)">{parts(false)}</g>
      <g clipPath="url(#ld-built)">{parts(true)}</g>

      <g stroke="none" fill="var(--ink-muted)" className="font-mono hidden xl:block" fontSize="9" letterSpacing="2">
        <text x="40" y="168">IN</text>
        <text x="1160" y="168" textAnchor="end">OUT</text>
      </g>

      {STAGES.map((stage, i) => {
        const x = CENTRES[i] - HOUSING.w / 2;
        return (
          <g key={stage.label} className="bp-rise" style={{ animationDelay: `${0.5 + i * 0.14}s` }}>
            <text x={x} y="42" stroke="none" fill="var(--ink)" className="font-display" fontSize="27" fontWeight="900">
              {stage.label.toUpperCase()}
            </text>
            <path d={`M${x} ${HOUSING.y + HOUSING.h}V${FLOOR_Y}M${x + HOUSING.w} ${HOUSING.y + HOUSING.h}V${FLOOR_Y}`} />
            <g transform={`translate(${x} ${HOUSING.y})`}>
              <rect width={HOUSING.w} height={HOUSING.h} fill="var(--paper-raised)" />
              <path d={`M0 22h${HOUSING.w}`} />
              <text x="10" y="15" stroke="none" fill="var(--red)" className="font-mono hidden xl:block" fontSize="9.5" letterSpacing="2">
                0{i + 1}
              </text>
              <rect x="143" y="8" width="7" height="7" stroke="none" fill="var(--red)" className="bp-crew" style={{ animationDelay: `${i * 0.4}s` }} />
              <Works index={i} />
            </g>
            <text x={x} y="254" stroke="none" fill="var(--ink-muted)" className="font-mono hidden xl:block" fontSize="9.5" letterSpacing="0.5">
              {stage.note}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
