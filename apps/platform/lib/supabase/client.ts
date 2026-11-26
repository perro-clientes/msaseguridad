import { createBrowserClient } from "@supabase/ssr";
import { supabaseKey, supabaseUrl } from "./env";

/** Cliente para componentes de cliente (navegador). */
export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseKey);
}
