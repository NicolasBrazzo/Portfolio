import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useReveal } from '../../../hooks/useReveal'
import { Button } from '../../ui/Button'
import { Container } from '../../ui/Container'
import { Label } from '../../ui/Label'
import { Section } from '../../ui/Section'
import { PROJECT_PAGE } from '../../../data/projectPage'

/** Chiusura della pagina progetto: torna ai lavori o scrivimi. */
export function ProjectNext() {
  const ref = useRef(null)
  useReveal(ref)
  const copy = PROJECT_PAGE.next

  return (
    <Section ref={ref}>
      <Container>
        <div className="flex flex-col items-start gap-34 border-t border-line pt-89">
          <Label tone="accent">{copy.label}</Label>
          <h2 data-reveal className="m-0 font-display text-title font-extrabold">
            {copy.headline} <span className="u-hand text-accent">{copy.hand}</span>
          </h2>
          <p data-reveal className="m-0 max-w-[48ch] text-fg-2">
            {copy.text}
          </p>
          <div data-reveal className="flex flex-wrap gap-13">
            <Button as={Link} to="/#contatti" icon={ArrowRight} magnetic>
              {copy.contact}
            </Button>
            <Button as={Link} to="/#lavori" variant="outline" magnetic>
              <ArrowLeft aria-hidden size={16} strokeWidth={1.75} />
              {copy.others}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
