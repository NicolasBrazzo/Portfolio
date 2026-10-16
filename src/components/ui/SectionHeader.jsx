import { cx } from '../../lib/cx'
import { Label } from './Label'
import { PencilUnderline } from './pencil/PencilUnderline'

/**
 * Intestazione di sezione su griglia a 12 colonne:
 * indice tecnico | titolo display con parola "a mano" sottolineata | nota.
 *
 * - index → "01 / Lavori"
 * - title → { text, hand } — `hand` è la parola in corsivo accento
 * - aside → testo breve a destra (opzionale)
 * - underline → variante del tratto a matita (0, 1, 2)
 */
export function SectionHeader({ index, title, aside, underline = 0, as: Heading = 'h2', className }) {
  return (
    <div className={cx('grid grid-cols-12 items-end gap-x-21 gap-y-21', className)}>
      <Label className="col-span-12 self-start lg:col-span-2 lg:pt-13">{index}</Label>

      <Heading className="col-span-12 m-0 font-display text-title font-extrabold lg:col-span-7">
        {title.text}{' '}
        {title.hand && (
          <PencilUnderline variant={underline}>
            <span className="u-hand text-accent">{title.hand}</span>
          </PencilUnderline>
        )}
      </Heading>

      {aside && <p className="col-span-12 m-0 text-sm text-fg-2 lg:col-span-3">{aside}</p>}
    </div>
  )
}
