import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { staffSessionCookie, verifySessionToken } from "@/lib/auth/session";

const PUBLIC_PORTAL_PATHS = new Set(["/portal", "/portal/login"]);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/portal")) {
    return NextResponse.next();
  }

  if (PUBLIC_PORTAL_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(staffSessionCookie.name)?.value;
  const session = await verifySessionToken(token);

  if (!session) {
    const loginUrl = new URL("/portal/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*"],
};
