import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// export async function middleware(request: NextRequest) {
//   const token = await getToken({ req: request });

//   if (!token) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   const currentTime = Math.floor(Date.now() / 1000);
//   if (token.exp && token.exp < currentTime) {
//     const response = NextResponse.redirect(new URL("/login", request.url));

//     response.cookies.delete("next-auth.session-token");
//     response.cookies.delete("__Secure-next-auth.session-token");

//     return response;
//   }

//   return NextResponse.next();
// }

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
