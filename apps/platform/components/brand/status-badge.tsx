import { Badge } from "@/components/ui/badge";
import {
  flightStatus,
  formStatus,
  taskStatus,
  type FlightStatus,
  type FormStatus,
  type TaskStatus,
} from "@/lib/status";

const maps = { task: taskStatus, form: formStatus, flight: flightStatus } as const;

type Props =
  | { kind: "task"; status: TaskStatus }
  | { kind: "form"; status: FormStatus }
  | { kind: "flight"; status: FlightStatus };

/** Chip de estado de una tarea, planilla o vuelo, con punto de color. */
export function StatusBadge(props: Props) {
  const map = maps[props.kind] as Record<string, { label: string; tone: string }>;
  const { label, tone } = map[props.status];
  return (
    <Badge variant={tone as never}>
      <span aria-hidden className="size-1.5 rounded-full bg-current" />
      {label}
    </Badge>
  );
}
