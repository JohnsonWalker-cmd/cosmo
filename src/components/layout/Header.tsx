import { site } from "@/config/site"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

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
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link to="/" className="font-display text-2xl tracking-tight text-ink">
          {site.name}
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
          {site.nav.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              label={item.label}
              active={navHrefIsActive(item.to, pathname, search)}
            />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="text-sm text-ink/80 hover:text-ink"
            aria-label="Cart, 0 items"
          >
            Cart (0)
          </Link>
          <button
            type="button"
            className="text-sm lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="flex flex-col gap-3 border-t border-line px-4 py-4 lg:hidden"
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
      className={`whitespace-nowrap text-sm tracking-wide ${active ? "text-accent" : "text-ink/80 hover:text-ink"}`}
    >
      {label}
    </Link>
  )
}
