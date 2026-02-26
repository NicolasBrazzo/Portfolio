/**
 * Button – componente UI base.
 *
 * Varianti:
 * - primary  → sfondo arancione, testo scuro
 * - outline  → bordo bianco sottile, testo chiaro; hover arancione
 *
 * Prop `as` permette di renderizzare come <a> (es. link esterno).
 */
export function Button({
  children,
  variant = 'primary',
  as: Tag = 'button',
  className = '',
  ...rest
}) {
  const base =
    'inline-flex items-center gap-3 px-7 py-3.5 text-sm tracking-wide transition-colors duration-200 cursor-pointer select-none'

  const variants = {
    primary: 'bg-accent text-bg font-bold hover:bg-accent-warm u-btn-shine',
    outline: 'border border-white/15 text-text font-medium hover:border-accent hover:text-accent',
  }

  return (
    <Tag
      className={[base, variants[variant] ?? variants.primary, className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </Tag>
  )
}
