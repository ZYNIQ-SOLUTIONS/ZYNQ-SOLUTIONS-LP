import type { Inquiry } from './types';

// Cheap signals to review by eye. Nothing is hidden or deleted automatically.
export function spamSignals(row: Inquiry, all: Inquiry[]): string[] {
  const signals: string[] = [];
  const email = row.email.toLowerCase();
  if (all.some((o) => o.id !== row.id && o.email.toLowerCase() === email)) signals.push('Repeat email');
  if (/(https?:\/\/|www\.)/i.test(row.message)) signals.push('Contains link');
  if (row.message.trim().length < 15) signals.push('Very short brief');
  if (/(.)\1{7,}/.test(row.message) || /^[^a-z]*$/i.test(row.first_name)) signals.push('Looks random');
  return signals;
}
