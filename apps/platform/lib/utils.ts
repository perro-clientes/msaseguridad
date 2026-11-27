import { createCn } from "cn/config";

/**
 * Une clases de Tailwind resolviendo conflictos. Registramos los tamaños de texto
 * propios del design system para que no se confundan con colores (`text-display`
 * vs `text-ink`). Todos los componentes importan `cn` desde acá.
 */
export const cn = createCn({
  extend: { classGroups: { "font-size": [{ text: ["display", "headline"] }] } },
});
