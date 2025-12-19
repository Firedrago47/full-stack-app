import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt } from "@/lib/auth/jwt";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("session")?.value;
  const url = req.nextUrl.pathname;

  // Public routes
  if (url.startsWith("/login") || url.startsWith("/register")) {
    if (!session) return NextResponse.next();

    // logged-in users should be redirected to dashboard
    const payload = verifyJwt(session);
    if (payload) {
      return NextResponse.redirect(new URL(`/dashboard/${payload.role.toLowerCase()}`, req.url));
    }
    return NextResponse.next();
  }

  // Protect all /dashboard routes
  if (url.startsWith("/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const payload = verifyJwt(session);
    if (!payload) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const rolePath = url.split("/")[2]; 
    if (payload.role.toLowerCase() !== rolePath) {
      return NextResponse.redirect(
        new URL(`/dashboard/${payload.role.toLowerCase()}`, req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
