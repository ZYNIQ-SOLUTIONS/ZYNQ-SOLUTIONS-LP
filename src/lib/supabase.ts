import { createClient } from '@supabase/supabase-js';

// Both values are public by design: row level security decides what each visitor can do.
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL ?? 'https://ricjbuuknlcrvgyunvxn.supabase.co',
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? 'sb_publishable_vWxZHo7wORbgrWO1t1pT4g_-c_9LO4h',
);
