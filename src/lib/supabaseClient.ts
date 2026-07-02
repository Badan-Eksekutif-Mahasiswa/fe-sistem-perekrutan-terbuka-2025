import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseBucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "spt-media";
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && supabaseBucket);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null;
