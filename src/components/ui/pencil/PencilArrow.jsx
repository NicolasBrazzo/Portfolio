import { PencilPath } from './PencilPath'

const ARROW = 'M56 6 C 40 4, 20 12, 8 32 M8 32 L 6 20 M8 32 L 19 28'

/** Freccia a mano che punta in basso a sinistra, per le annotazioni. */
export function PencilArrow({ className, trigger = 'load', delay = 1.4 }) {
  return (
    <PencilPath
      d={ARROW}
      viewBox="0 0 58 40"
      trigger={trigger}
      delay={delay}
      duration={1}
      strokeWidth={1.4}
      className={className}
    />
  )
}
