import { createBrowserClient } from "@supabase/ssr";

/**
 * Cliente Supabase. Soporta tanto el formato nuevo (publishable key,
 * `sb_publishable_...`) como el clásico (anon key, `eyJ...`).
 *
 * Las dos llaves son seguras del lado público — se llaman "publishable"
 * justamente porque están diseñadas para vivir en el frontend.
 */
function getKey(): string {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    ""
  );
}

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  return createBrowserClient(url, getKey());
}
