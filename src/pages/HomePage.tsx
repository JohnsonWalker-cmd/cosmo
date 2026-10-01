import { CatalogEmptyState } from "@/components/catalog/CatalogEmptyState"
import { ProductGrid } from "@/components/catalog/ProductGrid"
import { SkeletonHero, SkeletonProductGrid } from "@/components/SkeletonLoader"
import { categories, site } from "@/config/site"
import { fetchFeaturedProducts, type ProductWithVariants } from "@/lib/catalog"
import { isSupabaseConfigured } from "@/lib/supabase"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ShoppingBag, Truck, Lock, Star } from "lucide-react"

export function HomePage() {
  const configured = isSupabaseConfigured()
  const [featured, setFeatured] = useState<ProductWithVariants[]>([])
  const [loading, setLoading] = useState(configured)

  useEffect(() => {
    if (!configured) return

    let cancelled = false
    fetchFeaturedProducts().then(({ data }) => {
      if (cancelled) return
      setFeatured(data)
      setLoading(false)
    })

    return () => {
      cancelled = true
    }
  }, [configured])

  return (
    <>
      {/* Hero Section */}
      {loading ? (
        <SkeletonHero />
      ) : (
        <section className="bg-gradient-to-br from-accent/5 via-accent-soft/20 to-bg-secondary px-4 py-20 md:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-accent">Beauty essentials</p>
                <h1 className="font-display mt-4 text-5xl font-bold leading-tight md:text-6xl text-ink">
                  {site.tagline}
                </h1>
                <p className="mt-5 max-w-md text-lg text-muted">{site.description}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 bg-accent px-6 py-3 text-base font-semibold text-white hover:bg-accent/90 rounded-lg transition-all"
                  >
                    <ShoppingBag size={18} />
                    Shop Now
                  </Link>
                  <Link
                    to="/pickup"
                    className="inline-flex items-center gap-2 border-2 border-accent px-6 py-3 text-base font-semibold text-accent hover:bg-accent/5 rounded-lg transition-all"
                  >
                    <Truck size={18} />
                    How It Works
                  </Link>
                </div>
              </div>
              <div className="bg-gradient-to-br from-accent-soft to-accent/10 aspect-[4/5] max-h-[28rem] w-full rounded-2xl flex items-center justify-center">
                <ShoppingBag size={80} className="text-accent/20" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Trust Indicators */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Lock className="text-accent" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-ink">Secure Payment</h3>
                <p className="mt-1 text-sm text-muted">All transactions via Paystack</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Truck className="text-accent" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-ink">Easy Pickup</h3>
                <p className="mt-1 text-sm text-muted">Order online, collect in-store</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Star className="text-accent" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-ink">Premium Quality</h3>
                <p className="mt-1 text-sm text-muted">Carefully curated brands</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Browse</p>
            <h2 className="font-display mt-2 text-3xl font-bold text-ink">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/shop?category=${category.slug}`}
                className="group rounded-lg border border-line bg-bg-secondary px-4 py-6 text-center font-medium transition-all hover:border-accent hover:shadow-md"
              >
                <span className="text-accent group-hover:underline">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">Bestsellers</p>
          <h2 className="font-display mt-2 text-3xl font-bold text-ink">Trending Now</h2>
          <p className="mt-3 max-w-lg text-muted">
            Customer favorites and staff picks from our curated collection
          </p>
        </div>
        {loading ? (
          <SkeletonProductGrid />
        ) : featured.length === 0 ? (
          <CatalogEmptyState configured={configured} />
        ) : (
          <ProductGrid products={featured} />
        )}
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-accent/5 to-accent-soft/30">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h2 className="font-display text-3xl font-bold text-ink">Ready to glow?</h2>
          <p className="mt-4 text-muted">Explore our complete collection and order for pickup today.</p>
          <Link
            to="/shop"
            className="mt-8 inline-block rounded-lg bg-accent px-8 py-3 font-semibold text-white hover:bg-accent/90 transition-all"
          >
            Shop All Products
          </Link>
        </div>
      </section>
    </>
  )
}
