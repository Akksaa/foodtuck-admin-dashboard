import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/signup" || path === '/';
  const isProtectedcPath = path === "/dashboard" || path === "admin/info";

  const role = request.cookies.get("role")?.value || "";
  const uid = request.cookies.get("user_id")?.value || "";

  if (isPublicPath && role == "admin" && uid) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  if ( isProtectedcPath || isPublicPath && uid && role == "user") {
    return NextResponse.redirect(new URL("/notAdmin", request.nextUrl));
  }
}

export const config = {
  matcher: [
    "/",
    "/signup",
    "/admin/info",
    "/dashboard",
    "/dashboard/orders",
    "/dashboard/products",
    "/dashboard/customers",
  ],
};
