import { formattedAddress, site, whatsappHref } from "@/config/site"
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-line bg-white mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-12 md:grid-cols-3 mb-8">
          {/* Brand */}
          <div>
            <p className="font-display text-xl font-bold text-accent">{site.name}</p>
            <p className="mt-2 max-w-xs text-sm text-muted">{site.tagline}</p>
          </div>

          {/* Pickup */}
          <div>
            <div className="flex items-start gap-3 mb-4">
              <MapPin className="text-accent flex-shrink-0 mt-1" size={18} />
              <div>
                <p className="text-sm font-semibold text-ink">Pickup Location</p>
                <p className="text-sm text-muted mt-1">{formattedAddress()}</p>
                <p className="text-sm text-muted">{site.hours}</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm font-semibold text-ink mb-4">Get in Touch</p>
            <div className="space-y-3">
              <a
                href={`tel:${site.phone}`}
                className="flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
              >
                <Phone size={16} />
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
              >
                <Mail size={16} />
                {site.email}
              </a>
              <a
                href={whatsappHref(`Hi, I have a question about ${site.name}.`)}
                className="flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-line pt-8 text-center">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {site.name}. All rights reserved. Pickup-only cosmetics shop template.
          </p>
        </div>
      </div>
    </footer>
  )
}
