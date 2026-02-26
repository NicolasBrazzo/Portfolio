/**
 * SectionTitle – intestazione uniforme per tutte le sezioni.
 *
 * Props:
 * - number     → numero sezione (es. "01") – opzionale
 * - title      → titolo principale (Satoshi bold, oversize)
 * - subtitle   → sottotitolo opzionale (Satoshi regular, muted)
 * - align      → "left" | "center"  (default: "left")
 * - className  → classi extra sul wrapper
 */
export function SectionTitle({
  number,
  title,
  subtitle,
  align = 'left',
  className = '',
}) {
  const isCenter = align === 'center'

  return (
    <div className={['flex flex-col gap-3', isCenter ? 'items-center text-center' : 'items-start', className].filter(Boolean).join(' ')}>

      {number && (
        <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent font-mono">
          {number}
        </span>
      )}

      <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight text-text">
        {title}
      </h2>

      {subtitle && (
        <p className="text-base text-muted leading-relaxed max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}
