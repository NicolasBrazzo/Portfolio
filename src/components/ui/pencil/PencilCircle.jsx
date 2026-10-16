import { PencilPath } from './PencilPath'

const CIRCLE =
  'M44 72 C 18 32, 122 6, 204 14 C 284 22, 298 62, 262 94 C 224 122, 88 118, 40 96 C 8 80, 18 44, 76 28'

/** Cerchia a mano il contenuto, come una correzione a margine. */
export function PencilCircle({ children, trigger = 'load', delay = 0.9 }) {
  return (
    <span className="relative inline-block">
      {children}
      <PencilPath
        d={CIRCLE}
        viewBox="0 0 300 120"
        trigger={trigger}
        delay={delay}
        duration={2}
        className="absolute -top-[10%] -left-[7%] h-[124%] w-[114%] text-fg/90"
      />
    </span>
  )
}
