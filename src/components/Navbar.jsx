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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-bg/90 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.06)]'
          : 'bg-transparent',
      ].join(' ')}
    >
      <div className="w-full mx-auto px-(--section-padding-x) max-w-(--container-max) flex items-center justify-between h-16">

        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleLink(e, '#hero')}
          className="text-sm font-bold tracking-widest text-text hover:text-accent transition-colors duration-200"
        >
          Nicolas Brazzo<span className="text-accent">.</span>
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {NAV_LINKS.map(({ label, href }) => {
            const id = href.replace('#', '')
            const isActive = active === id
            return (
              <a
                key={href}
                href={href}
                onClick={(e) => handleLink(e, href)}
                className={[
                  'relative text-sm font-medium tracking-wide transition-colors duration-200 pb-0.5',
                  isActive
                    ? 'text-accent'
                    : 'text-muted hover:text-text',
                ].join(' ')}
              >
                {label}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent" />
                )}
              </a>
            )
          })}
        </nav>

        {/* Hamburger (mobile) */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 cursor-pointer"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span
            className={[
              'block w-5 h-px bg-text transition-all duration-300 origin-center',
              menuOpen ? 'translate-y-[7px] rotate-45' : '',
            ].join(' ')}
          />
          <span
            className={[
              'block w-5 h-px bg-text transition-all duration-300',
              menuOpen ? 'opacity-0 scale-x-0' : '',
            ].join(' ')}
          />
          <span
            className={[
              'block w-5 h-px bg-text transition-all duration-300 origin-center',
              menuOpen ? '-translate-y-[7px] -rotate-45' : '',
            ].join(' ')}
          />
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={[
          'md:hidden fixed inset-0 top-16 flex flex-col items-center justify-center gap-10 transition-all duration-300',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
        style={{ backgroundColor: 'rgba(13,13,13,0.97)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
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
                'text-3xl font-bold tracking-tight transition-colors duration-200',
                isActive ? 'text-accent' : 'text-text',
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
