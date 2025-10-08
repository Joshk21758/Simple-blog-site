import { authUser } from "@/lib/authUser";
import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/create"];
const publicRoutes = ["/login", "/register"];

export default async function middleware(req) {
  const path = req.nextUrl.pathname;
  const isProtected =
    protectedRoutes.includes(path) || path.startsWith("/postz/edit");
  const isPublic = publicRoutes.includes(path);

  const user = await authUser();
  const userId = user?.userId;
  if (isProtected && !userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublic && userId) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}
