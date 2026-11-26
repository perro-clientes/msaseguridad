import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { logout } from "../(auth)/login/actions";

const roleLabel: Record<string, string> = {
  operario: "Operario",
  lider: "Líder de equipo",
  jefe_operaciones: "Jefe de Operaciones",
  rrhh: "Recursos Humanos",
  admin: "Administrador",
};

/** Inicio provisorio: confirma sesión, organización y rol. */
export default async function HomePage() {
  if (!hasSupabaseEnv) redirect("/login");
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  if (!claims?.claims) redirect("/login");

  const { data: memberships } = await supabase
    .from("members")
    .select("role, full_name, legajo, organization:organizations(name)")
    .eq("user_id", claims.claims.sub)
    .eq("active", true);

  return (
    <main className="mx-auto grid max-w-xl gap-4 p-4 pt-10">
      <Card>
        <CardHeader>
          <CardTitle>Hola{memberships?.[0]?.full_name ? `, ${memberships[0].full_name}` : ""}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 text-sm">
          <p className="text-muted-foreground">{claims.claims.email as string}</p>
          {memberships?.length ? (
            <ul className="grid gap-2">
              {memberships.map((m, i) => (
                <li key={i} className="rounded-lg border p-3">
                  <p className="font-medium">
                    {(m.organization as unknown as { name: string } | null)?.name}
                  </p>
                  <p className="text-muted-foreground">
                    {roleLabel[m.role] ?? m.role}
                    {m.legajo ? ` · Legajo ${m.legajo}` : ""}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>Tu usuario todavía no está asociado a ninguna organización.</p>
          )}
          <form action={logout}>
            <Button type="submit" variant="outline">
              Cerrar sesión
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
