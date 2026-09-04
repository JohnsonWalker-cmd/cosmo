import { Link } from "react-router-dom"

type PagePlaceholderProps = {
  title: string
  body: string
  next?: string
}

export function PagePlaceholder({ title, body, next }: PagePlaceholderProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <p className="text-xs tracking-[0.2em] text-muted uppercase">Coming in the next slice</p>
      <h1 className="font-display mt-3 text-4xl">{title}</h1>
      <p className="mt-4 max-w-xl text-muted">{body}</p>
      {next ? <p className="mt-2 text-sm text-muted">{next}</p> : null}
      <Link to="/shop" className="mt-8 inline-block text-sm text-accent underline-offset-4 hover:underline">
        Back to shop
      </Link>
    </section>
  )
}
