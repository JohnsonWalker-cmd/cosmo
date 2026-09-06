import { ProductCard } from "@/components/catalog/ProductCard"
import type { ProductWithVariants } from "@/lib/catalog"

export function ProductGrid({ products }: { products: ProductWithVariants[] }) {
  if (products.length === 0) return null

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
