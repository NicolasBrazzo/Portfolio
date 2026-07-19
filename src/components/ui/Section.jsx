/**
 * Section – wrapper di sezione riutilizzabile.
 *
 * Props:
 * - id        → anchor per la navbar
 * - className → classi aggiuntive
 * - as        → tag HTML (default: section)
 * - ref       → forwardRef per GSAP e altri usi
 */
import { forwardRef } from 'react'

export const Section = forwardRef(function Section(
  { children, id, className = '', as: Tag = 'section', ...rest },
  ref
) {
  return (
    <Tag
      ref={ref}
      id={id}
      className={['relative overflow-hidden py-(--section-padding-y)', className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </Tag>
  )
})
