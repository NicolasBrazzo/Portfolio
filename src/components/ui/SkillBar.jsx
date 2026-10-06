/**
 * SkillBar – singola skill con:
 * - nome a sinistra
 * - percentuale grande (count-up GSAP) a destra
 * - bar track 1px con fill a colore accento animato
 *
 * La prop `triggered` (bool) avvia l'animazione; prima è in stato fermo.
 */
import { useRef, useEffect } from 'react'
import { gsap } from '../../lib/gsap'
import { prefersReducedMotion } from '../../lib/motion'

export function SkillBar({ name, percent, triggered }) {
  const fillRef  = useRef(null)
  const countRef = useRef(null)

  useEffect(() => {
    if (!triggered) return

    if (prefersReducedMotion()) {
      if (fillRef.current)  fillRef.current.style.width = `${percent}%`
      if (countRef.current) countRef.current.textContent = percent
      return
    }

    /* Bar fill */
    gsap.fromTo(
      fillRef.current,
      { width: '0%' },
      { width: `${percent}%`, duration: 1.2, ease: 'power2.out' }
    )

    /* Count-up tramite oggetto proxy */
    const proxy = { val: 0 }
    gsap.to(proxy, {
      val: percent,
      duration: 1.2,
      ease: 'power2.out',
      snap: { val: 1 },
      onUpdate() {
        if (countRef.current) countRef.current.textContent = Math.round(proxy.val)
      },
    })
  }, [triggered, percent])

  return (
    <div className="group flex flex-col gap-8 py-13 u-rule-b last:border-0">

      {/* Nome + numero */}
      <div className="flex items-baseline justify-between gap-13">
        <span className="text-micro font-medium tracking-wide text-graphite uppercase">
          {name}
        </span>

        <div className="flex items-baseline gap-px tabular-nums shrink-0">
          <span
            ref={countRef}
            className="font-mono text-md font-semibold leading-none text-accent"
          >
            0
          </span>
          <span className="font-mono text-(length:--fs-2xs) font-semibold text-accent/50 self-start mt-5">%</span>
        </div>
      </div>

      {/* Track */}
      <div className="relative h-px w-full bg-rule overflow-visible">
        <div
          ref={fillRef}
          className="absolute left-0 top-0 h-full w-0 bg-accent"
        />
      </div>

    </div>
  )
}
