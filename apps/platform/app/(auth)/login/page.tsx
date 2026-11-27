import type { Metadata } from "next";
import Image from "next/image";
import { Logo } from "@/components/brand/logo";
import { Eyebrow, TwoTone } from "@/components/brand/typography";
import { photos } from "@/lib/images";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Ingresar" };

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { next } = await searchParams;
  return (
    <main className="grid min-h-dvh lg:grid-cols-2">
      {/* Panel de marca (solo desktop): foto + logo, como el hero del sitio. */}
      <section className="relative isolate hidden flex-col justify-between overflow-hidden bg-night p-10 text-white lg:flex">
        <Image src={photos.apron} alt="" fill priority sizes="50vw" className="-z-10 object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />
        <Logo tone="light" className="h-9" priority />
        <div className="grid gap-4">
          <Eyebrow inverse>Plataforma operativa</Eyebrow>
          <TwoTone inverse size="display" a="Cada vuelo," b="bajo control" as="p" className="max-w-lg" />
        </div>
      </section>

      <section className="flex flex-col justify-center gap-10 p-6 sm:p-10">
        <Logo className="h-8 lg:hidden" priority />
        <div className="mx-auto grid w-full max-w-sm gap-8">
          <div className="grid gap-3">
            <Eyebrow>MSA Operaciones</Eyebrow>
            <TwoTone a="Ingresá" b="con tu cuenta" />
          </div>
          {hasSupabaseEnv ? (
            <LoginForm next={typeof next === "string" ? next : undefined} />
          ) : (
            <p className="text-sm text-muted-foreground">
              Falta configurar Supabase: copiá <code>.env.example</code> a <code>.env.local</code> y
              completá las claves del proyecto.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
