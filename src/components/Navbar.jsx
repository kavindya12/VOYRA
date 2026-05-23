import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { HiMenu, HiX } from 'react-icons/hi'

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/tours', label: 'Tours' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `relative inline-flex items-center px-1 py-2 text-[15px] font-semibold tracking-wide transition-colors ${
      isActive ? 'text-voyra-orange' : 'text-voyra-muted hover:text-voyra-navy'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-voyra-sky bg-white/98 shadow-[0_1px_0_rgba(15,41,66,0.04),0_4px_20px_rgba(15,41,66,0.06)] backdrop-blur-xl">
      <nav className="section-container flex min-h-[4.75rem] items-center justify-between gap-6 py-3 md:min-h-[5.25rem] md:py-3.5 lg:min-h-[6rem] lg:py-4">
        <Link
          to="/"
          className="group flex shrink-0 flex-col justify-center gap-0.5"
          onClick={() => setOpen(false)}
        >
          <span className="text-[1.35rem] font-extrabold leading-none tracking-tight text-voyra-navy transition-colors group-hover:text-voyra-orange md:text-2xl lg:text-[1.65rem]">
            VOYRA
          </span>
          <span className="text-[10px] font-semibold uppercase leading-tight tracking-[0.22em] text-voyra-muted/90 sm:text-[11px]">
            Explore Beyond Limits
          </span>
        </Link>

        <ul className="hidden items-center gap-10 md:flex lg:gap-12">
          {navLinks.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink to={to} className={linkClass} end={end}>
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <span
                        className="absolute -bottom-0.5 left-0 right-0 h-[3px] rounded-full bg-voyra-orange"
                        aria-hidden
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
          <li className="pl-1">
            <Link
              to="/tours"
              className="btn-primary rounded-full px-7 py-3.5 text-[15px] font-semibold shadow-md shadow-voyra-orange/20"
            >
              Explore Tours
            </Link>
          </li>
        </ul>

        <button
          type="button"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-voyra-sky bg-white text-voyra-navy transition-colors hover:border-voyra-orange/30 hover:bg-voyra-sky md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-voyra-sky bg-white px-4 py-5 shadow-soft md:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3.5 text-[15px] font-semibold ${
                      isActive
                        ? 'bg-voyra-sky text-voyra-orange'
                        : 'text-voyra-muted hover:bg-voyra-sky/60'
                    }`
                  }
                  end={end}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
            <li className="pt-3">
              <Link
                to="/tours"
                className="btn-primary w-full rounded-full py-3.5"
                onClick={() => setOpen(false)}
              >
                Explore Tours
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
