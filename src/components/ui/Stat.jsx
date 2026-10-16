import { Label } from './Label'

/** Numero grande con suffisso in accento ed etichetta tecnica. */
export function Stat({ value, suffix, label }) {
  return (
    <div className="flex flex-col gap-5 border-t border-line pt-21">
      <span className="font-display text-stat font-extrabold tabular-nums">
        {value}
        {suffix && <span className="text-accent">{suffix}</span>}
      </span>
      <Label>{label}</Label>
    </div>
  )
}
