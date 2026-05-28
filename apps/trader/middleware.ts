import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/middleware-auth";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  // Skip Next internals + static assets.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|logo.png|robots.txt|sitemap.xml).*)",
  ],
};
