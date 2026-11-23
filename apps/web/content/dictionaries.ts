import "server-only";
import type { Locale } from "@/lib/i18n";
import es from "./es";
import en from "./en";

const dictionaries = { es, en } as const;

export const getDictionary = (locale: Locale) => dictionaries[locale];
export type { Dictionary } from "./es";
