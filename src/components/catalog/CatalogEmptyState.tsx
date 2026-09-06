export function CatalogEmptyState({
  configured,
  message,
}: {
  configured: boolean
  message?: string
}) {
  return (
    <div className="mt-10 border border-dashed border-line px-6 py-16 text-center">
      <p className="text-sm text-muted">
        {configured
          ? message ?? "No products yet. Add some in Supabase, or run the seed migration."
          : "Supabase isn't configured. Copy .env.example to .env and add your project keys to load the catalog."}
      </p>
    </div>
  )
}
