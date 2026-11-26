# Plataforma MSA — modelo de datos y reglas (MVP)

Fuente: PRD v1.0 + las 15 planillas PO + grilla de turnos (abril 2026).
Decisiones del 2026-11-26: Supabase Cloud, MVP para probar con el cliente.

## 1. Lo que dicen las planillas

| Planilla | ¿De un vuelo? | Bloques |
|---|---|---|
| Acceso a Bordo | Sí | Cabecera de vuelo, agentes MSA + horario, horarios de embarque/desembarque, tabla de personas (nombre, empresa, legajo, desde/hasta, obs.), cantidad pax |
| Bodegas | Sí | Cabecera + hidrante, tabla de contenedores/pallets (bodega, destino, origen, contenido, novedades), inicio/fin, inspección |
| Briefing | Sí | Roles fijos (Operaciones, Sup. Tráfico, Tránsitos, Check-in, Rampa) con equipo Nextel/UHF, cantidades, briefing de carga |
| Carátula de Despacho | Sí | Horarios del despacho, "cierre del bingo" con/sin faltante, personal MSA e ITC |
| Catering | Sí (implícito) | Tabla precinto / carro / obs., camión, chofer, legajo, inicio/fin |
| Cinta de Arribos | Sí | Tabla guía/ticket, origen, tránsito, ULDs, novedades; maleteros; remanentes |
| Dutys y Bares | Sí | Filas fijas (Dutys 1–4, Bares C1, C2, Y1–Y3) × precintos × firma arribo/salida |
| Despacho | Sí | Contenedor, precinto, grilla de 40 casilleros |
| Distribución de Personal en Vuelo | Sí | **No se llena:** es la asignación del Líder → la genera el sistema |
| Escolta de Carga | Sí | Operario ITC/AH, tractor, tabla guía/cantidad/contenido/novedades, salida e ingreso |
| Novedades Equipajes | Sí | Cinta, hora de entrega, tabla ticket/origen/destino/novedad |
| Objetos Hallados en Aeronave | Sí | Tabla objeto/cantidad/asiento/obs., entrega y recibe |
| Custodia de PAX inadmitidos | **No** | Agente, cliente, relevos con sector, hasta 9 pasajeros (nombre, pasaporte, nacionalidad, motivo) |
| Selectee Report | Sí | Pasajero (nombre, pasaporte, nacionalidad, género), resumen; en inglés |

Conclusión: un **motor de formularios** con estos bloques cubre las 15:
`texto`, `número`, `hora`, `fecha`, `selección`, `sí/no`, `texto largo`,
`tabla con filas libres`, `tabla con filas fijas`, `firma` (en MVP: nombre + legajo + hora)
y **campos ligados al vuelo** (`flight.registration`, `flight.number`…) que se completan solos.

## 2. Entidades

Todas las tablas de negocio llevan `org_id` y RLS por organización.

### Organización y acceso
- **organizations**: nombre, slug, branding (logo, color), idiomas habilitados, idioma por defecto, zona horaria.
- **profiles** (1:1 con `auth.users`): nombre, `is_superadmin`.
- **members** (persona dentro de una organización): `user_id`, rol, legajo, nombre, email, categoría (RP / RX), dedicación (full / part), estado (activo / inactivo), `must_change_password`. Baja = inactivo, nunca se borra.

Roles: `operario`, `lider`, `jefe_operaciones`, `rrhh`, `admin` (de la organización). El superadmin es global.

### Catálogos (los configura cada organización)
- **airlines**: nombre, código IATA.
- **positions** (puestos): nombre y grupo. Ej.: Acceso a bordo, Chequeo aeronave, Bodega 1/2, Lobby, Sala de embarque, Operador RX.
- **capabilities**: nombre (Rayos X, Control de documentación…).
- **member_capabilities**: operario × capacidad × aerolínea (vacía = general). "Rayos X — GOL" = Rayos X con aerolínea GOL.
- **form_templates** + **form_template_versions**: tipo de planilla y su definición (JSON) versionada. Una planilla llenada guarda la versión con la que se hizo.
- **task_types**: nombre, descripción, puesto, aerolínea (opcional), tipo de planilla, fase (arribo / salida / ambas).
- **task_type_requirements**: capacidad requerida y si debe ser específica de la aerolínea del vuelo.
- **flight_templates** + items: "un vuelo de Qatar necesita: 1 Acceso a bordo, 4 Chequeo aeronave, 2 Bodegas…" (arribo y salida).

