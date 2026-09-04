import { formattedAddress, site, whatsappHref } from "@/config/site"

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-xl">{site.name}</p>
          <p className="mt-2 max-w-xs text-sm text-muted">{site.tagline}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Pickup</p>
          <p className="mt-2 text-sm text-muted">{formattedAddress()}</p>
          <p className="mt-1 text-sm text-muted">{site.hours}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Talk to us</p>
          <p className="mt-2 text-sm text-muted">{site.phone}</p>
          <a
            href={whatsappHref(`Hi, I have a question about ${site.name}.`)}
            className="mt-2 inline-block text-sm text-accent underline-offset-4 hover:underline"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  )
}
