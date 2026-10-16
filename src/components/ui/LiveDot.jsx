/** Pallino di stato "online" che respira. */
export function LiveDot() {
  return (
    <span
      aria-hidden
      className="inline-block size-5 rounded-full bg-live shadow-[0_0_10px_var(--live)] animate-blink"
    />
  )
}
