import { useRef } from 'react'
import { cx } from '../../lib/cx'
import { useMagnetic } from '../../hooks/useMagnetic'

const VARIANTS = {
  primary: 'bg-accent text-accent-ink hover:bg-fg hover:text-void',
  outline: 'border border-line-strong text-fg hover:border-accent hover:text-accent',
}

const ICON_SHIFT = {
  x: 'group-hover/btn:translate-x-5',
  y: 'group-hover/btn:translate-y-3',
}

/**
 * Bottone a pillola.
 *
 * - variant   → "primary" | "outline"
 * - as        → tag o componente (es. "a", Link)
 * - icon      → componente icona lucide, messo dopo il testo
 * - iconShift → "x" | "y": direzione in cui l'icona scivola all'hover
 * - magnetic  → segue leggermente il cursore
 */
export function Button({
  as: Tag = 'button',
  variant = 'primary',
  icon: Icon,
  iconShift = 'x',
  magnetic = false,
  className,
  children,
  ...rest
}) {
  const ref = useRef(null)
  useMagnetic(ref, { enabled: magnetic })

  return (
    <Tag
      ref={ref}
      className={cx(
        'group/btn inline-flex cursor-pointer select-none items-center gap-13 rounded-full px-21 py-13',
        'text-sm font-medium leading-none no-underline',
        'transition-colors duration-(--duration-micro) ease-out-expo',
        'disabled:cursor-wait disabled:opacity-60',
        VARIANTS[variant],
        className,
      )}
      {...rest}
    >
      {children}
      {Icon && (
        <Icon
          aria-hidden
          size={16}
          strokeWidth={1.75}
          className={cx('transition-transform duration-(--duration-micro) ease-out-expo', ICON_SHIFT[iconShift])}
        />
      )}
    </Tag>
  )
}
