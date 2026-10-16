import { cx } from '../../lib/cx'

/** Etichetta tecnica con contorno: tecnologie, categorie. */
export function Tag({ className, children }) {
  return (
    <span className={cx('u-label rounded-sm border border-line-strong px-8 py-3 text-fg-2', className)}>
      {children}
    </span>
  )
}
