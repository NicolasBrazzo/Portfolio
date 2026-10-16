import { useEffect, useRef } from 'react'
import { hasFinePointer } from '../../lib/motion'

const pad = (n) => String(Math.max(0, Math.round(n))).padStart(4, '0')

/**
 * Mirino con coordinate che segue il cursore dentro il contenitore
 * genitore (che deve essere `position: relative`). Decorativo: solo con
 * mouse o trackpad, invisibile agli screen reader.
 */
export function Crosshair() {
  const layerRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    const layer = layerRef.current
    const host = layer?.parentElement
    if (!host || !hasFinePointer()) return

    let frame = 0
    const move = (event) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = host.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        layer.style.setProperty('--cx', `${x}px`)
        layer.style.setProperty('--cy', `${y}px`)
        labelRef.current.textContent = `x ${pad(x)} · y ${pad(y)}`
      })
    }
    const enter = () => (layer.dataset.active = 'true')
    const leave = () => (layer.dataset.active = 'false')

    host.addEventListener('pointermove', move, { passive: true })
    host.addEventListener('pointerenter', enter)
    host.addEventListener('pointerleave', leave)
    return () => {
      cancelAnimationFrame(frame)
      host.removeEventListener('pointermove', move)
      host.removeEventListener('pointerenter', enter)
      host.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <div
      ref={layerRef}
      aria-hidden
      data-active="false"
      className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-(--duration-micro) data-[active=true]:opacity-100"
    >
      <span className="absolute inset-x-0 top-(--cy) h-px bg-accent/35" />
      <span className="absolute inset-y-0 left-(--cx) w-px bg-accent/35" />
      <span
        ref={labelRef}
        className="u-label absolute top-(--cy) left-(--cx) translate-x-13 translate-y-13 whitespace-nowrap text-accent"
      >
        x 0000 · y 0000
      </span>
    </div>
  )
}
