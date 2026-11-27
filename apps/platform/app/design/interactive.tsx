"use client";

import { MoreHorizontal, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const airlines = {
  qatar: "Qatar Airways",
  ethiopian: "Ethiopian Airlines",
  avianca: "Avianca",
};

export function SelectDemo() {
  return (
    <div className="grid gap-2">
      <Label>Aerolínea</Label>
      <Select items={airlines}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Elegí una aerolínea" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(airlines).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function OverlaysDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>Abrir diálogo</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rechazar planilla</DialogTitle>
            <DialogDescription>
              Vuelve al Líder de equipo para que la corrija. El motivo queda en la auditoría.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            <Label htmlFor="motivo">Motivo</Label>
            <Input id="motivo" placeholder="Ej.: falta la matrícula" />
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="ghost" />}>Cancelar</DialogClose>
            <DialogClose render={<Button variant="destructive" />}>Rechazar</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Sheet>
        <SheetTrigger render={<Button variant="outline" />}>Abrir panel lateral</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>QR 1325 · Qatar Airways</SheetTitle>
            <SheetDescription>Arribo 06:40 · Salida 09:15 · Posición 14</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label="Acciones" />}>
          <MoreHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Tarea</DropdownMenuLabel>
          <DropdownMenuItem>Reasignar</DropdownMenuItem>
          <DropdownMenuItem>Ver planilla</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Cancelar tarea</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Tooltip>
        <TooltipTrigger render={<Button variant="secondary" size="icon" aria-label="Nueva tarea" />}>
          <Plus />
        </TooltipTrigger>
        <TooltipContent>Nueva tarea</TooltipContent>
      </Tooltip>

      <Button variant="ghost" onClick={() => toast.success("Planilla enviada", { description: "QR 1325 · Bodegas" })}>
        Mostrar aviso
      </Button>
    </div>
  );
}

export function TabsDemo() {
  return (
    <Tabs defaultValue="hoy">
      <TabsList>
        <TabsTrigger value="hoy">Hoy</TabsTrigger>
        <TabsTrigger value="manana">Mañana</TabsTrigger>
        <TabsTrigger value="historial">Historial</TabsTrigger>
      </TabsList>
      <TabsContent value="hoy" className="pt-3 text-muted-foreground">
        12 vuelos programados, 3 demorados.
      </TabsContent>
      <TabsContent value="manana" className="pt-3 text-muted-foreground">
        9 vuelos programados.
      </TabsContent>
      <TabsContent value="historial" className="pt-3 text-muted-foreground">
        Últimos 30 días.
      </TabsContent>
    </Tabs>
  );
}
