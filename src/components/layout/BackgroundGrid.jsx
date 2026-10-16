import { useRef } from 'react'
import { usePointerVars } from '../../hooks/usePointerVars'

const MASK = 'radial-gradient(380px circle at var(--mx, 70%) var(--my, 30%), #000, rgb(0 0 0 / 0.18) 75%)'

/**
 * Griglia tecnica fissa dietro tutta la pagina: è appena accennata e si
 * rivela attorno al cursore, come una lente sul foglio.
 */
export function BackgroundGrid() {
  const ref = useRef(null)
  usePointerVars(ref, { global: true })

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(rgb(var(--accent-rgb)/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--accent-rgb)/0.06)_1px,transparent_1px)] bg-[size:56px_56px]"
      style={{ maskImage: MASK, WebkitMaskImage: MASK }}
    />
  )
}
