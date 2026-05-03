/**
 * Sube los productos del JSON local a Supabase.
 * Uso:
 *   1. Configura .env.local con SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY
 *   2. npx tsx scripts/seed.ts
 *
 * NOTA: Requiere service_role key para escribir saltando RLS.
 */
import { createClient } from "@supabase/supabase-js";
import productsJson from "../src/data/products.json" with { type: "json" };

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Falta SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en el ambiente.");
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false },
});

async function main() {
  const products = productsJson as Array<Record<string, unknown>>;
  console.log(`Subiendo ${products.length} productos...`);

  // Upsert por id
  const chunkSize = 50;
  for (let i = 0; i < products.length; i += chunkSize) {
    const chunk = products.slice(i, i + chunkSize);
    const { error } = await supabase.from("products").upsert(chunk);
    if (error) {
      console.error("Error en chunk", i, error);
      process.exit(1);
    }
    console.log(`  ${Math.min(i + chunkSize, products.length)} / ${products.length}`);
  }

  console.log("✓ Listo.");
}

main();
