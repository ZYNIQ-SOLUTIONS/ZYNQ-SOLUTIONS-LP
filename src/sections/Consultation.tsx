import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { CornerMarks } from '../components/blueprint/CornerMarks';
import { Station } from '../components/blueprint/Station';
import { CONTACT_EMAILS, STATIONS } from '../content/site';
import { encodeForm } from '../lib/encodeForm';

const FORM_NAME = 'consultation';
const EMPTY = { firstName: '', lastName: '', email: '', message: '', 'bot-field': '' };

type Status = 'idle' | 'sending' | 'sent' | 'error';

const LABEL = 'bp-label block mb-2';
const FIELD =
  'w-full bg-paper border border-rule px-4 py-3 text-base text-ink placeholder:text-muted/60 focus:outline-none focus:border-red transition-colors';

export function Consultation() {
  const [values, setValues] = useState(EMPTY);
  const [status, setStatus] = useState<Status>('idle');
  const contact = CONTACT_EMAILS[0];

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeForm({ 'form-name': FORM_NAME, ...values }),
      });
      setStatus(response.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <Station
      {...STATIONS[4]}
      title="Get Free Consultation"
      intro="Ready to architect your custom synthetic brain? Connect with our specialist commanders and start engineering the future today."
    >
      <div className="relative max-w-3xl border border-ink bg-raised">
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
              We'll reply to <span className="text-ink font-medium break-all">{values.email}</span>.
            </p>
          </div>
        ) : (
          <form
            name={FORM_NAME}
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={onSubmit}
            className="px-5 sm:px-8 py-8 space-y-5"
          >
            <input type="hidden" name="form-name" value={FORM_NAME} />
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
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-red text-white font-mono text-xs font-semibold uppercase tracking-[0.14em] px-8 py-4 cursor-pointer hover:bg-ink hover:text-paper transition-colors disabled:opacity-60 disabled:cursor-wait"
            >
              {status === 'sending' ? 'Sending…' : 'Send work order'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </Station>
  );
}
