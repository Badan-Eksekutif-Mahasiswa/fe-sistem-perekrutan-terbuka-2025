import { NextResponse } from "next/server";

// Authentication is validated through the backend /auth/session endpoint on the client.
// The backend may live on a different subdomain, so checking auth cookies in the
// Next.js middleware can incorrectly reject a valid session.
export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|public|assets|icons|logo|partners|placeholders|svgs).*)",
  ],
};
