import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_COOKIE = "eyk_admin";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function POST(request: Request) {
  const { password } = await request.json();

  const correctPassword = process.env.ADMIN_PASSWORD || "admin1234";
  const secret = process.env.ADMIN_SECRET || "eyk-secret-2025";

  if (password !== correctPassword) {
    return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
  }

  const token = Buffer.from(`${password}:${secret}`).toString("base64");
  const cookieStore = await cookies();

  cookieStore.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE,
    path: "/",
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
  return NextResponse.json({ ok: true });
}
