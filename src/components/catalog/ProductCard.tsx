import { site } from "@/config/site"
import { formatPrice, fromPriceCents, stockSummary, type ProductWithVariants } from "@/lib/catalog"
import { Link } from "react-router-dom"
import { AlertCircle, RotateCw } from "lucide-react"

const shadeCount = (product: ProductWithVariants) =>
  product.variants.filter((variant) => variant.option_type === "shade").length

export function ProductCard({ product }: { product: ProductWithVariants }) {
  const price = fromPriceCents(product)
  const stock = stockSummary(product)
  const shades = shadeCount(product)
  const image = product.image_urls[0]
  const isOutOfStock = stock === "out"
  const isRestocking = stock === "restocking"

  return (
    <Link
      to={`/product/${product.slug}`}
      className={`group block rounded-lg border border-line transition-all hover:border-accent hover:shadow-lg overflow-hidden ${
        isOutOfStock ? "opacity-75" : ""
      }`}
    >
      {/* Image Container */}
      <div className="bg-accent-soft relative aspect-3/4 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-line">
            <span className="text-muted text-sm">No image</span>
          </div>
        )}

        {/* Stock Badge */}
        {isRestocking && (
          <span className="absolute left-2 top-2 inline-flex items-center gap-1 bg-warning/90 px-2 py-1 rounded text-xs font-medium text-white">
            <RotateCw size={12} />
            Restocking
          </span>
        )}
        {isOutOfStock && (
          <span className="absolute left-2 top-2 inline-flex items-center gap-1 bg-ink/80 px-2 py-1 rounded text-xs font-medium text-canvas">
            <AlertCircle size={12} />
            Out of stock
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {product.brand && <p className="text-xs font-medium text-muted uppercase tracking-wide">{product.brand}</p>}
        <p className="mt-2 text-sm font-semibold text-ink line-clamp-2">{product.name}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-bold text-accent">
            {price !== null ? formatPrice(price, site.currencySymbol) : "—"}
          </span>
          {shades > 0 && (
            <span className="text-xs px-2 py-1 rounded-full bg-bg-secondary text-muted">
              {shades} shade{shades > 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
