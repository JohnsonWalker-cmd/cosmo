// Hand-written to match supabase/migrations/0001_init.sql.
// If the schema changes, update this file to match (or generate it with
// `supabase gen types typescript` once the project is CLI-linked).

export type StockStatus = "in_stock" | "restocking" | "out"
export type VariantOptionType = "shade" | "size" | "default"
export type OrderStatus = "paid" | "ready_for_pickup" | "picked_up"

type CategoryRow = {
  id: string
  slug: string
  name: string
  sort_order: number
}

type ProductRow = {
  id: string
  slug: string
  name: string
  brand: string | null
  description: string
  category_id: string | null
  image_urls: string[]
  featured: boolean
  created_at: string
}

type ProductVariantRow = {
  id: string
  product_id: string
  name: string
  option_type: VariantOptionType
  sku: string | null
  price_cents: number
  stock: number
  stock_status: StockStatus
  swatch_url: string | null
  sort_order: number
}

type OrderRow = {
  id: string
  customer_name: string
  customer_phone: string
  status: OrderStatus
  paystack_reference: string | null
  total_cents: number
  created_at: string
}

type OrderItemRow = {
  id: string
  order_id: string
  product_id: string | null
  variant_id: string | null
  name_snapshot: string
  quantity: number
  unit_price_cents: number
}

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: CategoryRow
        Insert: Partial<CategoryRow> & Pick<CategoryRow, "slug" | "name">
        Update: Partial<CategoryRow>
        Relationships: []
      }
      products: {
        Row: ProductRow
        Insert: Partial<ProductRow> & Pick<ProductRow, "slug" | "name">
        Update: Partial<ProductRow>
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      product_variants: {
        Row: ProductVariantRow
        Insert: Partial<ProductVariantRow> &
          Pick<ProductVariantRow, "product_id" | "name" | "option_type" | "price_cents">
        Update: Partial<ProductVariantRow>
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: OrderRow
        Insert: Partial<OrderRow> & Pick<OrderRow, "customer_name" | "customer_phone" | "total_cents">
        Update: Partial<OrderRow>
        Relationships: []
      }
      order_items: {
        Row: OrderItemRow
        Insert: Partial<OrderItemRow> &
          Pick<OrderItemRow, "order_id" | "name_snapshot" | "quantity" | "unit_price_cents">
        Update: Partial<OrderItemRow>
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
  }
}
