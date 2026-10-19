import { useCallback, useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Trash2, UserPlus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { BTN, FIELD } from './ui';

export function Team({ myEmail }: { myEmail: string }) {
  const [admins, setAdmins] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    const { data, error } = await supabase.from('admins').select('email').order('email');
    if (error) setError(error.message);
    else setAdmins(data.map((a) => a.email));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const add = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    setMessage('');
    const { data, error } = await supabase.functions.invoke('invite-admin', { body: { email } });
    if (error || data?.error) setError(data?.error ?? error?.message ?? 'Could not add admin');
    else {
      setMessage(
        data.invited
          ? `Invite sent to ${email}. They open the link and choose a password.`
          : `${email} can now sign in${data.warning ? ` (invite email not sent: ${data.warning})` : ' with their existing account'}.`,
      );
      setEmail('');
      load();
    }
    setBusy(false);
  };

  const remove = async (target: string) => {
    if (!window.confirm(`Remove ${target} from the admins?`)) return;
    const { error } = await supabase.from('admins').delete().eq('email', target);
    if (error) setError(error.message);
    else setAdmins((a) => a.filter((x) => x !== target));
  };

  return (
    <div className="mt-6 max-w-xl">
      <h2 className="bp-label mb-3">People who can open this dashboard</h2>
      <ul className="border-t border-ink">
        {admins.map((a) => (
          <li key={a} className="py-3 border-b border-rule flex items-center justify-between gap-3">
            <span className="break-all text-sm">
              {a} {a === myEmail.toLowerCase() && <span className="bp-label">(you)</span>}
            </span>
            {a !== myEmail.toLowerCase() && (
              <button type="button" onClick={() => remove(a)} className={`${BTN} border border-rule text-muted hover:text-red`}>
                <Trash2 className="w-3.5 h-3.5" /> Remove
              </button>
            )}
          </li>
        ))}
      </ul>

      <form onSubmit={add} className="mt-6 flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-52">
          <label htmlFor="new-admin" className="bp-label block mb-2">
            Add an admin by email
          </label>
          <input id="new-admin" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={FIELD} />
        </div>
        <button type="submit" disabled={busy} className={`${BTN} bg-red text-white min-h-12`}>
          <UserPlus className="w-3.5 h-3.5" /> {busy ? 'Adding…' : 'Add and invite'}
        </button>
      </form>
      <p className="mt-3 text-xs text-muted leading-relaxed">
        Removing someone stops them seeing inquiries straight away. You cannot remove yourself.
      </p>
      {message && (
        <p role="status" className="mt-4 border-l-4 border-red bg-raised px-4 py-3 text-sm">
          {message}
        </p>
      )}
      {error && (
        <p role="alert" className="mt-4 border-l-4 border-red bg-raised px-4 py-3 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
