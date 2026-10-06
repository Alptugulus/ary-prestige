import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const MAINTENANCE_MODE = false;

const ALLOWED_PREFIXES = [
  "/bakim",
  "/_next",
  "/favicon",
  "/images",
  "/models",
  "/robots.txt",
  "/sitemap.xml",
  "/api",
];

export function middleware(request: NextRequest) {
  if (!MAINTENANCE_MODE) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (ALLOWED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/bakim";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
