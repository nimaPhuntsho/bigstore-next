import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import cookie from "cookie";
import { updateSession } from "./app/util/supabase/middleware";

// Helper function to set CORS headers
const setCorsHeaders = (origin: string) => {
  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", "*"); // Allow specific origin
  headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Custom-Header"
  );
  headers.set("Access-Control-Allow-Credentials", "true"); // Allow credentials (optional)
  return headers;
};

export async function middleware(req: NextRequest, res: NextResponse) {
  const origin = req.headers.get("Origin");

  if (!origin) {
    return NextResponse.next();
  }

  // Handle OPTIONS preflight requests
  if (req.method === "OPTIONS") {
    const headers = setCorsHeaders(origin); // Set CORS headers
    return new NextResponse(null, {
      status: 200,
      headers,
    });
  }

  // For other requests, continue with the CORS headers
  const response = NextResponse.next();
  response.headers.append("Access-Control-Allow-Origin", origin);
  response.headers.append(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH"
  );
  response.headers.append(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Custom-Header"
  );
  response.headers.append("Access-Control-Allow-Credentials", "true");
  return response;

  await updateSession(req);

  // If the Origin is not allowed, return a 403 Forbidden response
  return new NextResponse("CORS error: Origin not allowed", {
    status: 403,
  });
}
export const config = {
  matcher: [
    "/api/:path*",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ], // Match exact paths for /api and /protected
};
