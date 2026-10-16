import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cx } from '../../lib/cx'
import { getLenis, scrollToTarget } from '../../lib/scroll'
import { Container } from '../ui/Container'
import { Label } from '../ui/Label'
import { LiveDot } from '../ui/LiveDot'
import { NAV_COPY, NAV_LINKS } from '../../constants/site'

/** Sezione attualmente in vista, letta con IntersectionObserver. */
function useActiveSection(ids, enabled) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (!enabled) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids, enabled])

  return enabled ? active : null
}

const SECTION_IDS = NAV_LINKS.map((link) => link.id)

export function Navbar() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const active = useActiveSection(SECTION_IDS, isHome)
  const [menuOpen, setMenuOpen] = useState(false)

  /* Menu mobile aperto: blocca lo scroll, sia Lenis che nativo */
  useEffect(() => {
    const lenis = getLenis()
    if (menuOpen) {
      lenis?.stop()
      document.body.style.overflow = 'hidden'
    } else {
      lenis?.start()
      document.body.style.overflow = ''
    }
    return () => {
      lenis?.start()
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  /* In home le ancore scorrono sul posto; dalle altre pagine il Link
     porta a /#id e ci pensa SmoothScroll. */
  const handleNav = (event, id) => {
    setMenuOpen(false)
    if (!isHome) return
    event.preventDefault()
    scrollToTarget(`#${id}`)
  }

  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-50 border-b border-line bg-void/70 backdrop-blur-md">
      <Container className="flex h-(--nav-h) items-center justify-between gap-21">
        <Link
          to="/"
          onClick={(e) => handleNav(e, 'top')}
          className="font-display text-xl font-extrabold tracking-[-0.04em] text-fg no-underline"
        >
          NB<span className="text-accent">.</span>
        </Link>

        <nav aria-label="Sezioni" className="hidden items-center gap-34 md:flex">
          {NAV_LINKS.map(({ index, label, id }) => (
            <Link
              key={id}
              to={`/#${id}`}
              onClick={(e) => handleNav(e, id)}
              aria-current={active === id ? 'true' : undefined}
              className={cx(
                'u-label relative py-5 no-underline transition-colors duration-(--duration-micro)',
                'after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-accent',
                'after:origin-right after:scale-x-0 after:transition-transform after:duration-700 after:ease-out-expo',
                'hover:text-fg hover:after:origin-left hover:after:scale-x-100',
                active === id ? 'text-fg after:origin-left after:scale-x-100' : 'text-fg-2',
              )}
            >
              <span className="mr-5 text-fg-3">{index}</span>
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-21">
          <Label tone="muted" className="hidden items-center gap-8 sm:inline-flex">
            <LiveDot />
            {NAV_COPY.status}
          </Label>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? NAV_COPY.closeMenu : NAV_COPY.openMenu}
            className="flex size-34 cursor-pointer flex-col items-center justify-center gap-5 border-0 bg-transparent md:hidden"
          >
            <span
              className={cx(
                'block h-px w-21 bg-fg transition-transform duration-(--duration-micro) ease-out-expo',
                menuOpen && 'translate-y-[3px] rotate-45',
              )}
            />
            <span
              className={cx(
                'block h-px w-21 bg-fg transition-transform duration-(--duration-micro) ease-out-expo',
                menuOpen && '-translate-y-[3px] -rotate-45',
              )}
            />
          </button>
        </div>
      </Container>

      <nav
        id="mobile-menu"
        aria-label="Sezioni"
        inert={!menuOpen}
        className={cx(
          'fixed inset-x-0 top-(--nav-h) bottom-0 flex flex-col justify-center gap-21 bg-void u-gutter md:hidden',
          'transition-opacity duration-(--duration-micro)',
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        {NAV_LINKS.map(({ index, label, id }) => (
          <Link
            key={id}
            to={`/#${id}`}
            onClick={(e) => handleNav(e, id)}
            className="flex items-baseline gap-13 font-display text-title font-extrabold text-fg no-underline"
          >
            <Label>{index}</Label>
            {label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
