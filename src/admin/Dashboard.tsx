import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { Download, LogOut, Mail, RefreshCw, Search, ShieldAlert, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Board } from './Board';
import { downloadCsv } from './csv';
import { spamSignals } from './spam';
import { Team } from './Team';
import { STAGES, STAGE_LABEL, OPEN_STAGES, money } from './types';
import type { Inquiry, InquiryStatus } from './types';
import { BTN, Brand, FIELD, replyLink, when } from './ui';

type View = 'board' | 'list' | 'meetings' | 'spam' | 'team';
const VIEWS: Array<[View, string]> = [
  ['board', 'Pipeline'],
  ['list', 'All inquiries'],
  ['meetings', 'Meetings'],
  ['spam', 'Spam'],
  ['team', 'Team'],
];

export function Dashboard({ session }: { session: Session }) {
  const [rows, setRows] = useState<Inquiry[]>([]);
  const [filter, setFilter] = useState<InquiryStatus | 'all'>('all');
  const [view, setView] = useState<View>('board');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<'newest' | 'oldest' | 'meeting'>('newest');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    const { data, error } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
    if (error) setError(error.message);
    else setRows(data as Inquiry[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const patch = async (id: string, changes: Partial<Inquiry>) => {
    const { error } = await supabase.from('inquiries').update(changes).eq('id', id);
    if (error) setError(error.message);
    else setRows((r) => r.map((x) => (x.id === id ? { ...x, ...changes } : x)));
  };

  const remove = async (id: string) => {
    if (!window.confirm('Delete this inquiry permanently?')) return;
    const { error } = await supabase.from('inquiries').delete().eq('id', id);
    if (error) setError(error.message);
    else setRows((r) => r.filter((x) => x.id !== id));
  };

  const real = useMemo(() => rows.filter((r) => !r.is_spam), [rows]);
  const spam = useMemo(() => rows.filter((r) => r.is_spam), [rows]);
  const count = (st: InquiryStatus) => real.filter((r) => r.status === st).length;
  const isOpen = (r: Inquiry) => OPEN_STAGES.includes(r.status);

  // Open requests that asked for the very same slot.
  const clashes = useMemo(() => {
    const seen = new Map<string, number>();
    for (const r of real) if (r.meeting_at && isOpen(r)) seen.set(r.meeting_at, (seen.get(r.meeting_at) ?? 0) + 1);
    return new Set([...seen].filter(([, n]) => n > 1).map(([k]) => k));
  }, [real]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = real.filter(
      (r) =>
        (filter === 'all' || r.status === filter) &&
        (!q || [r.first_name, r.last_name, r.email, r.message, r.notes, r.assignee].some((v) => v?.toLowerCase().includes(q))),
    );
    if (sort === 'oldest') return [...list].reverse();
    if (sort === 'meeting') return [...list].sort((a, b) => (a.meeting_at ?? '9').localeCompare(b.meeting_at ?? '9'));
    return list;
  }, [real, filter, query, sort]);

  const upcoming = useMemo(
    () =>
      real
        .filter((r) => r.meeting_at && isOpen(r) && new Date(r.meeting_at) > new Date())
        .sort((a, b) => a.meeting_at!.localeCompare(b.meeting_at!)),
    [real],
  );

  const openValue = real.filter(isOpen).reduce((t, r) => t + (r.deal_value ?? 0), 0);

  const card = (r: Inquiry) => {
    const signals = spamSignals(r, rows);
    return (
      <li key={r.id} className="border border-ink bg-raised p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="font-display font-black uppercase text-2xl leading-none">
              {r.first_name} {r.last_name}
            </h2>
            <a href={`mailto:${r.email}`} className="mt-1 inline-block break-all text-sm underline underline-offset-2 hover:text-red">
              {r.email}
            </a>
          </div>
          <div className="text-right">
            <p className="bp-label">{new Date(r.created_at).toLocaleString()}</p>
            <p className={`mt-1 font-mono text-[11px] font-semibold uppercase tracking-wider ${r.status === 'new' ? 'text-red' : 'text-muted'}`}>
              {STAGE_LABEL[r.status]}
              {r.deal_value ? ` · ${money(r.deal_value)}` : ''}
            </p>
          </div>
        </div>

        {signals.length > 0 && (
          <p className="mt-3 flex flex-wrap gap-2">
            {signals.map((s) => (
              <span key={s} className="inline-flex items-center gap-1 border border-red px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-red">
                <ShieldAlert className="w-3 h-3" aria-hidden="true" /> {s}
              </span>
            ))}
          </p>
        )}

        {r.meeting_at && (
          <p className="mt-4 inline-block border border-red px-3 py-2 font-mono text-xs">
            <span className="text-red font-semibold uppercase tracking-wider">Wants to meet</span> {when(r.meeting_at)}
            {r.timezone && <span className="text-muted"> · visitor in {r.timezone}</span>}
            {clashes.has(r.meeting_at) && <span className="text-red font-semibold"> · clash</span>}
          </p>
        )}
        <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-relaxed">{r.message}</p>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label htmlFor={`a-${r.id}`} className="bp-label block mb-1">Assigned to</label>
            <input
              id={`a-${r.id}`}
              defaultValue={r.assignee ?? ''}
              maxLength={100}
              onBlur={(e) => e.target.value !== (r.assignee ?? '') && patch(r.id, { assignee: e.target.value.trim() || null })}
              className={`${FIELD} !py-2 text-sm`}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={`n-${r.id}`} className="bp-label block mb-1">Private notes</label>
            <textarea
              id={`n-${r.id}`}
              rows={2}
              defaultValue={r.notes ?? ''}
              maxLength={5000}
              placeholder="Called, sent proposal…"
              onBlur={(e) => e.target.value !== (r.notes ?? '') && patch(r.id, { notes: e.target.value.trim() || null })}
              className={`${FIELD} !py-2 text-sm resize-y`}
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <a href={replyLink(r)} className={`${BTN} bg-red text-white`}>
            <Mail className="w-3.5 h-3.5" /> Reply
          </a>
          <select
            value={r.status}
            onChange={(e) => patch(r.id, { status: e.target.value as InquiryStatus })}
            aria-label="Stage"
            className={`${FIELD} !w-auto !py-2 text-xs`}
          >
            {STAGES.map((s) => (
              <option key={s} value={s}>
                {STAGE_LABEL[s]}
              </option>
            ))}
          </select>
          <button type="button" onClick={() => patch(r.id, { is_spam: !r.is_spam })} className={`${BTN} border border-rule text-muted`}>
            {r.is_spam ? 'Not spam' : 'Mark as spam'}
          </button>
          <button type="button" onClick={() => remove(r.id)} className={`${BTN} border border-rule text-muted hover:text-red ml-auto`}>
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </button>
        </div>
      </li>
    );
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 py-8">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-ink pb-5">
        <div>
          <Brand />
          <h1 className="font-display font-black uppercase text-4xl leading-none mt-5">Inquiries</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="bp-label hidden md:inline">{session.user.email}</span>
          <button type="button" onClick={load} className={`${BTN} border border-ink`}>
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
          <button type="button" onClick={() => downloadCsv(rows)} disabled={rows.length === 0} className={`${BTN} border border-ink`}>
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
          <button type="button" onClick={() => supabase.auth.signOut()} className={`${BTN} border border-ink`}>
            <LogOut className="w-3.5 h-3.5" /> Sign out
          </button>
        </div>
      </header>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 border-l border-t border-ink">
        {[
          ['Total', real.length],
          ['New', count('new')],
          ['In progress', count('contacted') + count('qualified') + count('proposal')],
          ['Won', count('won')],
          ['Open value', money(openValue)],
        ].map(([label, n]) => (
          <div key={label} className="p-4 border-r border-b border-ink bg-raised">
            <p className="bp-label">{label}</p>
            <p className="font-display font-black text-3xl leading-none mt-2">{n}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-1 border-b border-rule overflow-x-auto" role="tablist">
        {VIEWS.map(([v, label]) => (
          <button
            key={v}
            type="button"
            role="tab"
            aria-selected={view === v}
            onClick={() => setView(v)}
            className={`${BTN} shrink-0 -mb-px border-b-2 ${view === v ? 'border-red text-ink' : 'border-transparent text-muted'}`}
          >
            {label}
            {v === 'meetings' && ` (${upcoming.length})`}
            {v === 'spam' && ` (${spam.length})`}
          </button>
        ))}
      </div>

      {error && (
        <p role="alert" className="mt-6 border-l-4 border-red bg-raised px-4 py-3 text-sm">
          {error}
        </p>
      )}

      {view === 'team' ? (
        <Team myEmail={session.user.email ?? ''} />
      ) : loading ? (
        <p className="mt-8 bp-label">Loading…</p>
      ) : view === 'board' ? (
        <Board rows={real} patch={patch} />
      ) : view === 'meetings' ? (
        <div className="mt-6 max-w-3xl">
          {upcoming.length === 0 ? (
            <p className="text-muted">No upcoming meeting requests.</p>
          ) : (
            <ul className="border-t border-ink">
              {upcoming.map((r) => (
                <li key={r.id} className="py-4 border-b border-rule flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-display font-black uppercase text-xl leading-none">{when(r.meeting_at!)}</p>
                    <p className="mt-1 text-sm">
                      {r.first_name} {r.last_name} · <span className="text-muted break-all">{r.email}</span>
                    </p>
                    {clashes.has(r.meeting_at!) && (
                      <p className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-red">
                        Clash: more than one request for this time
                      </p>
                    )}
                  </div>
                  <a href={replyLink(r)} className={`${BTN} border border-ink`}>
                    <Mail className="w-3.5 h-3.5" /> Reply
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : view === 'spam' ? (
        <div className="mt-6 max-w-4xl">
          <p className="text-sm text-muted">Marked as spam and kept out of every other view and the counts. Nothing is deleted until you delete it.</p>
          {spam.length === 0 ? <p className="mt-6 text-muted">No spam.</p> : <ul className="mt-6 space-y-4">{spam.map(card)}</ul>}
        </div>
      ) : (
        <div className="max-w-4xl">
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-48">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, email, brief or notes"
                aria-label="Search inquiries"
                className={`${FIELD} !py-2.5 pl-10`}
              />
            </div>
            <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} aria-label="Sort" className={`${FIELD} !w-auto !py-2.5`}>
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="meeting">By meeting time</option>
            </select>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {(['all', ...STAGES] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`${BTN} border ${filter === f ? 'bg-ink text-paper border-ink' : 'border-rule text-muted'}`}
              >
                {f === 'all' ? 'All' : STAGE_LABEL[f]}
              </button>
            ))}
          </div>
          {shown.length === 0 ? <p className="mt-8 text-muted">No inquiries here.</p> : <ul className="mt-6 space-y-4">{shown.map(card)}</ul>}
        </div>
      )}
    </div>
  );
}