### Turnos y jornada
- **shift_types**: código (1B), horario (06:30–14:30), si cruza medianoche, tipo (trabajo / vacaciones / licencia).
- **roster_entries**: operario × fecha × turno (la grilla mensual).
- **workdays** (jornada real): inicio y fin registrados desde la app, ligados al turno del día.

### Vuelos y operación
- **flights**: aerolínea, número, matrícula, origen, destino, posición/estacionamiento, puerta, arribo y salida programados y estimados, estado (programado, demorado, adelantado, cancelado), baja lógica. Un registro = el turnaround completo (arribo + salida), como en la planilla de Distribución.
- **tasks**: vuelo (opcional: Custodia de PAX no tiene), tipo de tarea, fase, horario previsto, operario asignado, estado, inicio/fin reales, `forced` + motivo si no cumple capacidades.
- **task_assignments**: historial de cada asignación/reasignación (quién, a quién, cuándo, por qué).
- **requests**: pedidos del operario (no puedo completar, quiero cubrir esta tarea) con estado y quién resolvió.
- **incidents**: incidencias reportadas en campo.

### Planillas
- **forms**: 1 por tarea. Datos (JSON), versión de plantilla, estado, firma del envío (nombre + legajo + hora), quién validó, quién aprobó, motivo de rechazo.
- **form_revisions**: cada edición posterior al envío (datos anteriores, quién, cuándo, por qué).

### Transversales
- **notifications**: por usuario, con tipo, texto, link y leído/no leído. Email vía Resend para las importantes.
- **audit_log**: toda alta/cambio/baja de tablas de negocio (actor, acción, antes, después, fecha). Lo escriben triggers de la base.

## 3. Estados

**Tarea**: `pendiente` → `en_curso` → `completada` · también `incompleta` (la retoma otro) y `cancelada` (vuelo cancelado).

**Planilla**:
```
pendiente → en_curso → enviada → validada_lider → aprobada
                                      ↑               │
                                      └── rechazada ←─┘  (la corrige el Líder y vuelve a validar)
```
- El operario edita solo en `pendiente` / `en_curso` (autosave en el teléfono + en la base).
- Al enviar se congela la firma (nombre, legajo, hora).
- Líder: edita lo enviado y valida. Jefe: edita, aprueba o rechaza con motivo.
- Toda edición posterior al envío queda en `form_revisions` y en auditoría.

## 4. Quién puede qué

| Acción | Operario | Líder | Jefe Op. | RRHH | Admin org | Superadmin |
|---|---|---|---|---|---|---|
| Ver/ejecutar sus tareas, llenar y enviar planillas | ✔ | | | | | |
| Pedir reasignación / reportar incidencia | ✔ | | | | | |
| Cargar y editar vuelos | | ✔ | ✔ | | | |
| Asignar y reasignar tareas (incluye forzar) | | ✔ | ✔ | | | |
| Resolver pedidos de operarios | | ✔ | ✔ | | | |
| Editar y validar planillas (1ª instancia) | | ✔ | | | | |
| Aprobar / rechazar planillas (2ª instancia) | | | ✔ | | | |
| Grilla de turnos | | ver | ✔ | ver | | |
| ABM de personal y capacidades | | ✔ | ✔ | ✔ | ✔ | |
| Catálogos (puestos, tareas, planillas, aerolíneas) | | | ✔ | | ✔ | |
| Historial de jornadas y auditoría | | | ✔ | ✔ | ✔ | |
| Enviar notificaciones a usuarios | | ✔ | ✔ | ✔ | | |
| Branding, idiomas y usuarios admin de la org | | | | | ✔ | ✔ |
| Crear organizaciones | | | | | | ✔ |

## 5. Orden de construcción

0. **Bases**: app, login (cambio de clave en primer acceso, recuperación por código, bloqueo por intentos), organizaciones, roles, RLS, auditoría, branding e idiomas. Backoffice `/superadmin` mínimo: alta/edición de organizaciones y alta del primer admin de cada una.
1. **Datos maestros**: personal + capacidades, aerolíneas, puestos, tipos de tarea, motor de planillas con las 15 cargadas. Backoffice completo: vista general por organización (personas activas, última actividad, planillas del mes) y auditoría global. Post-MVP: entrar "como" un usuario para soporte, planes y facturación.
2. **Operación**: grilla de turnos, vuelos, plantillas por aerolínea, asignación asistida/forzada, app del operario (jornada, tareas, planillas con autosave), tiempo real.
3. **Control**: validación Líder → Jefe, pedidos e incidencias, notificaciones, vistas de RRHH y auditoría, PDF de planillas.
