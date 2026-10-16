import { useRef } from 'react'
import { useReveal } from '../../../hooks/useReveal'
import { Container } from '../../ui/Container'
import { Label } from '../../ui/Label'
import { Section } from '../../ui/Section'
import { APPROACH } from '../../../data/home'

export function Approach() {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <Section ref={ref} padding="both" aria-label="Approccio">
      <Container className="grid grid-cols-12 gap-x-21 gap-y-21">
        <Label className="col-span-12 lg:col-span-2 lg:pt-13">{APPROACH.index}</Label>
        <blockquote
          data-reveal
          className="col-span-12 m-0 font-display text-quote font-semibold [text-wrap:balance] lg:col-span-10"
        >
          {APPROACH.before}
          <span className="u-hand text-accent">{APPROACH.hand}</span>
          <span className="text-fg-3">{APPROACH.after}</span>
        </blockquote>
      </Container>
    </Section>
  )
}
