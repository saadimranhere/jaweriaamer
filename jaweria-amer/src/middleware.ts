import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionSecret } from "@/lib/session-secret";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const session = request.cookies.get("ja_admin_session")?.value;
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    try {
      const decoded = Buffer.from(session, "base64").toString("utf-8");
      const secret = getSessionSecret();
      if (!decoded.includes(secret)) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Block search engines from /admin
  if (pathname.startsWith("/admin")) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
