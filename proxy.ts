import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { decrypt, updateSession } from "./lib/session";

// 1. Specify protected and public routes
const publicRoutes = ["/", "/login"];
const protectedRoutes = "/v1";

export async function proxy(request: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = request.nextUrl.pathname;
  const isProtectedRoute = path.startsWith(protectedRoutes);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // 5. Redirect to /dashboard if the user is authenticated
  await updateSession();

  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL("/v1/dashboard", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
