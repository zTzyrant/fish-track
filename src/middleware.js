export function middleware(request) {
  const token = request.cookies.get("accessToken")?.value;

  if (!token && request.nextUrl.pathname.startsWith("/edit")) {
    return Response.redirect(new URL("/login", request.url));
  }

  if (!token && request.nextUrl.pathname.startsWith("/add")) {
    return Response.redirect(new URL("/login", request.url));
  }

  if (token && request.nextUrl.pathname.startsWith("/login")) {
    return Response.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/:path*"],
};
