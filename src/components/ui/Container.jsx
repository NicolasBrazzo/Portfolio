import { cx } from '../../lib/cx'

/** Larghezza massima del sito + gutter laterale. */
export function Container({ as: Tag = 'div', className, children, ...rest }) {
  return (
    <Tag className={cx('mx-auto w-full max-w-(--container-max) u-gutter', className)} {...rest}>
      {children}
    </Tag>
  )
}
