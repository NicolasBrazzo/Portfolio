import { useRef } from 'react'
import { gsap, useGSAP } from '../../../lib/gsap'
import { prefersReducedMotion } from '../../../lib/motion'

/**
 * Tratto a matita che si disegna da solo.
 *
 * pathLength="1" normalizza la lunghezza del tracciato: il dash si anima
 * da 1 a 0 qualunque sia la forma, senza misurare nulla.
 *
 * - trigger → "load" (subito, dopo `delay`) | "scroll" (quando entra in vista)
 */
export function PencilPath({
  d,
  viewBox,
  trigger = 'scroll',
  delay = 0,
  duration = 1.6,
  strokeWidth = 1.6,
  className,
}) {
  const ref = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const path = ref.current.querySelector('path')

      gsap.fromTo(
        path,
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration,
          delay,
          ease: 'power2.inOut',
          scrollTrigger:
            trigger === 'scroll' ? { trigger: ref.current, start: 'top 85%', once: true } : undefined,
        },
      )
    },
    { scope: ref },
  )

  return (
    <svg
      ref={ref}
      aria-hidden
      viewBox={viewBox}
      preserveAspectRatio="none"
      className={className}
      style={{ overflow: 'visible', pointerEvents: 'none' }}
    >
      <path
        d={d}
        pathLength="1"
        strokeDasharray="1"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
