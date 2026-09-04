export function getPublicEnv() {
  return {
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL ?? "",
    supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY ?? "",
    paystackPublicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY ?? "",
  }
}

export function isSupabaseConfigured() {
  const { supabaseUrl, supabaseAnonKey } = getPublicEnv()
  return Boolean(supabaseUrl && supabaseAnonKey)
}
