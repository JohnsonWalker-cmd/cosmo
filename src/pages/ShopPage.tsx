import { categories } from "@/config/site"
import { Link, useSearchParams } from "react-router-dom"

export function ShopPage() {
  const [params] = useSearchParams()
  const selected = params.get("category")
  const selectedName = categories.find((category) => category.slug === selected)?.name

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="font-display text-4xl">{selectedName ?? "Shop"}</h1>
      <p className="mt-3 max-w-xl text-muted">
        Category filters are ready. Product cards connect to Supabase in the catalog slice.
      </p>
      <ul className="mt-8 flex flex-wrap gap-2">
        <li>
          <Link
            to="/shop"
            className={`border px-3 py-1.5 text-sm ${selected ? "border-line" : "border-ink"}`}
          >
            All
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category.slug}>
            <Link
              to={`/shop?category=${category.slug}`}
              className={`border px-3 py-1.5 text-sm ${selected === category.slug ? "border-ink" : "border-line"}`}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {["01", "02", "03"].map((slot) => (
          <div key={slot} className="border border-line">
            <div className="bg-accent-soft aspect-[3/4]" />
            <div className="p-4">
              <p className="text-xs text-muted">Placeholder {slot}</p>
              <p className="mt-1">Awaiting catalog</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
