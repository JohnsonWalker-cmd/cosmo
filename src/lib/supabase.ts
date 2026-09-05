import { getPublicEnv, isSupabaseConfigured } from "@/lib/env"
import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/database.types"

const { supabaseUrl, supabaseAnonKey } = getPublicEnv()

// A placeholder URL keeps createClient happy when .env is unset (e.g. CI, first
// clone). Every real query should check isSupabaseConfigured() first.
export const supabase = createClient<Database>(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key",
)

export { isSupabaseConfigured }
