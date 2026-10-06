/**
 * Timeline – lista verticale di step con dot a colore accento + linea connettore.
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
        className="absolute left-8 top-8 bottom-8 w-px bg-accent"
        aria-hidden
      />

      {items.map((item, i) => (
        <li
          key={i}
          ref={itemRefs ? (el) => { itemRefs.current[i] = el } : undefined}
          className="relative flex gap-21 pb-34 last:pb-0"
        >
          {/* Dot */}
          <div className="relative shrink-0 mt-5">
            <span className="block w-13 h-13 rounded-full border-2 border-accent bg-paper" />
          </div>

          {/* Contenuto */}
          <div className="flex flex-col gap-5 pt-2">
            <span className="font-mono text-(length:--fs-2xs) font-semibold tracking-[0.22em] uppercase text-graphite-3">
              {item.year}
            </span>
            <h4 className="text-base font-semibold text-graphite leading-tight">
              {item.title}
            </h4>
            <p className="text-base text-graphite-2 leading-relaxed">
              {item.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}
