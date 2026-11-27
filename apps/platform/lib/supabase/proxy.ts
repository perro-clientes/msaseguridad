import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { hasSupabaseEnv, supabaseKey, supabaseUrl } from "./env";

/** Rutas a las que se entra sin sesión. `/design` (catálogo) solo en desarrollo. */
const publicPaths = [
  "/login",
  "/recuperar",
  ...(process.env.NODE_ENV === "production" ? [] : ["/design"]),
];

/**
 * Refresca la sesión de Supabase en cada request y manda al login a quien no la tenga.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });
  if (!hasSupabaseEnv) return response;

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value));
      },
    },
  });

  // No poner código entre createServerClient y getClaims: puede cerrar sesiones al azar.
  const { data } = await supabase.auth.getClaims();
  const isPublic = publicPaths.some((p) => request.nextUrl.pathname.startsWith(p));

  if (!data?.claims && !isPublic) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return response;
}
