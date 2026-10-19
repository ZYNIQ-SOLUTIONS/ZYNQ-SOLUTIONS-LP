import { LogoIcon } from '../components/LogoIcon';
import { ZyniqTextLogo } from '../components/ZyniqTextLogo';

export function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <LogoIcon className="w-8 h-8" />
      <ZyniqTextLogo className="h-4 w-auto" />
      <span className="font-display font-black text-xl leading-none tracking-wide text-red translate-y-px">STUDIO</span>
      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted translate-y-px">Admin</span>
    </div>
  );
}

export const FIELD =
  'w-full bg-paper border border-rule px-4 py-3 text-base text-ink focus:outline-none focus:border-red transition-colors';
export const BTN =
  'inline-flex items-center justify-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] px-4 min-h-10 cursor-pointer disabled:opacity-60';

export const when = (iso: string) => new Date(iso).toLocaleString([], { dateStyle: 'full', timeStyle: 'short' });

export function replyLink(r: { first_name: string; email: string; meeting_at: string | null }) {
  const subject = 'Your consultation request with ZYNIQ Studio';
  const slot = r.meeting_at ? ` We have your preferred time down as ${when(r.meeting_at)}.` : '';
  const body = `Hi ${r.first_name},\n\nThank you for reaching out to ZYNIQ Studio.${slot}\n\nBest regards,\nZYNIQ Studio`;
  return `mailto:${r.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
