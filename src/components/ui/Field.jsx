import { cx } from '../../lib/cx'
import { Label } from './Label'

/**
 * Campo di form con etichetta tecnica visibile sopra.
 * - multiline → textarea invece di input
 */
export function Field({ id, label, multiline = false, className, ...rest }) {
  const Control = multiline ? 'textarea' : 'input'

  return (
    <div className={cx('flex flex-col gap-8', className)}>
      <Label as="label" htmlFor={id}>
        {label}
      </Label>
      <Control
        id={id}
        className={cx(
          'w-full rounded-sm border border-line-strong bg-surface px-13 py-13 text-base text-fg',
          'placeholder:text-fg-3 transition-colors duration-(--duration-micro)',
          'focus:border-accent focus:outline-none disabled:opacity-50',
          multiline && 'resize-none',
        )}
        {...rest}
      />
    </div>
  )
}
