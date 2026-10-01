import { formattedAddress, site } from "@/config/site"
import { MapPin, Clock, Phone, Mail, Check } from "lucide-react"
import { Link } from "react-router-dom"

export function PickupPage() {
  return (
    <>
      {/* Header */}
      <div className="border-b border-line bg-bg-secondary">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">How it works</p>
          <h1 className="font-display mt-3 text-4xl font-bold text-ink">Pickup Information</h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-16">
        {/* Info Cards */}
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          <div className="rounded-lg border border-line bg-white p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-accent/10 p-3">
                <MapPin className="text-accent" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-ink">Location</h3>
                <p className="mt-2 text-sm text-muted">{formattedAddress()}</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-line bg-white p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-accent/10 p-3">
                <Clock className="text-accent" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-ink">Hours</h3>
                <p className="mt-2 text-sm text-muted">{site.hours}</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-line bg-white p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-accent/10 p-3">
                <Phone className="text-accent" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-ink">Phone</h3>
                <p className="mt-2 text-sm text-muted">{site.phone}</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-line bg-white p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-accent/10 p-3">
                <Mail className="text-accent" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-ink">Email</h3>
                <p className="mt-2 text-sm text-muted">{site.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="rounded-lg bg-bg-secondary p-8 mb-8">
          <h2 className="font-display text-2xl font-bold text-ink mb-6">Order Process</h2>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent text-white font-semibold">
                1
              </span>
              <div>
                <h3 className="font-semibold text-ink">Browse & Add to Cart</h3>
                <p className="mt-1 text-sm text-muted">Explore our collection and select your products</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent text-white font-semibold">
                2
              </span>
              <div>
                <h3 className="font-semibold text-ink">Checkout</h3>
                <p className="mt-1 text-sm text-muted">Enter your details and choose your pickup time</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent text-white font-semibold">
                3
              </span>
              <div>
                <h3 className="font-semibold text-ink">Secure Payment</h3>
                <p className="mt-1 text-sm text-muted">Complete payment via Paystack (safe & secure)</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-success text-white font-semibold">
                <Check size={18} />
              </span>
              <div>
                <h3 className="font-semibold text-ink">Collect Your Order</h3>
                <p className="mt-1 text-sm text-muted">Pick up at the store during business hours</p>
              </div>
            </li>
          </ol>
        </div>

        {/* Important Note */}
        <div className="rounded-lg border border-accent/30 bg-accent/5 p-6">
          <p className="text-sm font-medium text-accent">{site.pickupNote}</p>
        </div>

        {/* Back to Shop */}
        <div className="mt-8 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-white hover:bg-accent/90 transition-all"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    </>
  )
}
