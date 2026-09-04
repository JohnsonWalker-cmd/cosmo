export const site = {
  name: "Cosmo",
  tagline: "Makeup and skincare, ready for pickup.",
  description:
    "A boutique cosmetics shop. Order online, pay securely, and collect at the counter.",
  currency: "GHS",
  currencySymbol: "₵",
  phone: "+233 00 000 0000",
  whatsapp: "233000000000",
  email: "hello@cosmo.shop",
  address: {
    line1: "12 Demo Street",
    area: "East Legon",
    city: "Accra",
    country: "Ghana",
  },
  hours: "Monday to Saturday, 10:00 to 18:00",
  pickupNote:
    "Pickup only. We hold your order at the shop after payment. No delivery in this template.",
  nav: [
    { label: "Shop", to: "/shop" },
    { label: "Face", to: "/shop?category=face" },
    { label: "Lips", to: "/shop?category=lips" },
    { label: "Eyes", to: "/shop?category=eyes" },
    { label: "Skincare", to: "/shop?category=skincare" },
    { label: "Hair", to: "/shop?category=hair" },
    { label: "Pickup", to: "/pickup" },
  ],
} as const

export const categories = [
  { slug: "face", name: "Face" },
  { slug: "lips", name: "Lips" },
  { slug: "eyes", name: "Eyes" },
  { slug: "skincare", name: "Skincare" },
  { slug: "hair", name: "Hair" },
] as const

export function whatsappHref(message?: string) {
  const url = new URL(`https://wa.me/${site.whatsapp}`)
  if (message) url.searchParams.set("text", message)
  return url.toString()
}

export function formattedAddress() {
  const { line1, area, city, country } = site.address
  return `${line1}, ${area}, ${city}, ${country}`
}
