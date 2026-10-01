import { CatalogEmptyState } from "@/components/catalog/CatalogEmptyState"
import { ProductGrid } from "@/components/catalog/ProductGrid"
import { SkeletonProductGrid } from "@/components/SkeletonLoader"
import { categories } from "@/config/site"
import { fetchProducts, type ProductWithVariants } from "@/lib/catalog"
import { isSupabaseConfigured } from "@/lib/supabase"
import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { ChevronLeft, AlertCircle } from "lucide-react"

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
    <>
      {/* Page Header */}
      <div className="border-b border-line bg-bg-secondary">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted hover:text-ink transition-colors">
              <ChevronLeft size={20} />
            </Link>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Shop</p>
              <h1 className="font-display mt-1 text-4xl font-bold text-ink">
                {selectedName ?? "All Products"}
              </h1>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-muted">
            {selectedName
              ? `Browse our selection of ${selectedName.toLowerCase()} products`
              : "Explore our complete collection of premium beauty essentials"}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-muted">Filter:</span>
          <Link
            to="/shop"
            className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all ${
              !selected
                ? "bg-accent text-white"
                : "border border-line bg-white hover:border-accent"
            }`}
          >
            All
          </Link>
          {categories.map((category) => (
            <Link
              key={category.slug}
              to={`/shop?category=${category.slug}`}
              className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all ${
                selected === category.slug
                  ? "bg-accent text-white"
                  : "border border-line bg-white hover:border-accent"
              }`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="mx-auto max-w-6xl px-4 pb-16">
        {loading ? (
          <SkeletonProductGrid />
        ) : error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
            <AlertCircle className="mx-auto text-red-600 mb-3" size={32} />
            <p className="font-medium text-red-900">Couldn't load products</p>
            <p className="mt-1 text-sm text-red-700">{error}</p>
          </div>
        ) : products.length === 0 ? (
          <CatalogEmptyState
            configured={configured}
            message={selectedName ? `No products in ${selectedName} yet.` : undefined}
          />
        ) : (
          <>
            <p className="mb-6 text-sm text-muted">{products.length} products</p>
            <ProductGrid products={products} />
          </>
        )}
      </div>
    </>
  )
}
