/**
 * Timeline – lista verticale di step con dot arancio + linea connettore.
 *
 * Props:
 * - items[]    → { year, title, description }
 * - itemRefs   → callback ref array per GSAP esterno
 */
export function Timeline({ items = [], itemRefs }) {
  return (
    <ol className="relative flex flex-col">
      {/* Linea verticale continua */}
      <div
        className="absolute left-[7px] top-2 bottom-2 w-px"
        style={{ background: 'linear-gradient(to bottom, var(--color-accent), rgba(255,92,0,0.08))' }}
        aria-hidden
      />

      {items.map((item, i) => (
        <li
          key={i}
          ref={itemRefs ? (el) => { itemRefs.current[i] = el } : undefined}
          className="relative flex gap-6 pb-10 last:pb-0"
        >
          {/* Dot */}
          <div className="relative shrink-0 mt-1.5">
            <span
              className="block w-3.5 h-3.5 rounded-full border-2 border-accent bg-bg"
              style={{ boxShadow: '0 0 8px var(--color-accent-glow)' }}
            />
          </div>

          {/* Contenuto */}
          <div className="flex flex-col gap-1.5 pt-0.5">
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-accent">
              {item.year}
            </span>
            <h4 className="text-base font-bold text-text leading-tight">
              {item.title}
            </h4>
            <p className="text-sm text-muted leading-relaxed">
              {item.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}
