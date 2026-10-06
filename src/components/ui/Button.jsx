/**
 * Button – componente UI base.
 *
 * Varianti:
 * - primary  → sfondo a colore accento, testo su carta
 * - outline  → hairline su --rule, testo grafite; hover accento
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
    'inline-flex items-center gap-13 px-34 py-13 text-base tracking-wide transition-colors duration-200 cursor-pointer select-none'

  const variants = {
    primary: 'bg-accent text-paper font-semibold hover:opacity-90',
    outline: 'u-rule text-graphite font-medium hover:border-accent hover:text-accent',
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
