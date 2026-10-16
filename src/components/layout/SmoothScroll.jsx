import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { prefersReducedMotion } from '../../lib/motion'
import { getLenis, scrollToTarget, setLenis } from '../../lib/scroll'

/**
 * Scroll fluido con Lenis, sincronizzato con il ticker di GSAP così
 * ScrollTrigger legge sempre la posizione giusta. Sotto reduced motion
 * resta lo scroll nativo.
 *
 * Gestisce anche il cambio di rotta: con un hash (/#lavori) scorre
 * all'ancora, altrimenti torna in cima.
 */
export function SmoothScroll() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (prefersReducedMotion()) return

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    const tick = (time) => lenis.raf(time * 1000)

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    setLenis(lenis)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  useEffect(() => {
    /* Un frame di attesa: la pagina nuova deve essere montata */
    const frame = requestAnimationFrame(() => {
      if (hash) {
        scrollToTarget(hash)
      } else {
        const lenis = getLenis()
        if (lenis) lenis.scrollTo(0, { immediate: true })
        else window.scrollTo({ top: 0, behavior: 'instant' })
      }
      ScrollTrigger.refresh()
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}
