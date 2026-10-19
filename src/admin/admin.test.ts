import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toCsv } from './csv';
import { spamSignals } from './spam';
import type { Inquiry } from './types';

const base: Inquiry = {
  id: '1',
  created_at: '2026-10-19T10:00:00Z',
  first_name: 'Jane',
  last_name: 'Doe',
  email: 'jane@acme.com',
  message: 'We want to build an internal assistant for support.',
  meeting_at: null,
  timezone: null,
  notes: null,
  assignee: null,
  deal_value: null,
  is_spam: false,
  status: 'new',
};

test('csv quotes commas, quotes and newlines', () => {
  const csv = toCsv([{ ...base, message: 'Line one,\n"two"' }]);
  assert.ok(csv.includes('"Line one,\n""two"""'));
  assert.equal(csv.split('\r\n')[0].split(',')[0], 'Received');
});

test('csv neutralises spreadsheet formulas', () => {
  const csv = toCsv([{ ...base, first_name: '=HYPERLINK("x")' }]);
  assert.ok(csv.includes(`"'=HYPERLINK(""x"")"`));
});

test('spam signals flag repeats, links and junk', () => {
  assert.deepEqual(spamSignals(base, [base]), []);
  const twin = { ...base, id: '2' };
  assert.ok(spamSignals(base, [base, twin]).includes('Repeat email'));
  assert.ok(spamSignals({ ...base, message: 'buy now http://x.co' }, [base]).includes('Contains link'));
  assert.ok(spamSignals({ ...base, message: 'hi' }, [base]).includes('Very short brief'));
  assert.ok(spamSignals({ ...base, message: 'aaaaaaaaaaaaaaaaaaaa' }, [base]).includes('Looks random'));
});
