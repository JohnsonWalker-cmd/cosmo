import { formattedAddress, site } from "@/config/site"

export function PickupPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-xs tracking-[0.25em] text-accent uppercase">Collect in person</p>
      <h1 className="font-display mt-3 text-4xl">Pickup</h1>
      <p className="mt-4 text-muted">{site.pickupNote}</p>
      <dl className="mt-10 space-y-6 border-t border-line pt-8">
        <div>
          <dt className="text-sm font-medium">Shop</dt>
          <dd className="mt-1 text-muted">{formattedAddress()}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium">Hours</dt>
          <dd className="mt-1 text-muted">{site.hours}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium">Phone</dt>
          <dd className="mt-1 text-muted">{site.phone}</dd>
        </div>
      </dl>
    </section>
  )
}
