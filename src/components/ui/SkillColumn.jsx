import { cx } from '../../lib/cx'
import { Label } from './Label'

/**
 * Colonna della scheda competenze: titolo con conteggio, voci in display.
 * `highlighted` aggiunge un leggero bagliore accento (es. strumenti AI).
 */
export function SkillColumn({ title, items, highlighted = false, className }) {
  return (
    <div
      className={cx(
        'flex min-w-0 flex-col gap-21 py-34',
        highlighted && 'bg-[linear-gradient(180deg,rgb(var(--accent-rgb)/0.07),transparent_70%)]',
        className,
      )}
    >
      <Label as="h3" className="m-0 flex justify-between gap-8 font-normal">
        {title}
        <span className="text-accent">{String(items.length).padStart(2, '0')}</span>
      </Label>
      <ul className="m-0 flex list-none flex-col p-0">
        {items.map((item) => (
          <li
            key={item}
            className="border-b border-dashed border-line py-8 font-display text-xl font-semibold transition-[color,padding] duration-(--duration-micro) ease-out-expo hover:pl-8 hover:text-accent"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
