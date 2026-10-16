import { useEffect } from 'react'

/**
 * Scrive la posizione del puntatore come variabili CSS (--mx, --my) su
 * targetRef, relative al rettangolo dello stesso elemento. Con
 * `global: true` ascolta tutta la finestra e usa coordinate di viewport.
 *
 * Un solo aggiornamento per frame: il lavoro vero lo fa il CSS.
 * `onMove(x, y)` riceve le stesse coordinate (es. per un'etichetta).
 */
export function usePointerVars(targetRef, { global = false, onMove } = {}) {
  useEffect(() => {
    const el = targetRef.current
    if (!el) return

    const source = global ? window : el
    let frame = 0

    const handle = (event) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = global ? { left: 0, top: 0 } : el.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        el.style.setProperty('--mx', `${x}px`)
        el.style.setProperty('--my', `${y}px`)
        onMove?.(x, y)
      })
    }

    source.addEventListener('pointermove', handle, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      source.removeEventListener('pointermove', handle)
    }
  }, [targetRef, global, onMove])
}
