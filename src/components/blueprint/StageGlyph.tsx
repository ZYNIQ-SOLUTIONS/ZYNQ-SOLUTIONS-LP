// Small drawn symbol for each stage of the line: brief, crew, checks, ship.
export function StageGlyph({ index }: { index: number }) {
  const ink = 'var(--ink)';
  switch (index) {
    case 0: // a brief: a sheet with lines
      return (
        <g fill="none" stroke={ink} strokeWidth="1.5">
          <rect x="0" y="0" width="26" height="34" />
          <path d="M6 9h14M6 16h14M6 23h9" />
        </g>
      );
    case 1: // crew of seven
      return (
        <g>
          {Array.from({ length: 7 }, (_, i) => (
            <rect
              key={i}
              x={(i % 4) * 11 + (i > 3 ? 5.5 : 0)}
              y={i > 3 ? 20 : 6}
              width="8"
              height="8"
              fill="var(--red)"
            />
          ))}
        </g>
      );
    case 2: // checks
      return (
        <g fill="none" stroke={ink} strokeWidth="1.5">
          <rect x="0" y="4" width="11" height="11" />
          <rect x="0" y="21" width="11" height="11" />
          <path d="M2.5 9.5l2.5 2.5 4-5M2.5 26.5l2.5 2.5 4-5" stroke="var(--red)" />
          <path d="M17 9.5h18M17 26.5h18" />
        </g>
      );
    default: // ship
      return (
        <g fill="none" stroke={ink} strokeWidth="1.5">
          <path d="M4 30L30 4M12 4h18v18" />
        </g>
      );
  }
}
