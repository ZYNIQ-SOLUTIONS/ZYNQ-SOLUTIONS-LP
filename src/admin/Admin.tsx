import { useCallback, useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import type { Session } from '@supabase/supabase-js';
import { Check, LogOut, Mail, RefreshCw, Search, Trash2 } from 'lucide-react';
import { LogoIcon } from '../components/LogoIcon';
import { ZyniqTextLogo } from '../components/ZyniqTextLogo';
import { supabase } from '../lib/supabase';

function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <LogoIcon className="w-8 h-8" />
      <ZyniqTextLogo className="h-4 w-auto" />
      <span className="font-display font-black text-xl leading-none tracking-wide text-red translate-y-px">STUDIO</span>
      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted translate-y-px">Admin</span>
    </div>
  );
}

type InquiryStatus = 'new' | 'contacted' | 'closed';
interface Inquiry {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string | null;
  email: string;
  message: string;
  meeting_at: string | null;
  timezone: string | null;
  notes: string | null;
  assignee: string | null;
  status: InquiryStatus;
}

const FILTERS: Array<InquiryStatus | 'all'> = ['all', 'new', 'contacted', 'closed'];
const FIELD =
  'w-full bg-paper border border-rule px-4 py-3 text-base text-ink focus:outline-none focus:border-red transition-colors';
