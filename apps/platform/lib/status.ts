/**
 * Estados operativos (ver docs/platform/modelo.md §3) con su etiqueta y el
 * tono visual del chip. Un solo lugar para que tareas y planillas se vean igual
 * en la app del operario y en el panel.
 */
export type Tone = "secondary" | "outline" | "info" | "brand" | "success" | "warning" | "destructive";

export const taskStatus = {
  pendiente: { label: "Pendiente", tone: "outline" },
  en_curso: { label: "En curso", tone: "info" },
  completada: { label: "Completada", tone: "success" },
  incompleta: { label: "Incompleta", tone: "warning" },
  cancelada: { label: "Cancelada", tone: "secondary" },
} as const satisfies Record<string, { label: string; tone: Tone }>;

export const formStatus = {
  pendiente: { label: "Pendiente", tone: "outline" },
  en_curso: { label: "En curso", tone: "info" },
  enviada: { label: "Enviada", tone: "brand" },
  validada_lider: { label: "Validada por Líder", tone: "warning" },
  aprobada: { label: "Aprobada", tone: "success" },
  rechazada: { label: "Rechazada", tone: "destructive" },
} as const satisfies Record<string, { label: string; tone: Tone }>;

export const flightStatus = {
  programado: { label: "Programado", tone: "outline" },
  demorado: { label: "Demorado", tone: "warning" },
  adelantado: { label: "Adelantado", tone: "info" },
  cancelado: { label: "Cancelado", tone: "destructive" },
} as const satisfies Record<string, { label: string; tone: Tone }>;

export type TaskStatus = keyof typeof taskStatus;
export type FormStatus = keyof typeof formStatus;
export type FlightStatus = keyof typeof flightStatus;
