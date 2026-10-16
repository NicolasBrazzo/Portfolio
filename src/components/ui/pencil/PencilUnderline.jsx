import { PencilPath } from './PencilPath'

const LINES = [
  'M2 14 C 50 4, 120 4, 198 10',
  'M2 12 C 60 16, 130 2, 198 8',
  'M2 10 C 70 2, 140 16, 198 9',
]

/**
 * Sottolineatura a mano in colore accento.
 * - variant → 0 | 1 | 2: tre tratti diversi, per non ripetere lo stesso gesto
 */
export function PencilUnderline({ children, variant = 0, trigger = 'scroll' }) {
  return (
    <span className="relative inline-block">
      {children}
      <PencilPath
        d={LINES[variant % LINES.length]}
        viewBox="0 0 200 20"
        trigger={trigger}
        delay={0.2}
        duration={1.2}
        strokeWidth={2.4}
        className="absolute -bottom-[0.12em] -left-[2%] h-[0.32em] w-[104%] text-accent"
      />
    </span>
  )
}
