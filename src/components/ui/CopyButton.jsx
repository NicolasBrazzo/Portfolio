import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'

/**
 * Copia `text` negli appunti e conferma per qualche istante.
 * Se gli appunti non sono disponibili seleziona il testo di `targetRef`,
 * così l'utente può copiarlo a mano.
 */
export function CopyButton({ text, targetRef, label, copiedLabel }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)

  useEffect(() => () => clearTimeout(timer.current), [])

  const selectTarget = () => {
    const node = targetRef?.current
    if (!node) return
    const range = document.createRange()
    range.selectNodeContents(node)
    const selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 1800)
    } catch {
      selectTarget()
    }
  }

  const Icon = copied ? Check : Copy

  return (
    <button
      type="button"
      onClick={copy}
      className="u-label inline-flex cursor-pointer items-center gap-8 rounded-full border border-line-strong bg-transparent px-13 py-8 text-fg-2 transition-colors duration-(--duration-micro) hover:border-accent hover:text-accent"
    >
      <Icon aria-hidden size={13} strokeWidth={1.75} />
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  )
}
