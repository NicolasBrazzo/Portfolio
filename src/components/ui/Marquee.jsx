import { Plus } from 'lucide-react'

/**
 * Nastro di parole che scorre all'infinito e si ferma al passaggio del
 * mouse. Il contenuto è duplicato per chiudere il giro senza salti: la
 * copia è nascosta agli screen reader.
 */
export function Marquee({ items, label }) {
  const renderTrack = (hidden) =>
    items.map((item) => (
      <span
        key={`${item}-${hidden}`}
        aria-hidden={hidden || undefined}
        className="inline-flex items-center gap-34 pr-34 font-display text-marquee font-semibold transition-colors duration-(--duration-micro) hover:text-accent"
      >
        {item}
        <Plus aria-hidden size={18} strokeWidth={1.5} className="text-accent" />
      </span>
    ))

  return (
    <div
      role="region"
      aria-label={label}
      className="group/marquee overflow-hidden whitespace-nowrap border-y border-line py-34"
    >
      <div className="inline-flex animate-marquee group-hover/marquee:[animation-play-state:paused]">
        {renderTrack(false)}
        {renderTrack(true)}
      </div>
    </div>
  )
}
