import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Ingresar" };

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { next } = await searchParams;
  return (
    <main className="grid min-h-dvh place-items-center bg-muted p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>MSA Operaciones</CardTitle>
          <CardDescription>Ingresá con tu email corporativo.</CardDescription>
        </CardHeader>
        <CardContent>
          {hasSupabaseEnv ? (
            <LoginForm next={typeof next === "string" ? next : undefined} />
          ) : (
            <p className="text-sm text-muted-foreground">
              Falta configurar Supabase: copiá <code>.env.example</code> a <code>.env.local</code> y
              completá las claves del proyecto.
            </p>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
