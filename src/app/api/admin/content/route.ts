import { NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const CONTENT_PATH = join(process.cwd(), "src", "data", "site-content.json");

function readContent(): Record<string, string> {
  if (!existsSync(CONTENT_PATH)) return {};
  try {
    return JSON.parse(readFileSync(CONTENT_PATH, "utf-8"));
  } catch {
    return {};
  }
}

export async function GET() {
  return NextResponse.json(readContent());
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json() as Record<string, string>;
    const current = readContent();
    const updated = { ...current, ...body };
    // Remove empty strings (revert to default)
    for (const key of Object.keys(updated)) {
      if (updated[key] === "") delete updated[key];
    }
    writeFileSync(CONTENT_PATH, JSON.stringify(updated, null, 2), "utf-8");
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
