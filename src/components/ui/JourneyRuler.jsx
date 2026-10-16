import { useRef } from 'react'
import { cx } from '../../lib/cx'
import { gsap, useGSAP } from '../../lib/gsap'
import { prefersReducedMotion } from '../../lib/motion'
import { Label } from './Label'

/**
 * Percorso come un righello: una linea con le tacche che si riempie di
 * accento mentre scorri, e una tappa per colonna. L'ultima tappa con
 * `current: true` è segnata come "oggi".
 */
export function JourneyRuler({ steps }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.fromTo(
        '[data-ruler-fill]',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top 85%', end: 'bottom 60%', scrub: 0.6 },
        },
      )
    },
    { scope: ref },
  )

  return (
    <div ref={ref}>
      <div aria-hidden className="relative h-px bg-line-strong">
        <div data-ruler-fill className="absolute inset-0 origin-left bg-accent" />
        <div className="absolute inset-x-0 top-0 h-8 bg-[linear-gradient(90deg,var(--line-strong)_1px,transparent_1px)] bg-[size:2.5%_100%]" />
      </div>

      <ol className="m-0 mt-55 grid list-none grid-cols-1 gap-x-34 gap-y-55 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <li key={step.period} className="relative flex min-w-0 flex-col gap-13 pt-21">
            <span
              aria-hidden
              className={cx(
                'absolute top-0 left-0 size-13 rounded-full border-[1.5px] border-accent',
                step.current ? 'bg-accent shadow-[0_0_0_6px_rgb(var(--accent-rgb)/0.18)]' : 'bg-void',
              )}
            />
            <Label tone="accent" className="mt-8">{step.period}</Label>
            <h4 className="m-0 font-display text-lg font-semibold">{step.title}</h4>
            <p className="m-0 text-sm text-fg-2">{step.description}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
