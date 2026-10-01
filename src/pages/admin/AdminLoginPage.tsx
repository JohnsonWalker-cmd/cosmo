import { site } from "@/config/site"
import { Link } from "react-router-dom"
import { LogIn } from "lucide-react"

export function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/10 to-bg-secondary flex items-center justify-center px-4">
      <section className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-lg bg-accent text-white flex items-center justify-center">
            <LogIn size={24} />
          </div>
          <h1 className="font-display text-3xl font-bold text-ink">Admin Portal</h1>
          <p className="mt-2 text-sm text-muted">Manage products, stock, and orders</p>
        </div>

        <div className="rounded-xl border border-line bg-white p-8 shadow-sm">
          <form
            className="space-y-5"
            onSubmit={(event) => {
              event.preventDefault()
            }}
          >
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-ink">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="username"
                placeholder="admin@cosmo.shop"
                className="mt-2 w-full rounded-lg border border-line bg-canvas px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-ink">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="mt-2 w-full rounded-lg border border-line bg-canvas px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-accent py-2.5 text-sm font-semibold text-white hover:bg-accent/90 transition-all focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 border-t border-line pt-6">
            <p className="text-center text-xs text-muted">
              Not an admin? <Link to="/" className="font-semibold text-accent hover:underline">Back to {site.name}</Link>
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted">
          Contact the store owner if you forgot your credentials
        </p>
      </section>
    </div>
  )
}
