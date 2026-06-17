import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/middleware-auth";

// Branded module subdomains → the module's home route. One portal app serves
// all of them; this only maps each subdomain's bare root ("/") to the right
// module. Every other host (zippy-piroshki.netlify.app, localhost, previews)
// and every deeper path falls through to the normal auth middleware unchanged.
const SUBDOMAIN_HOME: Record<string, string> = {
  "copy.gio4x.com": "/copy/discover",
  "pamm.gio4x.com": "/pamm",
  "mam.gio4x.com": "/pamm",
};

export async function middleware(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").split(":")[0].toLowerCase();
  const home = SUBDOMAIN_HOME[host];
  if (home && request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = home;
    return NextResponse.redirect(url);
  }
  return await updateSession(request);
}

export const config = {
  // Skip Next internals + static assets.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|logo.png|robots.txt|sitemap.xml).*)",
  ],
};
