import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { CornerMarks } from '../components/blueprint/CornerMarks';
import { MeetingPicker } from '../components/MeetingPicker';
import { Station } from '../components/blueprint/Station';
import { CONTACT_EMAILS, SITE, STAGES, STATIONS } from '../content/site';
import { supabase } from '../lib/supabase';

const EMPTY = { firstName: '', lastName: '', email: '', message: '', 'bot-field': '' };

type Status = 'idle' | 'sending' | 'sent' | 'error';

const LABEL = 'bp-label block mb-2';
const FIELD =
  'w-full bg-paper border border-rule px-4 py-3 text-base text-ink placeholder:text-muted/60 focus:outline-none focus:border-red transition-colors';

export function Consultation() {
  const [values, setValues] = useState(EMPTY);
  const [meetingAt, setMeetingAt] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const contact = CONTACT_EMAILS[0];

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    try {
      // Bots fill the hidden field; pretend it worked and store nothing.
      if (values['bot-field']) {
        setStatus('sent');
        return;
      }
      const { error } = await supabase.from('inquiries').insert({
        first_name: values.firstName.trim(),
        last_name: values.lastName.trim() || null,
        email: values.email.trim(),
        message: values.message.trim(),
        meeting_at: meetingAt || null,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });
      setStatus(error ? 'error' : 'sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <Station
      {...STATIONS[4]}
      title="Get Free Consultation"
      intro="Ready to architect your custom synthetic brain? Connect with our specialist Commanders and start engineering the future today."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
      <div className="relative lg:col-span-7 border border-ink bg-raised">
        <CornerMarks />
        <div className="flex justify-between gap-4 px-5 sm:px-8 py-4 border-b border-ink bp-label">
          <span>Work order / New</span>
          <span className="!text-red font-semibold">Free</span>
        </div>

        {status === 'sent' ? (
          <div role="status" className="px-5 sm:px-8 py-12">
            <span className="inline-flex items-center justify-center w-10 h-10 bg-red text-white">
              <Check className="w-5 h-5" />
            </span>
            <h3 className="mt-5 font-display font-black uppercase text-4xl leading-none">Work order received</h3>
            <p className="mt-3 text-base text-muted leading-relaxed">
              We'll reply to <span className="text-ink font-medium break-all">{values.email}</span>
              {meetingAt && (
                <>
                  {' '}
                  to confirm {new Date(meetingAt).toLocaleString([], { dateStyle: 'full', timeStyle: 'short' })}
                </>
              )}
              .
            </p>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="px-5 sm:px-8 py-8 space-y-5"
          >
            {/* Honeypot: hidden from people, filled in by bots */}
            <p className="hidden">
              <label>
                Leave this empty
                <input name="bot-field" value={values['bot-field']} onChange={onChange} tabIndex={-1} autoComplete="off" />
              </label>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="firstName" className={LABEL}>
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  autoComplete="given-name"
                  placeholder="Jane"
                  value={values.firstName}
                  onChange={onChange}
                  className={FIELD}
                />
              </div>
              <div>
                <label htmlFor="lastName" className={LABEL}>
                  Last name <span className="normal-case tracking-normal">(optional)</span>
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Doe"
                  value={values.lastName}
                  onChange={onChange}
                  className={FIELD}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className={LABEL}>
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@company.com"
                value={values.email}
                onChange={onChange}
                className={FIELD}
              />
            </div>

            <div>
              <label htmlFor="message" className={LABEL}>
                Project brief
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="What do you want to build?"
                value={values.message}
                onChange={onChange}
                className={`${FIELD} resize-y`}
              />
            </div>

            <MeetingPicker value={meetingAt} onChange={setMeetingAt} />

            {status === 'error' && (
              <p role="alert" className="border-l-4 border-red bg-paper px-4 py-3 text-sm leading-relaxed">
                That didn't send. Please try again, or email{' '}
                <a href={`mailto:${contact}`} className="font-medium underline underline-offset-2 hover:text-red">
                  {contact}
                </a>
                .
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-red text-white font-mono text-xs font-semibold uppercase tracking-[0.14em] px-8 py-4 cursor-pointer bp-sweep disabled:opacity-60 disabled:cursor-wait"
            >
              {status === 'sending' ? 'Sending…' : 'Send work order'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>

      <aside className="lg:col-span-5">
        <h3 className="bp-label mb-4">After you send</h3>
        <ol className="border-t border-ink">
          {STAGES.map((stage, i) => (
            <li key={stage.label} className="flex items-baseline gap-4 py-4 border-b border-rule">
              <span className="font-mono text-xs text-red">0{i + 1}</span>
              <span className="font-display font-black uppercase text-2xl leading-none w-24 shrink-0">{stage.label}</span>
              <span className="text-sm text-muted">{stage.note}</span>
            </li>
          ))}
        </ol>

        <h3 className="bp-label mt-10 mb-3">Prefer email?</h3>
        <a
          href={`mailto:${contact}`}
          className="inline-flex items-center min-h-11 font-display font-black text-2xl sm:text-3xl leading-none break-all hover:text-red transition-colors"
        >
          {contact}
        </a>
        <p className="bp-label mt-4">HQ: {SITE.hq}</p>
      </aside>
      </div>
    </Station>
  );
}
