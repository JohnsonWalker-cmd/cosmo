import { CatalogEmptyState } from "@/components/catalog/CatalogEmptyState"
import { ProductGrid } from "@/components/catalog/ProductGrid"
import { categories } from "@/config/site"
import { fetchProducts, type ProductWithVariants } from "@/lib/catalog"
import { isSupabaseConfigured } from "@/lib/supabase"
import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"

export function ShopPage() {
  const configured = isSupabaseConfigured()
  const [params] = useSearchParams()
  const selected = params.get("category") ?? undefined
  const selectedName = categories.find((category) => category.slug === selected)?.name

  const [products, setProducts] = useState<ProductWithVariants[]>([])
  const [loading, setLoading] = useState(configured)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!configured) return

    let cancelled = false
    setLoading(true)
    setError(null)

    fetchProducts(selected).then(({ data, error: fetchError }) => {
      if (cancelled) return
      if (fetchError) setError(fetchError.message)
      setProducts(data)
      setLoading(false)
    })

    return () => {
      cancelled = true
    }
  }, [configured, selected])

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="font-display text-4xl">{selectedName ?? "Shop"}</h1>
      <p className="mt-3 max-w-xl text-muted">
        Every product here is real Supabase data. Stock and shade counts come from each
        product's variants.
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

      <div className="mt-10">
        {loading ? (
          <p className="text-sm text-muted">Loading catalog…</p>
        ) : error ? (
          <p className="text-sm text-red-700">Couldn't load products: {error}</p>
        ) : products.length === 0 ? (
          <CatalogEmptyState
            configured={configured}
            message={selectedName ? `No products in ${selectedName} yet.` : undefined}
          />
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </section>
  )
}
