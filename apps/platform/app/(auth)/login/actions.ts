"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({
  email: z.email("Ingresá un email válido."),
  password: z.string().min(1, "Ingresá tu contraseña."),
  next: z.string().optional(),
});

export type LoginState = { error?: string; email?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  const email = String(formData.get("email") ?? "");
  if (!parsed.success) return { error: parsed.error.issues[0].message, email };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });
  // Mismo mensaje para email inexistente y clave incorrecta (no revelar qué cuentas existen).
  if (error) return { error: "Email o contraseña incorrectos.", email };

  const next = parsed.data.next;
  redirect(next && next.startsWith("/") && !next.startsWith("//") ? next : "/");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
