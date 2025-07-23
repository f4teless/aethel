
// No custom authentication logic is needed here. All authentication and session validation
// is handled by the Hono backend using Better Auth. This middleware is now a no-op.

import { NextResponse } from "next/server";

export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public|.*\\.).*)',
  ],
};
