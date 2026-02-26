/**
 * Section – wrapper di sezione riutilizzabile.
 *
 * Props:
 * - id        → anchor per la navbar
 * - noise     → aggiunge overlay noise (u-noise)
 * - className → classi aggiuntive
 * - as        → tag HTML (default: section)
 * - ref       → forwardRef per GSAP e altri usi
 */
import { forwardRef } from 'react'

export const Section = forwardRef(function Section(
  { children, id, noise = false, className = '', as: Tag = 'section', ...rest },
  ref
) {
  return (
    <Tag
      ref={ref}
      id={id}
      className={[
        'relative overflow-hidden py-(--section-padding-y)',
        noise ? 'u-noise' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </Tag>
  )
})
