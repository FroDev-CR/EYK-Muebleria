import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_COOKIE = "eyk_admin";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) return NextResponse.next();

  // Login page always accessible
  if (pathname === "/admin/login") return NextResponse.next();

  const cookie = request.cookies.get(ADMIN_COOKIE);
  const secret = process.env.ADMIN_SECRET || "eyk-secret-2025";
  const password = process.env.ADMIN_PASSWORD || "admin1234";
  const expectedToken = Buffer.from(`${password}:${secret}`).toString("base64");

  if (!cookie || cookie.value !== expectedToken) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