const BTN =
  'inline-flex items-center justify-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] px-4 min-h-10 cursor-pointer disabled:opacity-60';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setBusy(false);
  };

  return (
    <form onSubmit={submit} className="w-full max-w-sm border border-ink bg-raised p-6 sm:p-8 space-y-5">
      <Brand />
      <h1 className="font-display font-black uppercase text-3xl leading-none pt-2">Sign in</h1>
      <div>
        <label htmlFor="email" className="bp-label block mb-2">Email</label>
        <input id="email" type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className={FIELD} />
      </div>
      <div>
        <label htmlFor="password" className="bp-label block mb-2">Password</label>
        <input id="password" type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={FIELD} />
      </div>
      {error && (
        <p role="alert" className="border-l-4 border-red bg-paper px-4 py-3 text-sm">
          {error}
        </p>
      )}
      <button type="submit" disabled={busy} className={`${BTN} w-full bg-red text-white py-3`}>
        {busy ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}

const when = (iso: string) => new Date(iso).toLocaleString([], { dateStyle: 'full', timeStyle: 'short' });

function replyLink(r: Inquiry) {
  const subject = 'Your consultation request with ZYNIQ Studio';
  const slot = r.meeting_at ? ` We have your preferred time down as ${when(r.meeting_at)}.` : '';
  const body = `Hi ${r.first_name},\n\nThank you for reaching out to ZYNIQ Studio.${slot}\n\nBest regards,\nZYNIQ Studio`;
  return `mailto:${r.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function Dashboard({ session }: { session: Session }) {
  const [rows, setRows] = useState<Inquiry[]>([]);
  const [filter, setFilter] = useState<InquiryStatus | 'all'>('all');
  const [view, setView] = useState<'inquiries' | 'meetings'>('inquiries');
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

  const patch = async (id: string, changes: Partial<Pick<Inquiry, 'status' | 'notes' | 'assignee'>>) => {
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

  const count = (st: InquiryStatus) => rows.filter((r) => r.status === st).length;

  // Open requests that asked for the very same slot.
  const clashes = useMemo(() => {
    const seen = new Map<string, number>();
    for (const r of rows) if (r.meeting_at && r.status !== 'closed') seen.set(r.meeting_at, (seen.get(r.meeting_at) ?? 0) + 1);
    return new Set([...seen].filter(([, n]) => n > 1).map(([k]) => k));
  }, [rows]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = rows.filter(
      (r) =>
        (filter === 'all' || r.status === filter) &&
        (!q || [r.first_name, r.last_name, r.email, r.message, r.notes, r.assignee].some((v) => v?.toLowerCase().includes(q))),
    );
    if (sort === 'oldest') return [...list].reverse();
    if (sort === 'meeting')
      return [...list].sort((a, b) => (a.meeting_at ?? '9').localeCompare(b.meeting_at ?? '9'));
    return list;
  }, [rows, filter, query, sort]);

  const upcoming = useMemo(
    () =>
      rows
        .filter((r) => r.meeting_at && r.status !== 'closed' && new Date(r.meeting_at) > new Date())
        .sort((a, b) => a.meeting_at!.localeCompare(b.meeting_at!)),
    [rows],
  );

  return (
    <div className="mx-auto w-full max-w-5xl px-5 sm:px-8 py-8">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-ink pb-5">
        <div>
          <Brand />
          <h1 className="font-display font-black uppercase text-4xl leading-none mt-5">Inquiries</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="bp-label hidden sm:inline">{session.user.email}</span>
          <button type="button" onClick={load} className={`${BTN} border border-ink`} aria-label="Refresh">
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
          <button type="button" onClick={() => supabase.auth.signOut()} className={`${BTN} border border-ink`}>
            <LogOut className="w-3.5 h-3.5" /> Sign out
          </button>
        </div>
      </header>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 border-l border-t border-ink">
        {[['Total', rows.length], ['New', count('new')], ['Contacted', count('contacted')], ['Closed', count('closed')]].map(([label, n]) => (
          <div key={label} className="p-4 border-r border-b border-ink bg-raised">
            <p className="bp-label">{label}</p>
            <p className="font-display font-black text-4xl leading-none mt-2">{n}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-2 border-b border-rule">
        {(['inquiries', 'meetings'] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            aria-pressed={view === v}
            className={`${BTN} -mb-px border-b-2 ${view === v ? 'border-red text-ink' : 'border-transparent text-muted'}`}
          >
            {v === 'meetings' ? `Upcoming meetings (${upcoming.length})` : 'All inquiries'}
          </button>
        ))}
      </div>

      {error && (
        <p role="alert" className="mt-6 border-l-4 border-red bg-raised px-4 py-3 text-sm">
          {error}
        </p>
      )}

      {loading ? (
        <p className="mt-8 bp-label">Loading…</p>
      ) : view === 'meetings' ? (
        <div className="mt-6">
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
      ) : (
        <>
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

          <div className="mt-4 flex flex-wrap gap-2" role="tablist">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`${BTN} border ${filter === f ? 'bg-ink text-paper border-ink' : 'border-rule text-muted'}`}
              >
                {f}
              </button>
            ))}
          </div>

          {shown.length === 0 ? (
            <p className="mt-8 text-muted">No inquiries here.</p>
          ) : (
            <ul className="mt-6 space-y-4">
              {shown.map((r) => (
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
                        {r.status}
                      </p>
                    </div>
                  </div>
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
                    {r.status !== 'contacted' && (
                      <button type="button" onClick={() => patch(r.id, { status: 'contacted' })} className={`${BTN} border border-ink`}>
                        Mark contacted
                      </button>
                    )}
                    {r.status !== 'closed' && (
                      <button type="button" onClick={() => patch(r.id, { status: 'closed' })} className={`${BTN} border border-ink`}>
                        <Check className="w-3.5 h-3.5" /> Close
                      </button>
                    )}
                    {r.status !== 'new' && (
                      <button type="button" onClick={() => patch(r.id, { status: 'new' })} className={`${BTN} border border-rule text-muted`}>
                        Reopen
                      </button>
                    )}
                    <button type="button" onClick={() => remove(r.id)} className={`${BTN} border border-rule text-muted hover:text-red ml-auto`}>
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    document.title = 'Admin | ZYNIQ Studio';
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => {
      data.subscription.unsubscribe();
      meta.remove();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-paper text-ink font-sans antialiased bp-grid">
      {!ready ? null : session ? (
        <Dashboard session={session} />
      ) : (
        <>
          <div className="flex-1 flex items-center justify-center px-5 py-16">
            <SignIn />
          </div>
          <p
            aria-hidden="true"
            className="-mb-[3.2vw] text-center font-display font-black uppercase whitespace-nowrap leading-[0.8] text-[19.5vw] select-none"
          >
            ZYNIQ <span className="text-red">Studio</span>
          </p>
        </>
      )}
    </div>
  );
}
