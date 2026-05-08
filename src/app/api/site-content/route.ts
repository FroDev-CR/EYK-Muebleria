import { NextResponse } from "next/server";
import { createAdminClient, isAdminConfigured } from "@/lib/supabase-admin";

export async function GET() {
  if (!isAdminConfigured()) return NextResponse.json({});
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("site_content")
      .select("key, value");
    if (error) return NextResponse.json({});
    const out: Record<string, string> = {};
    for (const row of data ?? []) {
      out[row.key as string] = row.value as string;
    }
    return NextResponse.json(out);
  } catch {
    return NextResponse.json({});
  }
}
