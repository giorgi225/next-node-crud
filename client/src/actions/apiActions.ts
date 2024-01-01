"use server";

import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
const protectedRoutes = ["/profile", "/dashboard"];

export async function handleUndefinedUserData(currentPathname: string) {
  cookies().delete("token");
  cookies().delete("refresh-token");
  const protectedRoutes = ["/profile", "/dashboard"];
  const onProtectedRoute = protectedRoutes.some((route: string) => {
    return currentPathname.startsWith(route);
  });

  if (onProtectedRoute) {
    redirect("/auth/login");
  }
}
