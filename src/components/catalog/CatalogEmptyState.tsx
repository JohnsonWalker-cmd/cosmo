import { AlertCircle, Settings } from "lucide-react"
import { Link } from "react-router-dom"

export function CatalogEmptyState({
  configured,
  message,
}: {
  configured: boolean
  message?: string
}) {
  return (
    <div className="rounded-lg border border-line bg-bg-secondary p-12 text-center">
      <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
        {configured ? (
          <AlertCircle className="text-accent" size={24} />
        ) : (
          <Settings className="text-accent" size={24} />
        )}
      </div>
      <h3 className="font-display text-lg font-semibold text-ink">
        {configured ? "No products yet" : "Setup required"}
      </h3>
      <p className="mt-2 max-w-md mx-auto text-sm text-muted">
        {configured
          ? message ?? "No products available. Add some in Supabase or run the seed migration."
          : "Supabase isn't configured. Copy .env.example to .env and add your project keys to load the catalog."}
      </p>
      {configured && (
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
        >
          ← Back to home
        </Link>
      )}
    </div>
  )
}
