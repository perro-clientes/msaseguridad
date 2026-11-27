import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, CircleAlert, CircleCheck, Info, Plane, TriangleAlert } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { StatusBadge } from "@/components/brand/status-badge";
import { Eyebrow, PageHeader, Stat, TwoTone } from "@/components/brand/typography";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { formStatus, taskStatus, flightStatus } from "@/lib/status";
import { OverlaysDemo, SelectDemo, TabsDemo } from "./interactive";

export const metadata: Metadata = { title: "Design system" };

/** Catálogo del design system. Solo existe en desarrollo. */
export default function DesignPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <main className="mx-auto grid max-w-6xl gap-16 px-4 py-10 md:px-8 md:py-16">
      <PageHeader
        eyebrow="Design system"
        title="MSA Operaciones,"
        titleMuted="mismo lenguaje que el sitio"
        description="Tokens y componentes de la plataforma: shadcn + Tailwind con el estilo del template Cargo+. Todo lo que se ve acá se usa en las pantallas reales."
        actions={
          <>
            <Button variant="outline">Secundaria</Button>
            <Button>
              Acción principal
              <ArrowUpRight data-icon="inline-end" aria-hidden />
            </Button>
          </>
        }
      />

      <Section title="Color">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {[
            ["Paper", "bg-paper", "fondo"],
            ["Paper 2", "bg-paper-2", "muted"],
            ["Panel", "bg-panel", "secondary"],
            ["Ink", "bg-ink", "primary"],
            ["Brand", "bg-brand", "marca de la org"],
            ["Brand soft", "bg-brand-soft", "acento claro"],
            ["Card", "bg-card", "superficies"],
            ["Success", "bg-success", "aprobada"],
            ["Warning", "bg-warning", "demorado"],
            ["Destructive", "bg-destructive", "rechazada"],
            ["Faint", "bg-faint", "texto atenuado"],
            ["Night", "bg-night", "fotos / hero"],
          ].map(([name, cls, use]) => (
            <div key={name} className="grid gap-2">
              <div className={`h-16 rounded-md border ${cls}`} />
              <div>
                <p className="text-sm font-medium">{name}</p>
                <p className="label text-muted-foreground">{use}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Tipografía">
        <div className="grid gap-6">
          <TwoTone as="p" size="display" a="Cada vuelo," b="bajo control" />
          <TwoTone as="p" a="Título de pantalla," b="segunda parte atenuada" />
          <p className="text-lg">Texto destacado — Geist 18px.</p>
          <p className="max-w-2xl text-muted-foreground">
            Texto de cuerpo — Geist 16px. El operario completa la planilla desde el celular; el Líder la valida y
            el Jefe de Operaciones la aprueba.
          </p>
          <p className="label text-muted-foreground">Etiqueta del sistema — Geist Mono 11px mayúscula</p>
          <Eyebrow>Antetítulo con +</Eyebrow>
          <div className="flex flex-wrap gap-8">
            <Logo className="h-8" />
            <div className="rounded-md bg-ink px-4 py-3">
              <Logo tone="light" className="h-8" />
            </div>
          </div>
        </div>
      </Section>

      <Section title="Botones">
        <div className="grid gap-6">
          <div className="flex flex-wrap items-center gap-2">
            <Button>Primario</Button>
            <Button variant="brand">Marca</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secundario</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Rechazar</Button>
            <Button variant="link">Link</Button>
            <Button disabled>Deshabilitado</Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="xs">XS</Button>
            <Button size="sm">Chico</Button>
            <Button>Normal</Button>
            <Button size="lg">
              Grande (operario)
              <ArrowUpRight data-icon="inline-end" aria-hidden />
            </Button>
            <Button size="icon" variant="outline" aria-label="Vuelo">
              <Plane />
            </Button>
          </div>
        </div>
      </Section>

      <Section title="Formularios">
        <Card>
          <CardContent className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="vuelo">Vuelo</Label>
              <Input id="vuelo" placeholder="QR 1325" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="matricula">Matrícula</Label>
              <Input id="matricula" defaultValue="A7-BEL" />
            </div>
            <SelectDemo />
            <div className="grid gap-2">
              <Label htmlFor="error">Con error</Label>
              <Input id="error" aria-invalid defaultValue="12/34" />
              <p className="text-xs text-destructive">Formato de hora inválido.</p>
            </div>
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="obs">Observaciones</Label>
              <Textarea id="obs" placeholder="Novedades de la tarea…" />
            </div>
            <label className="flex items-center gap-3 text-sm">
              <Checkbox defaultChecked /> Cierre del bingo sin faltante
            </label>
            <label className="flex items-center gap-3 text-sm">
              <Switch defaultChecked /> Notificarme por email
            </label>
          </CardContent>
        </Card>
      </Section>

      <Section title="Estados">
        <div className="grid gap-6">
          <StatusRow title="Planillas">
            {Object.keys(formStatus).map((s) => (
              <StatusBadge key={s} kind="form" status={s as keyof typeof formStatus} />
            ))}
          </StatusRow>
          <StatusRow title="Tareas">
            {Object.keys(taskStatus).map((s) => (
              <StatusBadge key={s} kind="task" status={s as keyof typeof taskStatus} />
            ))}
          </StatusRow>
          <StatusRow title="Vuelos">
            {Object.keys(flightStatus).map((s) => (
              <StatusBadge key={s} kind="flight" status={s as keyof typeof flightStatus} />
            ))}
          </StatusRow>
          <StatusRow title="Chips">
            <Badge>Default</Badge>
            <Badge variant="secondary">Bodegas</Badge>
            <Badge variant="outline">Rayos X — GOL</Badge>
            <Badge variant="brand">Excepción</Badge>
          </StatusRow>
        </div>
      </Section>

      <Section title="Avisos">
        <div className="grid gap-3 md:grid-cols-2">
          <Alert variant="info">
            <Info />
            <AlertTitle>Vuelo demorado</AlertTitle>
            <AlertDescription>QR 1325 llega 06:55 (15 min tarde). Las tareas se ajustaron.</AlertDescription>
          </Alert>
          <Alert variant="success">
            <CircleCheck />
            <AlertTitle>Planilla aprobada</AlertTitle>
            <AlertDescription>Bodegas · QR 1325, aprobada por el Jefe de Operaciones.</AlertDescription>
          </Alert>
          <Alert variant="warning">
            <TriangleAlert />
            <AlertTitle>Asignación forzada</AlertTitle>
            <AlertDescription>El operario no tiene la capacidad “Rayos X — GOL”. Queda como excepción.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <CircleAlert />
            <AlertTitle>Planilla rechazada</AlertTitle>
            <AlertDescription>Falta la matrícula. Vuelve al Líder para corregirla.</AlertDescription>
          </Alert>
        </div>
      </Section>

      <Section title="Tarjetas y cifras">
        <div className="grid gap-4 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>QR 1325 · Qatar Airways</CardTitle>
              <CardDescription>Arribo 06:40 · Salida 09:15 · Posición 14</CardDescription>
              <CardAction>
                <StatusBadge kind="flight" status="demorado" />
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-1.5">
              {["Acceso a bordo", "Bodegas", "Chequeo aeronave", "Rampa"].map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </CardContent>
            <CardFooter className="justify-between">
              <span className="text-sm text-muted-foreground">8 de 11 tareas asignadas</span>
              <Button size="sm" variant="outline">
                Ver vuelo
              </Button>
            </CardFooter>
          </Card>
          <Card className="lg:col-span-2">
            <CardContent className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              <Stat value="12" label="Vuelos hoy" />
              <Stat value="64" label="Tareas asignadas" />
              <Stat value="91%" label="Planillas en término" />
              <Stat value="3" label="Pedidos pendientes" />
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section title="Tabla">
        <Card className="py-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Operario</TableHead>
                <TableHead>Tarea</TableHead>
                <TableHead>Vuelo</TableHead>
                <TableHead>Horario</TableHead>
                <TableHead>Planilla</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                ["Lucía Currao", "LC", "Acceso a bordo", "QR 1325", "06:30–09:15", "aprobada"],
                ["Martín Iriarte", "MI", "Bodegas", "QR 1325", "06:40–08:00", "validada_lider"],
                ["Sofía Maidana", "SM", "Cinta de arribos", "ET 506", "07:10–08:30", "enviada"],
                ["Juan Mohando", "JM", "Rayos X", "AV 86", "08:00–10:00", "en_curso"],
                ["Diego Farías", "DF", "Catering", "AV 86", "09:00–10:30", "rechazada"],
              ].map(([name, initials, task, flight, time, status]) => (
                <TableRow key={name}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar size="sm">
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                      {name}
                    </div>
                  </TableCell>
                  <TableCell>{task}</TableCell>
                  <TableCell className="font-mono text-xs">{flight}</TableCell>
                  <TableCell className="tabular-nums text-muted-foreground">{time}</TableCell>
                  <TableCell>
                    <StatusBadge kind="form" status={status as keyof typeof formStatus} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </Section>

      <Section title="Navegación y capas">
        <div className="grid gap-8">
          <TabsDemo />
          <OverlaysDemo />
        </div>
      </Section>

      <Section title="Cargando">
        <div className="grid max-w-md gap-3">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </Section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-6">
      <div className="grid gap-3">
        <Eyebrow>{title}</Eyebrow>
        <Separator />
      </div>
      {children}
    </section>
  );
}

function StatusRow({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2 sm:grid-cols-[8rem_1fr] sm:items-center">
      <p className="label text-muted-foreground">{title}</p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}
