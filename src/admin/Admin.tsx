import { useCallback, useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import type { Session } from '@supabase/supabase-js';
import { Check, LogOut, RefreshCw, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

type InquiryStatus = 'new' | 'contacted' | 'closed';
interface Inquiry {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string | null;
  email: string;
  message: string;
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
      <h1 className="font-display font-black uppercase text-3xl leading-none">Admin sign in</h1>
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

function Dashboard({ session }: { session: Session }) {
  const [rows, setRows] = useState<Inquiry[]>([]);
  const [filter, setFilter] = useState<InquiryStatus | 'all'>('all');
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

  const setStatus = async (id: string, status: InquiryStatus) => {
    const { error } = await supabase.from('inquiries').update({ status }).eq('id', id);
    if (error) setError(error.message);
    else setRows((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
  };

  const remove = async (id: string) => {
    if (!window.confirm('Delete this inquiry permanently?')) return;
    const { error } = await supabase.from('inquiries').delete().eq('id', id);
    if (error) setError(error.message);
    else setRows((r) => r.filter((x) => x.id !== id));
  };

  const count = (s: InquiryStatus) => rows.filter((r) => r.status === s).length;
  const shown = filter === 'all' ? rows : rows.filter((r) => r.status === filter);

  return (
    <div className="mx-auto w-full max-w-5xl px-5 sm:px-8 py-8">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-ink pb-5">
        <div>
          <p className="bp-label">ZYNIQ Studio / Admin</p>
          <h1 className="font-display font-black uppercase text-4xl leading-none mt-2">Inquiries</h1>
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

      <div className="mt-6 flex flex-wrap gap-2" role="tablist">
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

      {error && (
        <p role="alert" className="mt-6 border-l-4 border-red bg-raised px-4 py-3 text-sm">
          {error}
        </p>
      )}

      {loading ? (
        <p className="mt-8 bp-label">Loading…</p>
      ) : shown.length === 0 ? (
        <p className="mt-8 text-muted">No inquiries here yet.</p>
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
              <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-relaxed">{r.message}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {r.status !== 'contacted' && (
                  <button type="button" onClick={() => setStatus(r.id, 'contacted')} className={`${BTN} border border-ink`}>
                    Mark contacted
                  </button>
                )}
                {r.status !== 'closed' && (
                  <button type="button" onClick={() => setStatus(r.id, 'closed')} className={`${BTN} border border-ink`}>
                    <Check className="w-3.5 h-3.5" /> Close
                  </button>
                )}
                {r.status !== 'new' && (
                  <button type="button" onClick={() => setStatus(r.id, 'new')} className={`${BTN} border border-rule text-muted`}>
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
    <div className="min-h-screen bg-paper text-ink font-sans antialiased bp-grid">
      {!ready ? null : session ? (
        <Dashboard session={session} />
      ) : (
        <div className="min-h-screen flex items-center justify-center px-5">
          <SignIn />
        </div>
      )}
    </div>
  );
}
