/**
 * SectionTitle – intestazione uniforme per tutte le sezioni.
 *
 * Props:
 * - number     → numero sezione (es. "01") – opzionale
 * - title      → titolo principale (display, peso medio)
 * - subtitle   → sottotitolo opzionale (testo, secondario)
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
    <div className={['flex flex-col gap-13', isCenter ? 'items-center text-center' : 'items-start', className].filter(Boolean).join(' ')}>

      {number && (
        <span className="text-micro font-semibold tracking-[0.3em] uppercase text-accent font-mono">
          {number}
        </span>
      )}

      <h2 className="font-display text-lg font-medium leading-tight tracking-tighter text-graphite">
        {title}
      </h2>

      {subtitle && (
        <p className="text-base text-graphite-2 leading-relaxed max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}
