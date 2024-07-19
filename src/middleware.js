import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (pathname == "/menu") {
    console.log("tes");
    return res;
  }

  if (!session && pathname != "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  } else if (session && pathname == "/login") {
    return NextResponse.redirect(new URL("/resto", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
