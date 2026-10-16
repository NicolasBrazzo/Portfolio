import { useState } from 'react'
import { cx } from '../../lib/cx'
import { Label } from './Label'

/**
 * Cornice per immagini di progetto, con quote tecniche agli angoli:
 * in alto a sinistra le dimensioni reali dell'immagine (lette al
 * caricamento), in basso a destra un'etichetta libera.
 *
 * Senza `src` mostra un segnaposto a griglia con `placeholder`.
 * `className` sull'immagine permette effetti guidati dal genitore
 * (es. group-hover).
 */
export function MediaFrame({ src, alt, note, placeholder, imageClassName, className }) {
  const [size, setSize] = useState(null)

  const tickClass = 'absolute rounded-sm bg-void/70 px-8 py-3 backdrop-blur-sm'

  return (
    <div
      className={cx(
        'relative aspect-[16/10] max-w-full overflow-hidden rounded-md border border-line-strong bg-surface',
        className,
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={(e) => setSize(`${e.currentTarget.naturalWidth} × ${e.currentTarget.naturalHeight}`)}
          className={cx('block size-full object-cover', imageClassName)}
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] bg-[size:28px_28px]">
          <Label>{placeholder}</Label>
        </div>
      )}

      <Label tone="muted" className={cx(tickClass, 'top-13 left-13')}>
        {size ?? '— × —'}
      </Label>
      {note && (
        <Label tone="muted" className={cx(tickClass, 'right-13 bottom-13')}>
          {note}
        </Label>
      )}
    </div>
  )
}
