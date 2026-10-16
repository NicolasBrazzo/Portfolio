import { cx } from '../../lib/cx'

/** Scheda tecnica etichetta → valore, allineata in due colonne. */
export function SpecList({ items, className }) {
  return (
    <dl className={cx('m-0 grid grid-cols-[auto_1fr] gap-x-21 gap-y-8', className)}>
      {items.map(({ label, value }) => (
        <div key={label} className="contents">
          <dt className="u-label text-fg-3">{label}</dt>
          <dd className="m-0 font-mono text-micro text-fg-2">{value}</dd>
        </div>
      ))}
    </dl>
  )
}
