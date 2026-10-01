import { site } from "@/config/site"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { ShoppingBag, Menu, X } from "lucide-react"

function navHrefIsActive(to: string, pathname: string, search: string) {
  const url = new URL(to, "http://local")
  if (url.pathname !== pathname) return false
  if (url.search) return search === url.search
  return search === ""
}

export function Header() {
  const [open, setOpen] = useState(false)
  const { pathname, search } = useLocation()

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link
          to="/"
          className="font-display text-2xl font-bold tracking-tight text-accent"
          onClick={() => setOpen(false)}
        >
          {site.name}
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {site.nav.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              label={item.label}
              active={navHrefIsActive(item.to, pathname, search)}
            />
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/cart"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-ink hover:bg-bg-secondary transition-colors"
            aria-label="Cart"
            onClick={() => setOpen(false)}
          >
            <ShoppingBag size={18} />
            <span className="hidden sm:inline">Cart</span>
          </Link>
          <button
            type="button"
            className="lg:hidden rounded-lg p-2 hover:bg-bg-secondary transition-colors"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="flex flex-col gap-2 border-t border-line bg-bg-secondary px-4 py-3 lg:hidden"
          aria-label="Mobile"
        >
          {site.nav.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              label={item.label}
              active={navHrefIsActive(item.to, pathname, search)}
              onClick={() => setOpen(false)}
            />
          ))}
        </nav>
      ) : null}
    </header>
  )
}

function NavItem({
  to,
  label,
  active,
  onClick,
}: {
  to: string
  label: string
  active: boolean
  onClick?: () => void
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`text-sm font-medium transition-colors ${
        active
          ? "text-accent"
          : "text-ink/70 hover:text-ink"
      }`}
    >
      {label}
    </Link>
  )
}
