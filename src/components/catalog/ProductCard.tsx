import { site } from "@/config/site"
import { formatPrice, fromPriceCents, stockSummary, type ProductWithVariants } from "@/lib/catalog"
import { Link } from "react-router-dom"

const stockLabel = {
  in_stock: null,
  restocking: "Restocking soon",
  out: "Out of stock",
} as const

const shadeCount = (product: ProductWithVariants) =>
  product.variants.filter((variant) => variant.option_type === "shade").length

export function ProductCard({ product }: { product: ProductWithVariants }) {
  const price = fromPriceCents(product)
  const stock = stockSummary(product)
  const shades = shadeCount(product)
  const image = product.image_urls[0]

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group block border border-line transition hover:border-ink"
    >
      <div className="bg-accent-soft relative aspect-3/4 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : null}
        {stockLabel[stock] ? (
          <span className="absolute left-2 top-2 bg-ink px-2 py-1 text-xs text-canvas">
            {stockLabel[stock]}
          </span>
        ) : null}
      </div>
      <div className="p-4">
        {product.brand ? <p className="text-xs text-muted">{product.brand}</p> : null}
        <p className="mt-1 text-sm font-medium text-ink">{product.name}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm text-muted">
            {price !== null ? formatPrice(price, site.currencySymbol) : "—"}
          </span>
          {shades > 0 ? (
            <span className="text-xs text-muted">
              {shades} shade{shades > 1 ? "s" : ""}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  )
}
