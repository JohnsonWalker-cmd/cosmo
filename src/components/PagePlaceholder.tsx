import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

type PagePlaceholderProps = {
  title: string
  body: string
  next?: string
}

export function PagePlaceholder({ title, body, next }: PagePlaceholderProps) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24">
      <div className="rounded-lg border border-line bg-bg-secondary p-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">Coming soon</p>
        <h1 className="font-display mt-4 text-3xl font-bold text-ink">{title}</h1>
        <p className="mt-4 max-w-xl mx-auto text-muted">{body}</p>
        {next ? <p className="mt-4 text-sm text-muted italic">{next}</p> : null}
        <Link
          to="/shop"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent/90 transition-all"
        >
          Continue shopping
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  )
}
