import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/card", "/card/new"],
};

export function middleware(req: NextRequest) {
  // Fast path: if no sb-access-token cookie, bounce to login
  const hasToken = req.cookies.get("sb-access-token");
  if (!hasToken) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirectedFrom", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
