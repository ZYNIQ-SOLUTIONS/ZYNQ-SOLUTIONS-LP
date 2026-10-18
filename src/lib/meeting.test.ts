import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dubaiToday, isBookableDay, slotsForDay } from './meeting';

test('slots run 10:00 to 16:30 Dubai time', () => {
  const slots = slotsForDay({ y: 2026, m: 9, d: 20 });
  assert.equal(slots.length, 14);
  assert.equal(slots[0].toISOString(), '2026-10-20T06:00:00.000Z');
  assert.equal(slots[13].toISOString(), '2026-10-20T12:30:00.000Z');
});

test('only upcoming weekdays are bookable', () => {
  const now = new Date('2026-10-19T08:00:00Z'); // Monday
  assert.deepEqual(dubaiToday(now), { y: 2026, m: 9, d: 19 });
  assert.equal(isBookableDay({ y: 2026, m: 9, d: 19 }, now), false); // today
  assert.equal(isBookableDay({ y: 2026, m: 9, d: 20 }, now), true); // Tuesday
  assert.equal(isBookableDay({ y: 2026, m: 9, d: 24 }, now), false); // Saturday
  assert.equal(isBookableDay({ y: 2027, m: 2, d: 1 }, now), false); // too far ahead
});

test('Dubai date rolls over before UTC does', () => {
  assert.deepEqual(dubaiToday(new Date('2026-10-19T21:00:00Z')), { y: 2026, m: 9, d: 20 });
});
