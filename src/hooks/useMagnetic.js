import { useEffect } from 'react'
import { gsap } from '../lib/gsap'
import { hasFinePointer, prefersReducedMotion } from '../lib/motion'

/**
 * Effetto "magnetico": l'elemento segue leggermente il cursore mentre
 * ci passa sopra e torna al suo posto quando esce. Solo con mouse o
 * trackpad, mai sotto reduced motion.
 */
export function useMagnetic(ref, { strength = 0.3, enabled = true } = {}) {
  useEffect(() => {
    const el = ref.current
    if (!el || !enabled || !hasFinePointer() || prefersReducedMotion()) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' })

    const move = (event) => {
      const rect = el.getBoundingClientRect()
      xTo((event.clientX - rect.left - rect.width / 2) * strength)
      yTo((event.clientY - rect.top - rect.height / 2) * strength)
    }
    const leave = () => {
      xTo(0)
      yTo(0)
    }

    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
      gsap.set(el, { x: 0, y: 0 })
    }
  }, [ref, strength, enabled])
}
