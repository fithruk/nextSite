import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Создаем middleware
// Определите свои приватные маршруты
const privateRoutes = ["/private", "/dashboard", "/settings"];

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log(`Request pathname: ${pathname}`); // Логирование текущего пути

  // Пропуск маршрутов API
  if (pathname.includes("/api/")) {
    console.log("Skipping API route");
    return NextResponse.next();
  }

  // Проверка на приватные маршруты
  if (privateRoutes.some((route) => pathname.includes(route))) {
    const token = await getToken({ req: request });
    console.log(token);

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      console.log(`${token.name} is authenticated`);
    }
  }

  // Обрабатываем локализацию для всех маршрутов
  return intlMiddleware(request);
}
export const config = {
  // Match only internationalized pathnames
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
