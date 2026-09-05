import { supabase } from "@/lib/supabase"
import type { Database } from "@/lib/database.types"

type ProductRow = Database["public"]["Tables"]["products"]["Row"]
type VariantRow = Database["public"]["Tables"]["product_variants"]["Row"]
type CategoryRow = Database["public"]["Tables"]["categories"]["Row"]

export type Variant = VariantRow

export type ProductWithVariants = ProductRow & {
  category: Pick<CategoryRow, "slug" | "name"> | null
  variants: VariantRow[]
}

const stockCopy: Record<Variant["stock_status"], string | null> = {
  in_stock: null,
  restocking: "Restocking soon",
  out: "Out of stock",
}

export function stockMessage(variant: Variant | undefined) {
  if (!variant) return null
  const message = stockCopy[variant.stock_status]
  if (!message) return `${variant.stock} in stock`
  return message
}

const PRODUCT_SELECT = `
  *,
  category:categories ( slug, name ),
  variants:product_variants ( * )
` as const

/** Lowest price across a product's variants, for the catalog card. */
export function fromPriceCents(product: Pick<ProductWithVariants, "variants">) {
  if (product.variants.length === 0) return null
  return Math.min(...product.variants.map((variant) => variant.price_cents))
}

/** In stock if any variant has stock; used to decide the card's stock badge. */
export function stockSummary(product: Pick<ProductWithVariants, "variants">) {
  const variants = product.variants
  if (variants.length === 0) return "out" as const
  if (variants.some((variant) => variant.stock_status === "in_stock")) return "in_stock" as const
  if (variants.some((variant) => variant.stock_status === "restocking")) return "restocking" as const
  return "out" as const
}

export async function fetchProducts(categorySlug?: string) {
  let query = supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .order("created_at", { ascending: false })

  if (categorySlug) {
    // Filter after the join: category is nested, so filter via the FK column
    // once we know its id. Simpler for v1: fetch the category id first.
    const { data: category } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", categorySlug)
      .maybeSingle()

    if (!category) return { data: [] as ProductWithVariants[], error: null }
    query = query.eq("category_id", category.id)
  }

  const { data, error } = await query
  return { data: (data ?? []) as unknown as ProductWithVariants[], error }
}

export async function fetchFeaturedProducts(limit = 3) {
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(limit)

  return { data: (data ?? []) as unknown as ProductWithVariants[], error }
}

export async function fetchProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("slug", slug)
    .maybeSingle()

  return { data: data as unknown as ProductWithVariants | null, error }
}

export function formatPrice(cents: number, currencySymbol: string) {
  return `${currencySymbol}${(cents / 100).toFixed(2)}`
}
