"use client";

import Link from "next/link";
import { useActionState } from "react";
import { CheckCircle2 } from "lucide-react";
import { sendContact, type ContactState } from "@/app/[lang]/contacto/actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/content/es";

const initial: ContactState = { status: "idle" };

export function ContactForm({
  t,
  privacyHref,
}: {
  t: Dictionary["contact"]["form"];
  privacyHref: string;
}) {
  const [state, action, pending] = useActionState(sendContact, initial);

  if (state.status === "success") {
    return (
      <div role="status" className="flex items-start gap-3 rounded-xl bg-white p-6">
        <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-accent" />
        <p className="text-lg">{t.success}</p>
      </div>
    );
  }

  const err = state.fieldErrors ?? {};
  const v = state.values ?? {};
  const message = (key: keyof typeof err) =>
    err[key] === "email" ? t.invalidEmail : err[key] ? t.required : undefined;

  return (
    <form action={action} noValidate className="grid gap-4 rounded-xl bg-white p-5 sm:grid-cols-2 md:p-8">
      <Field name="name" label={t.name} required autoComplete="name" defaultValue={v.name} error={message("name")} />
      <Field name="company" label={t.company} autoComplete="organization" defaultValue={v.company} />
      <Field
        name="email"
        type="email"
        label={t.email}
        required
        autoComplete="email"
        defaultValue={v.email}
        error={message("email")}
      />
      <Field name="phone" type="tel" label={t.phone} autoComplete="tel" defaultValue={v.phone} />
      <Field
        name="message"
        label={t.message}
        required
        textarea
        placeholder={t.messagePlaceholder}
        defaultValue={v.message}
        error={message("message")}
        className="sm:col-span-2"
      />

      {/* Honeypot anti-spam */}
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink/55">
          {t.privacy}{" "}
          <Link href={privacyHref} className="underline hover:text-ink">
            {t.privacyLink}
          </Link>
          .
        </p>
        <Button type="submit" disabled={pending} arrow={!pending}>
          {pending ? t.sending : t.submit}
        </Button>
      </div>

      <p aria-live="polite" className="text-sm text-red-700 sm:col-span-2 empty:hidden">
        {state.status === "error" ? t.error : state.status === "invalid" ? t.invalid : ""}
      </p>
    </form>
  );
}

function Field({
  name,
  label,
  error,
  textarea,
  className,
  required,
  ...props
}: {
  name: string;
  label: string;
  error?: string;
  textarea?: boolean;
  className?: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  defaultValue?: string;
}) {
  const id = `f-${name}`;
  const input = cn(
    "w-full rounded-md border bg-paper/60 px-3 py-2.5 text-base outline-none transition-colors placeholder:text-ink/35 focus:border-ink focus:bg-white",
    error ? "border-red-600" : "border-transparent",
  );
  const shared = {
    id,
    name,
    required,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-err` : undefined,
    ...props,
  };
  return (
    <div className={className}>
      <label htmlFor={id} className="label mb-1.5 block text-ink/60">
        {label}
        {required && " *"}
      </label>
      {textarea ? <textarea rows={5} className={input} {...shared} /> : <input className={input} {...shared} />}
      {error && (
        <p id={`${id}-err`} className="mt-1 text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
