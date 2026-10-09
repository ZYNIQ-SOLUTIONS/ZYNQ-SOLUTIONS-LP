import { useEffect, useState } from 'react';

const clock = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Dubai',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});

// Live readout for the drawing's header: the time at HQ, ticking once a second.
export function LineStatus({ className = '' }: { className?: string }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => setTime(clock.format(new Date()));
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className={`items-center gap-2 ${className}`}>
      <span aria-hidden="true" className="bp-crew w-1.5 h-1.5 bg-red" />
      <span>Line running</span>
      <span aria-hidden="true">/</span>
      <span className="tabular-nums">Dubai {time || '--:--:--'}</span>
    </span>
  );
}
