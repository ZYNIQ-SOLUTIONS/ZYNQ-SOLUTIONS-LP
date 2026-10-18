import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BOOKING_WINDOW_DAYS, dubaiToday, isBookableDay, slotsForDay } from '../lib/meeting';
import type { DayParts } from '../lib/meeting';

const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const MONTH = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric', timeZone: 'UTC' });
const TIME = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit' });
const LONG_DAY = new Intl.DateTimeFormat('en', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' });

interface Props {
  value: string; // ISO instant, or ''
  onChange: (iso: string) => void;
}

const same = (a: DayParts, b: DayParts) => a.y === b.y && a.m === b.m && a.d === b.d;

export function MeetingPicker({ value, onChange }: Props) {
  const today = useMemo(() => dubaiToday(), []);
  const [view, setView] = useState({ y: today.y, m: today.m });
  const [day, setDay] = useState<DayParts | null>(null);

  const monthStart = Date.UTC(view.y, view.m, 1);
  const lead = (new Date(monthStart).getUTCDay() + 6) % 7; // Monday first
  const length = new Date(Date.UTC(view.y, view.m + 1, 0)).getUTCDate();
  const cells = [...Array(lead).fill(null), ...Array.from({ length }, (_, i) => i + 1)];

  const shift = (delta: number) => {
    const next = new Date(Date.UTC(view.y, view.m + delta, 1));
    setView({ y: next.getUTCFullYear(), m: next.getUTCMonth() });
  };
  const canGoBack = view.y > today.y || view.m > today.m;
  const canGoForward = Date.UTC(view.y, view.m + 1, 1) <= Date.UTC(today.y, today.m, today.d + BOOKING_WINDOW_DAYS);

  const pickDay = (d: number) => {
    setDay({ ...view, d });
    onChange('');
  };

  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const btn = 'font-mono text-xs min-h-11 cursor-pointer transition-colors';

  return (
    <fieldset>
      <legend className="bp-label mb-2">
        Preferred meeting time <span className="normal-case tracking-normal">(optional)</span>
      </legend>
      <div className="border border-rule bg-paper p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <button type="button" onClick={() => shift(-1)} disabled={!canGoBack} aria-label="Previous month" className={`${btn} w-11 inline-flex items-center justify-center disabled:opacity-30 disabled:cursor-default`}>
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-display font-black uppercase text-lg leading-none" aria-live="polite">
            {MONTH.format(monthStart)}
          </span>
          <button type="button" onClick={() => shift(1)} disabled={!canGoForward} aria-label="Next month" className={`${btn} w-11 inline-flex items-center justify-center disabled:opacity-30 disabled:cursor-default`}>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-7 text-center">
          {WEEKDAYS.map((w, i) => (
            <span key={i} className="bp-label py-1">
              {w}
            </span>
          ))}
          {cells.map((d, i) => {
            if (d === null) return <span key={`b${i}`} />;
            const parts = { ...view, d };
            const ok = isBookableDay(parts);
            const selected = day !== null && same(day, parts);
            return (
              <button
                key={d}
                type="button"
                disabled={!ok}
                onClick={() => pickDay(d)}
                aria-pressed={selected}
                className={`${btn} ${
                  selected ? 'bg-red text-white font-semibold' : ok ? 'text-ink hover:bg-raised hover:text-red' : 'text-muted/40 cursor-default'
                }`}
              >
                {d}
              </button>
            );
          })}
        </div>

        {day && (
          <div className="mt-4 pt-4 border-t border-rule">
            <p className="bp-label mb-3">{LONG_DAY.format(Date.UTC(day.y, day.m, day.d))}</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {slotsForDay(day).map((slot) => {
                const iso = slot.toISOString();
                const selected = iso === value;
                return (
                  <button
                    key={iso}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => onChange(iso)}
                    className={`${btn} border ${selected ? 'bg-ink text-paper border-ink font-semibold' : 'border-rule hover:border-red'}`}
                  >
                    {TIME.format(slot)}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <p className="mt-4 text-xs text-muted leading-relaxed">
          Weekdays, 10:00 to 16:30 Dubai time. Times shown in your timezone ({zone}). We'll confirm by email.
        </p>
      </div>
    </fieldset>
  );
}
