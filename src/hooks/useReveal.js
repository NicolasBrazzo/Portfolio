import { gsap, ScrollTrigger, useGSAP, EASE_OUT } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/motion'

/**
 * Fa entrare gli elementi [data-reveal] dentro scopeRef quando arrivano
 * nel viewport: salgono e si accendono, a gruppi sfalsati.
 *
 * Uso:
 *   const ref = useRef(null)
 *   useReveal(ref)
 *   <section ref={ref}><p data-reveal>…</p></section>
 */
export function useReveal(scopeRef, { selector = '[data-reveal]', y = 40, stagger = 0.08 } = {}) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      const items = gsap.utils.toArray(selector)
      if (!items.length) return

      gsap.set(items, { autoAlpha: 0, y })

      ScrollTrigger.batch(items, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1.1, ease: EASE_OUT, stagger }),
      })
    },
    { scope: scopeRef },
  )
}
