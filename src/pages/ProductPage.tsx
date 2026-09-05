import { VariantPicker } from "@/components/catalog/VariantPicker"
import { site } from "@/config/site"
import { fetchProductBySlug, formatPrice, stockMessage, type ProductWithVariants } from "@/lib/catalog"
import { isSupabaseConfigured } from "@/lib/supabase"
import { useEffect, useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"

export function ProductPage() {
  const configured = isSupabaseConfigured()
  const { slug } = useParams()
  const [product, setProduct] = useState<ProductWithVariants | null>(null)
  const [loading, setLoading] = useState(configured)
  const [error, setError] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    if (!slug || !configured) return

    let cancelled = false
    setLoading(true)
    setError(null)

    fetchProductBySlug(slug).then(({ data, error: fetchError }) => {
      if (cancelled) return
      if (fetchError) setError(fetchError.message)
      setProduct(data)
      setLoading(false)
    })

    return () => {
      cancelled = true
    }
  }, [configured, slug])

  const sortedVariants = useMemo(
    () => [...(product?.variants ?? [])].sort((a, b) => a.sort_order - b.sort_order),
    [product],
  )
  useEffect(()=> {
    setSelectedId(sortedVariants[0]?.id ?? null)
  },[sortedVariants])
  
  const selectedVariant = sortedVariants.find((variant) => variant.id === selectedId)

  if (!configured) {
    return (
      <NotFoundShell message="Supabase isn't configured. Add your project keys to .env to load products." />
    )
  }

  if (loading) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-sm text-muted">Loading product…</p>
      </section>
    )
  }

  if (error) {
    return <NotFoundShell message={`Couldn't load this product: ${error}`} />
  }

  if (!product) {
    return <NotFoundShell message="We couldn't find that product." />
  }

  const image = product.image_urls[0]
  const canAddToCart = selectedVariant && selectedVariant.stock_status !== "out"

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <Link to="/shop" className="text-sm text-muted hover:text-ink">
        ← Back to shop
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div className="bg-accent-soft aspect-square overflow-hidden">
          {image ? (
            <img src={image} alt={product.name} className="h-full w-full object-cover" />
          ) : null}
        </div>

        <div>
          {product.brand ? <p className="text-sm text-muted">{product.brand}</p> : null}
          <h1 className="font-display mt-1 text-3xl">{product.name}</h1>
          <p className="mt-3 text-lg">
            {selectedVariant ? formatPrice(selectedVariant.price_cents, site.currencySymbol) : "—"}
          </p>

          <p className="mt-4 max-w-md text-muted">{product.description}</p>

          <div className="mt-8">
            <VariantPicker
              variants={sortedVariants}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>

          <p className="mt-4 text-sm text-muted">{stockMessage(selectedVariant)}</p>

          <button
            type="button"
            disabled={!canAddToCart}
            className={`mt-6 w-full py-3 text-sm ${
              canAddToCart
                ? "bg-ink text-canvas hover:bg-ink/90"
                : "cursor-not-allowed bg-line text-muted"
            }`}
          >
            {canAddToCart ? "Add to cart" : "Out of stock"}
          </button>

          <p className="mt-4 text-xs text-muted">{site.pickupNote}</p>
        </div>
      </div>
    </section>
  )
}

function NotFoundShell({ message }: { message: string }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <p className="text-muted">{message}</p>
      <Link to="/shop" className="mt-6 inline-block text-sm text-accent underline-offset-4 hover:underline">
        Back to shop
      </Link>
    </section>
  )
}
