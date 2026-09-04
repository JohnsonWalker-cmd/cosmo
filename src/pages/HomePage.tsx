import { categories, formattedAddress, site } from "@/config/site"
import { Link } from "react-router-dom"

export function HomePage() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:py-24">
        <div>
          <p className="text-xs tracking-[0.25em] text-accent uppercase">Pickup cosmetics</p>
          <h1 className="font-display mt-4 text-5xl leading-tight md:text-6xl">{site.tagline}</h1>
          <p className="mt-5 max-w-md text-muted">{site.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="bg-ink px-5 py-3 text-sm text-canvas hover:bg-ink/90"
            >
              Shop the catalog
            </Link>
            <Link
              to="/pickup"
              className="border border-line px-5 py-3 text-sm text-ink hover:border-ink"
            >
              Pickup details
            </Link>
          </div>
        </div>
        <div className="bg-accent-soft aspect-[4/5] max-h-[28rem] w-full md:justify-self-end" />
      </section>

      <section className="border-y border-line">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="font-display text-2xl">Shop by category</h2>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  to={`/shop?category=${category.slug}`}
                  className="block border border-line px-4 py-8 text-center hover:border-ink"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-xs tracking-[0.2em] text-muted uppercase">Featured</p>
        <h2 className="font-display mt-2 text-3xl">Products land in the next slice</h2>
        <p className="mt-3 max-w-lg text-muted">
          The homepage, theme, and pickup copy already read from site config. The catalog
          will load from Supabase once that slice ships.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {["01", "02", "03"].map((slot) => (
            <div key={slot} className="border border-line">
              <div className="bg-accent-soft aspect-[3/4]" />
              <div className="p-4">
                <p className="text-xs text-muted">Demo slot {slot}</p>
                <p className="mt-1">Awaiting seed products</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink text-canvas">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-2xl">Pickup at the shop</p>
            <p className="mt-2 text-sm text-canvas/70">{formattedAddress()}</p>
            <p className="text-sm text-canvas/70">{site.hours}</p>
          </div>
          <Link to="/pickup" className="border border-canvas/30 px-5 py-3 text-sm hover:border-canvas">
            See how pickup works
          </Link>
        </div>
      </section>
    </>
  )
}
