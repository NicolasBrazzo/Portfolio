import { useState, useEffect, useRef } from 'react'

/**
 * prefersReducedMotion
 * Ritorna true se l'utente ha impostato "Riduci movimento" nelle preferenze OS.
 * Usalo prima di ogni animazione GSAP per rispettare l'accessibilità.
 *
 * Uso:
 *   if (prefersReducedMotion()) return
 *   gsap.from(el, { ... })
 */
export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * useReducedMotion
 * Hook React che legge la preferenza e si aggiorna se cambia a runtime
 * (es. utente cambia impostazione OS senza ricaricare la pagina).
 */
export function useReducedMotion() {
  const mqRef = useRef(null)

  if (!mqRef.current && typeof window !== 'undefined') {
    mqRef.current = window.matchMedia('(prefers-reduced-motion: reduce)')
  }

  const [reduced, setReduced] = useState(() => mqRef.current?.matches ?? false)

  useEffect(() => {
    const mq = mqRef.current
    if (!mq) return
    const handler = (e) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return reduced
}
