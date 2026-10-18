// Meetings are offered in studio hours (Dubai, UTC+4 all year): weekdays, 10:00 to 16:30, every 30 minutes.
const OFFSET_HOURS = 4;
const FIRST_MINUTE = 10 * 60;
const LAST_MINUTE = 16 * 60 + 30;
const STEP = 30;
export const BOOKING_WINDOW_DAYS = 45;

export interface DayParts {
  y: number;
  m: number; // 0-11
  d: number;
}

const toUtcMs = ({ y, m, d }: DayParts) => Date.UTC(y, m, d);

/** Today's calendar date in Dubai. */
export function dubaiToday(now = new Date()): DayParts {
  const shifted = new Date(now.getTime() + OFFSET_HOURS * 3600_000);
  return { y: shifted.getUTCFullYear(), m: shifted.getUTCMonth(), d: shifted.getUTCDate() };
}

export function isBookableDay(day: DayParts, now = new Date()): boolean {
  const today = toUtcMs(dubaiToday(now));
  const ms = toUtcMs(day);
  const weekday = new Date(ms).getUTCDay();
  const daysAhead = (ms - today) / 86_400_000;
  return weekday >= 1 && weekday <= 5 && daysAhead >= 1 && daysAhead <= BOOKING_WINDOW_DAYS;
}

/** UTC instants for each slot of a day. */
export function slotsForDay(day: DayParts): Date[] {
  const slots: Date[] = [];
  for (let minute = FIRST_MINUTE; minute <= LAST_MINUTE; minute += STEP) {
    slots.push(new Date(Date.UTC(day.y, day.m, day.d, 0, minute - OFFSET_HOURS * 60)));
  }
  return slots;
}
