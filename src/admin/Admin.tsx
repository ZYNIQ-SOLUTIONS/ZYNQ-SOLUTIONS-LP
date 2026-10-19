import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { Dashboard } from './Dashboard';
import { BTN, Brand, FIELD } from './ui';

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

function SetPassword({ onDone }: { onDone: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const { error } = await supabase.auth.updateUser({ password });
    if (error) setError(error.message);
    else onDone();
    setBusy(false);
  };

  return (
    <form onSubmit={submit} className="w-full max-w-sm border border-ink bg-raised p-6 sm:p-8 space-y-5">
      <Brand />
      <h1 className="font-display font-black uppercase text-3xl leading-none pt-2">Choose a password</h1>
      <div>
        <label htmlFor="new-password" className="bp-label block mb-2">New password (8+ characters)</label>
        <input id="new-password" type="password" required minLength={8} autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} className={FIELD} />
      </div>
      {error && (
        <p role="alert" className="border-l-4 border-red bg-paper px-4 py-3 text-sm">
          {error}
        </p>
      )}
      <button type="submit" disabled={busy} className={`${BTN} w-full bg-red text-white py-3`}>
        {busy ? 'Saving…' : 'Save and continue'}
      </button>
    </form>
  );
}

export default function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  // An invite or reset link lands here already signed in; the person still has to choose a password.
  const [choosing, setChoosing] = useState(() => /type=(invite|recovery)/.test(window.location.hash));

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
      {!ready ? null : session && choosing ? (
        <div className="min-h-screen flex items-center justify-center px-5">
          <SetPassword
            onDone={() => {
              window.history.replaceState(null, '', window.location.pathname);
              setChoosing(false);
            }}
          />
        </div>
      ) : session ? (
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
