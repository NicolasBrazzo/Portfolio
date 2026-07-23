import { useState, useEffect } from 'react'
import { NAV_LINKS, SECTIONS } from '../constants/navbar'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive]     = useState('hero')

  /* background on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* active section via IntersectionObserver */
  useEffect(() => {
    const observers = []
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.35 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  /* lock body scroll when mobile menu is open – compensate scrollbar width to avoid layout shift */
  useEffect(() => {
    if (menuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [menuOpen])

  const handleLink = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={[
        'w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-paper/95 u-rule-b' : 'bg-transparent',
      ].join(' ')}
    >
      <div className="w-full mx-auto px-(--section-padding-x) max-w-(--container-max) flex items-center justify-between h-55">

        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleLink(e, '#hero')}
          className="text-base font-semibold tracking-widest text-graphite hover:text-accent transition-colors duration-200"
        >
          Nicolas Brazzo<span className="text-accent">.</span>
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-34" aria-label="Main navigation">
          {NAV_LINKS.map(({ label, href }) => {
            const id = href.replace('#', '')
            const isActive = active === id
            return (
              <a
                key={href}
                href={href}
                onClick={(e) => handleLink(e, href)}
                className={[
                  'relative text-base font-medium tracking-wide transition-colors duration-200 pb-2',
                  isActive
                    ? 'text-accent'
                    : 'text-graphite-2 hover:text-graphite',
                ].join(' ')}
              >
                {label}
                {isActive && (
                  <span className="absolute -bottom-2 left-0 right-0 h-px bg-accent" />
                )}
              </a>
            )
          })}
        </nav>

        {/* Hamburger (mobile) */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-5 w-34 h-34 cursor-pointer"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span
            className={[
              'block w-21 h-px bg-graphite transition-all duration-300 origin-center',
              menuOpen ? 'translate-y-8 rotate-45' : '',
            ].join(' ')}
          />
          <span
            className={[
              'block w-21 h-px bg-graphite transition-all duration-300',
              menuOpen ? 'opacity-0 scale-x-0' : '',
            ].join(' ')}
          />
          <span
            className={[
              'block w-21 h-px bg-graphite transition-all duration-300 origin-center',
              menuOpen ? '-translate-y-8 -rotate-45' : '',
            ].join(' ')}
          />
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={[
          'md:hidden fixed inset-0 top-55 flex flex-col items-center justify-center gap-34 transition-all duration-300',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
        style={{ backgroundColor: 'var(--color-paper)' }}
        aria-hidden={!menuOpen}
      >
        {NAV_LINKS.map(({ label, href }) => {
          const id = href.replace('#', '')
          const isActive = active === id
          return (
            <a
              key={href}
              href={href}
              onClick={(e) => handleLink(e, href)}
              className={[
                'font-display text-md font-medium tracking-tighter transition-colors duration-200',
                isActive ? 'text-accent' : 'text-graphite',
              ].join(' ')}
            >
              {label}
            </a>
          )
        })}
      </div>
    </header>
  )
}
