import { NextRequest, NextResponse } from "next/server";
import apiUtils from "./utils/api.utils";
import { useUserContext } from "./providers/UserProvider";

const protectedRoutes = ["/profile", "/dashboard"];
const authRoutes = "/auth";
const publicRoutes = ["/"];

export default function middleware(req: NextRequest, res: NextResponse) {
  const isLoggedIn =
    req.cookies.get("token") && req.cookies.get("refresh-token");
  const { pathname } = req.nextUrl;

  const onGuestRoute = pathname.startsWith(authRoutes);
  const onProtectedRoute = protectedRoutes.some((route: string) => {
    return pathname.startsWith(route);
  });
  if (isLoggedIn && onGuestRoute) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  } else if (!isLoggedIn && onProtectedRoute) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl.origin));
  } else {
    return NextResponse.next();
  }
}