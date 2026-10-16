import { cx } from '../../lib/cx'

const TONES = {
  subtle: 'text-fg-3',
  muted: 'text-fg-2',
  accent: 'text-accent',
}

/** Etichetta tecnica in mono maiuscolo: occhielli, quote, metadati. */
export function Label({ as: Tag = 'span', tone = 'subtle', className, children, ...rest }) {
  return (
    <Tag className={cx('u-label', TONES[tone], className)} {...rest}>
      {children}
    </Tag>
  )
}
