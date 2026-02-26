import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/motion'
import { Section } from '../components/ui/Section'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: 'https://x.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L2.25 2.25h6.894l4.243 5.622 4.857-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
]

export function Contact() {
  const sectionRef = useRef(null)
  const badgeRef   = useRef(null)
  const headlineRef = useRef(null)
  const subRef     = useRef(null)
  const ctaRef     = useRef(null)
  const socialsRef = useRef(null)

  useGSAP(() => {
    if (prefersReducedMotion()) return

    const els = [badgeRef.current, headlineRef.current, subRef.current, ctaRef.current, socialsRef.current].filter(Boolean)
    gsap.set(els, { opacity: 0, y: 28 })

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 70%',
      onEnter: () => {
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 0.60,
          ease: 'power3.out',
          stagger: 0.12,
        })
      },
      once: true,
    })
  }, { scope: sectionRef })

  return (
    <Section id="contact" ref={sectionRef} noise>
      <Container>
        <div className="flex flex-col items-start gap-10 max-w-2xl">

          {/* Badge disponibilità */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-surface"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium tracking-[0.15em] uppercase text-muted">
              Aperto a nuovi progetti — 2026
            </span>
          </div>

          {/* Headline grande */}
          <h2
            ref={headlineRef}
            className="text-[clamp(2.8rem,7vw,5.5rem)] font-black leading-[0.95] tracking-tight text-text"
          >
            Costruiamo
            <br />
            qualcosa
            <br />
            <em
              className="not-italic text-accent"
              style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
            >
              insieme.
            </em>
          </h2>

          {/* Sottotitolo */}
          <p ref={subRef} className="text-base md:text-lg text-muted leading-relaxed">
            Hai un progetto in mente, un'idea da sviluppare o semplicemente
            vuoi scambiare due parole?{' '}
            <span className="text-text font-medium">Scrivimi.</span>{' '}
            Rispondo entro 24 ore.
          </p>

          {/* CTA mailto */}
          <div ref={ctaRef}>
            <Button
              as="a"
              href="mailto:nicolasbrazzo8@gmail.com"
              className="text-base px-8 py-4"
            >
              nicolasbrazzo8@gmail.com
              <span aria-hidden className="text-lg">→</span>
            </Button>
          </div>

          {/* Social links */}
          <div ref={socialsRef} className="flex items-center gap-6 pt-2">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-muted">
              Trovami su
            </span>
            <div className="flex items-center gap-4">
              {SOCIALS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-lg text-muted u-border-subtle hover:text-accent hover:border-accent/30 transition-colors duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </Section>
  )
}
