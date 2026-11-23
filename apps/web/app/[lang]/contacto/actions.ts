"use server";

import { z } from "zod";
import { Resend } from "resend";

export type ContactState = {
  status: "idle" | "success" | "error" | "invalid";
  fieldErrors?: Partial<Record<"name" | "email" | "message", "required" | "email">>;
  values?: Record<string, string>;
};

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  company: z.string().trim().max(120).optional(),
  email: z.email().max(200),
  phone: z.string().trim().max(40).optional(),
  message: z.string().trim().min(1).max(4000),
});

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const raw = Object.fromEntries(
    ["name", "company", "email", "phone", "message"].map((k) => [k, String(formData.get(k) ?? "")]),
  );

  // Honeypot: los bots completan el campo oculto. Respondemos OK sin enviar nada.
  if (String(formData.get("website") ?? "")) return { status: "success" };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (key === "name" || key === "message") fieldErrors[key] = "required";
      if (key === "email") fieldErrors.email = raw.email ? "email" : "required";
    }
    return { status: "invalid", fieldErrors, values: raw };
  }

  const data = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contacto] Resend sin configurar; mensaje no enviado:", data);
      return { status: "success" };
    }
    console.error("[contacto] Faltan RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL");
    return { status: "error", values: raw };
  }

  const rows: [string, string | undefined][] = [
    ["Nombre", data.name],
    ["Empresa", data.company],
    ["Email", data.email],
    ["Teléfono", data.phone],
  ];

  const { error } = await new Resend(apiKey).emails.send({
    from,
    to: to.split(",").map((s) => s.trim()),
    replyTo: data.email,
    subject: `Nueva consulta web — ${data.name}${data.company ? ` (${data.company})` : ""}`,
    text: [...rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`), "", data.message].join("\n"),
    html: `<table>${rows
      .filter(([, v]) => v)
      .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escape(v!)}</td></tr>`)
      .join("")}</table><p style="white-space:pre-wrap">${escape(data.message)}</p>`,
  });

  if (error) {
    console.error("[contacto] Resend error:", error);
    return { status: "error", values: raw };
  }
  return { status: "success" };
}
