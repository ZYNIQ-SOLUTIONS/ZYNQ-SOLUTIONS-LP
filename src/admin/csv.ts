import { STAGE_LABEL } from './types';
import type { Inquiry } from './types';

// A cell that starts with these is read as a formula by Excel and Sheets, so it gets a leading quote.
const FORMULA_START = /^[=+\-@\t\r]/;

function cell(value: string | number | boolean | null | undefined): string {
  let text = value === null || value === undefined ? '' : String(value);
  if (FORMULA_START.test(text)) text = `'${text}`;
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

const COLUMNS: Array<[string, (r: Inquiry) => string | number | boolean | null]> = [
  ['Received', (r) => r.created_at],
  ['First name', (r) => r.first_name],
  ['Last name', (r) => r.last_name],
  ['Email', (r) => r.email],
  ['Stage', (r) => STAGE_LABEL[r.status]],
  ['Deal value', (r) => r.deal_value],
  ['Assigned to', (r) => r.assignee],
  ['Preferred meeting', (r) => r.meeting_at],
  ['Visitor timezone', (r) => r.timezone],
  ['Project brief', (r) => r.message],
  ['Notes', (r) => r.notes],
  ['Spam', (r) => (r.is_spam ? 'yes' : 'no')],
];

export function toCsv(rows: Inquiry[]): string {
  const lines = [COLUMNS.map(([name]) => cell(name)).join(',')];
  for (const r of rows) lines.push(COLUMNS.map(([, get]) => cell(get(r))).join(','));
  return lines.join('\r\n');
}

export function downloadCsv(rows: Inquiry[]) {
  // The byte order mark makes Excel read the file as UTF-8.
  const blob = new Blob(['﻿', toCsv(rows)], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `zyniq-inquiries-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
