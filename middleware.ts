import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define routes that require authentication
const protectedRoutes = ["/dashboard", "/profile", "/applications"];

// Define routes that should redirect authenticated users away
const authRoutes = ["/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if the current path is an auth route (like login)
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Get the session token from cookies
  const sessionToken = request.cookies.get("session_token");

  // If trying to access protected route without token, redirect to login
  if (isProtectedRoute && !sessionToken) {
    const loginUrl = new URL("/login", request.url);
    // Add redirect parameter to go back to original page after login
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If trying to access auth routes with valid token, redirect to dashboard
  if (isAuthRoute && sessionToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public|assets|icons|logo|partners|placeholders|svgs).*)",
  ],
};
