import { cx } from '../../lib/cx'

const PADDING = {
  bottom: 'pb-(--section-y)',
  both: 'py-(--section-y)',
  none: '',
}

/**
 * Wrapper di sezione. Di base lo spazio sta solo sotto: le sezioni
 * impilate non sommano due padding tra loro.
 *
 * - padding → "bottom" | "both" | "none"
 * - ref     → passato direttamente (React 19), serve a GSAP
 */
export function Section({ as: Tag = 'section', padding = 'bottom', className, children, ...rest }) {
  return (
    <Tag className={cx('relative', PADDING[padding], className)} {...rest}>
      {children}
    </Tag>
  )
}
