import { useEffect, useState } from 'react';

const clock = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Dubai',
  hour: '2-digit',
  minute: '2-digit',
});

// Clean status readout for technical headers
export function LineStatus({ className = '' }: { className?: string }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => setTime(clock.format(new Date()));
    tick();
    const timer = setInterval(tick, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className={`inline-flex items-center gap-2 font-mono text-xs text-muted ${className}`}>
      <span aria-hidden="true" className="w-1.5 h-1.5 bg-red" />
      <span>Line active</span>
      <span aria-hidden="true">/</span>
      <span className="tabular-nums">Dubai {time || '--:--'}</span>
    </span>
  );
}
