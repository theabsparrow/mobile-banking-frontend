import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  const { pathname } = request.nextUrl;

  // 1. Allow public pages, api routes, and static assets
  if (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/_next") ||
    pathname.includes("favicon.ico") ||
    pathname.startsWith("/api")
  ) {
    // If user is already logged in, redirect them away from login/register pages
    if (session && (pathname === "/login" || pathname === "/register")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // 2. Protect all other routes
  // if (!session) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  return NextResponse.next();
}

// Config to specify matching routes
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
