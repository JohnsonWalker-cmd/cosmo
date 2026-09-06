import type { Variant } from "@/lib/catalog"

export function VariantPicker({
  variants,
  selectedId,
  onSelect,
}: {
  variants: Variant[]
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  if (variants.length === 0) return null

  const optionType = variants[0].option_type
  const label = optionType === "shade" ? "Shade" : optionType === "size" ? "Size" : null

  return (
    <div>
      {label ? <p className="text-sm font-medium">{label}</p> : null}
      <div className="mt-2 flex flex-wrap gap-2">
        {variants.map((variant) => {
          const isSelected = variant.id === selectedId
          const isOut = variant.stock_status === "out"

          if (optionType === "shade") {
            return (
              <button
                key={variant.id}
                type="button"
                onClick={() => onSelect(variant.id)}
                title={`${variant.name}${isOut ? " (out of stock)" : ""}`}
                aria-pressed={isSelected}
                aria-label={variant.name}
                className={`relative h-10 w-10 rounded-full border-2 transition ${
                  isSelected ? "border-ink" : "border-line"
                }`}
                style={{ backgroundColor: variant.swatch_url ?? "#ccc" }}
              >
                {isOut ? (
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-canvas/60"
                    style={{
                      backgroundImage:
                        "linear-gradient(to top right, transparent 47%, currentColor 47%, currentColor 53%, transparent 53%)",
                      color: "#1c1412",
                    }}
                  />
                ) : null}
              </button>
            )
          }

          return (
            <button
              key={variant.id}
              type="button"
              onClick={() => onSelect(variant.id)}
              disabled={isOut}
              aria-pressed={isSelected}
              className={`border px-4 py-2 text-sm transition ${
                isSelected ? "border-ink" : "border-line"
              } ${isOut ? "cursor-not-allowed text-muted line-through" : "hover:border-ink"}`}
            >
              {variant.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
