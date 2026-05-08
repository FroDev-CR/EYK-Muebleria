import { NextResponse } from "next/server";
import { createAdminClient, isAdminConfigured } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const TABLE = "site_content";

export async function GET() {
  if (!isAdminConfigured()) return NextResponse.json({});
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase.from(TABLE).select("key, value");
    if (error) {
      console.error("site_content GET:", error);
      return NextResponse.json({});
    }
    const out: Record<string, string> = {};
    for (const row of data ?? []) {
      out[row.key as string] = row.value as string;
    }
    return NextResponse.json(out);
  } catch (e) {
    console.error("site_content GET exception:", e);
    return NextResponse.json({});
  }
}

export async function PATCH(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "Supabase no configurado" },
      { status: 500 },
    );
  }
  try {
    const body = (await request.json()) as Record<string, string>;
    const supabase = createAdminClient();

    const upserts: { key: string; value: string }[] = [];
    const deletes: string[] = [];
    for (const [k, v] of Object.entries(body)) {
      if (v === "" || v == null) deletes.push(k);
      else upserts.push({ key: k, value: v });
    }

    if (upserts.length) {
      const { error } = await supabase
        .from(TABLE)
        .upsert(upserts, { onConflict: "key" });
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }
    if (deletes.length) {
      const { error } = await supabase.from(TABLE).delete().in("key", deletes);
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
