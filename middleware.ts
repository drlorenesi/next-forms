import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

const allowedPaths = [
  "/login",
  "/registro",
  "/solicitar",
  "/confirmar",
  "/error",
  "/exito-registro",
  "/exito-verificacion",
];

export async function middleware(request: NextRequest) {
  return await updateSession(request, allowedPaths);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|manifest.json|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
