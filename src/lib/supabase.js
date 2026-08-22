import { createClient } from '@supabase/supabase-js';

// Default project fallback credentials for seamless cloud deployments (Netlify/Vercel)
const DEFAULT_SUPABASE_URL = 'https://hdclioixlwspatqhhfqs.supabase.co';
const DEFAULT_SUPABASE_KEY = 'sb_publishable_tck3zgCyJH2uqxITtIkDCg_DjURhh-Q';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
  DEFAULT_SUPABASE_URL;

const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  DEFAULT_SUPABASE_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabasePublishableKey);

export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey
);
