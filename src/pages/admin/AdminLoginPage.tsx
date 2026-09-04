import { site } from "@/config/site"
import { Link } from "react-router-dom"

export function AdminLoginPage() {
  return (
    <section className="mx-auto max-w-sm px-4 py-24">
      <h1 className="font-display text-3xl">Admin</h1>
      <p className="mt-2 text-sm text-muted">
        Sign-in wires to Supabase Auth in the admin slice. This form is the shell.
      </p>
      <form
        className="mt-8 space-y-4"
        onSubmit={(event) => {
          event.preventDefault()
        }}
      >
        <label className="block text-sm">
          Email
          <input
            type="email"
            name="email"
            autoComplete="username"
            className="mt-1 w-full border border-line bg-canvas px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          Password
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            className="mt-1 w-full border border-line bg-canvas px-3 py-2"
          />
        </label>
        <button type="submit" className="w-full bg-ink py-2.5 text-sm text-canvas">
          Sign in
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        <Link to="/" className="text-accent underline-offset-4 hover:underline">
          Back to {site.name}
        </Link>
      </p>
    </section>
  )
}
