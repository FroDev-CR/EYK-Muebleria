import { NextResponse } from "next/server";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const CONTENT_PATH = join(process.cwd(), "src", "data", "site-content.json");

export async function GET() {
  try {
    if (!existsSync(CONTENT_PATH)) return NextResponse.json({});
    const data = JSON.parse(readFileSync(CONTENT_PATH, "utf-8"));
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({});
  }
}
