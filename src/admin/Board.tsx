import { Mail } from 'lucide-react';
import { CURRENCY, OPEN_STAGES, STAGES, STAGE_LABEL, money } from './types';
import type { Inquiry, InquiryStatus } from './types';
import { BTN, FIELD, replyLink } from './ui';

interface Props {
  rows: Inquiry[];
  patch: (id: string, changes: Partial<Inquiry>) => void;
}

const sum = (rows: Inquiry[]) => rows.reduce((t, r) => t + (r.deal_value ?? 0), 0);

export function Board({ rows, patch }: Props) {
  const open = rows.filter((r) => OPEN_STAGES.includes(r.status));
  const won = rows.filter((r) => r.status === 'won');

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 border-l border-t border-ink">
        {[
          ['Open pipeline', money(sum(open)), `${open.length} leads`],
          ['Won', money(sum(won)), `${won.length} deals`],
          ['Lost', `${rows.filter((r) => r.status === 'lost').length}`, 'leads'],
        ].map(([label, value, note]) => (
          <div key={label} className="p-4 border-r border-b border-ink bg-raised">
            <p className="bp-label">{label}</p>
            <p className="font-display font-black text-3xl leading-none mt-2">{value}</p>
            <p className="bp-label mt-1 normal-case tracking-normal">{note}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 -mx-5 sm:-mx-8 px-5 sm:px-8 overflow-x-auto pb-4">
        <div className="grid grid-flow-col auto-cols-[16.5rem] gap-3 min-w-max">
          {STAGES.map((stage) => {
            const cards = rows.filter((r) => r.status === stage);
            return (
              <section key={stage} aria-label={STAGE_LABEL[stage]} className="border border-ink bg-raised">
                <header className="px-3 py-2.5 border-b border-ink flex items-baseline justify-between gap-2">
                  <h2 className={`font-mono text-[11px] font-semibold uppercase tracking-[0.14em] ${stage === 'new' ? 'text-red' : ''}`}>
                    {STAGE_LABEL[stage]} <span className="text-muted">{cards.length}</span>
                  </h2>
                  <span className="bp-label normal-case tracking-normal">{sum(cards) > 0 && money(sum(cards))}</span>
                </header>
                <ul className="p-2 space-y-2 min-h-24">
                  {cards.map((r) => (
                    <li key={r.id} className="border border-rule bg-paper p-3">
                      <p className="font-display font-black uppercase text-lg leading-none">
                        {r.first_name} {r.last_name}
                      </p>
                      <a href={`mailto:${r.email}`} className="mt-1 block text-xs break-all text-muted hover:text-red">
                        {r.email}
                      </a>
                      {r.assignee && <p className="bp-label mt-2">→ {r.assignee}</p>}
                      <label className="bp-label block mt-3 mb-1" htmlFor={`v-${r.id}`}>
                        Deal value ({CURRENCY})
                      </label>
                      <input
                        id={`v-${r.id}`}
                        type="number"
                        min={0}
                        step="any"
                        inputMode="decimal"
                        defaultValue={r.deal_value ?? ''}
                        onBlur={(e) => {
                          const value = e.target.value === '' ? null : Number(e.target.value);
                          if (value !== r.deal_value && (value === null || (Number.isFinite(value) && value >= 0)))
                            patch(r.id, { deal_value: value });
                        }}
                        className={`${FIELD} !py-1.5 text-sm`}
                      />
                      <div className="mt-2 flex gap-2">
                        <select
                          value={r.status}
                          onChange={(e) => patch(r.id, { status: e.target.value as InquiryStatus })}
                          aria-label={`Move ${r.first_name} to another stage`}
                          className={`${FIELD} !py-1.5 text-xs flex-1`}
                        >
                          {STAGES.map((s) => (
                            <option key={s} value={s}>
                              {STAGE_LABEL[s]}
                            </option>
                          ))}
                        </select>
                        <a href={replyLink(r)} aria-label={`Reply to ${r.first_name}`} className={`${BTN} !px-3 border border-ink`}>
                          <Mail className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
