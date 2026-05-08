import { createClient as createSupabase, SupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase server-only con service_role key.
 * Bypassa RLS — usar solo en API routes admin protegidas.
 */
let cached: SupabaseClient | null = null;

export function createAdminClient(): SupabaseClient {
  if (cached) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Faltan envs: NEXT_PUBLIC_SUPABASE_URL y/o SUPABASE_SERVICE_ROLE_KEY",
    );
  }
  cached = createSupabase(url, key, { auth: { persistSession: false } });
  return cached;
}

export function isAdminConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}
