export const STAGES = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'] as const;
export type InquiryStatus = (typeof STAGES)[number];

// Stages where the lead is still being worked, as opposed to decided.
export const OPEN_STAGES: InquiryStatus[] = ['new', 'contacted', 'qualified', 'proposal'];
export const CURRENCY = 'AED';

export interface Inquiry {
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
  deal_value: number | null;
  is_spam: boolean;
  status: InquiryStatus;
}

export const STAGE_LABEL: Record<InquiryStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  proposal: 'Proposal sent',
  won: 'Won',
  lost: 'Lost',
};

export const money = (n: number) => `${CURRENCY} ${Math.round(n).toLocaleString('en')}`;
