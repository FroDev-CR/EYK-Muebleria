import { NextResponse } from "next/server";
import { createAdminClient, isAdminConfigured } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_CACHE = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
};

export async function GET() {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { _debug: "supabase no configurado" },
      { headers: NO_CACHE },
    );
  }
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("site_content")
      .select("key, value");
    if (error) {
      return NextResponse.json(
        { _debug: `error: ${error.message}` },
        { headers: NO_CACHE },
      );
    }
    const out: Record<string, string> = {};
    for (const row of data ?? []) {
      out[row.key as string] = row.value as string;
    }
    return NextResponse.json(out, { headers: NO_CACHE });
  } catch (e) {
    return NextResponse.json(
      { _debug: `exception: ${String(e)}` },
      { headers: NO_CACHE },
    );
  }
}
