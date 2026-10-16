import { useRef } from 'react'
import { useReveal } from '../../../hooks/useReveal'
import { Container } from '../../ui/Container'
import { Section } from '../../ui/Section'
import { SectionHeader } from '../../ui/SectionHeader'
import { Stat } from '../../ui/Stat'
import { PROJECT_PAGE } from '../../../data/projectPage'

export function ProjectResults({ results }) {
  const ref = useRef(null)
  useReveal(ref)
  const copy = PROJECT_PAGE.results

  return (
    <Section ref={ref}>
      <Container className="flex flex-col gap-55 lg:gap-89">
        <SectionHeader index={copy.index} title={copy.title} underline={2} />

        <div className="grid grid-cols-1 gap-34 sm:grid-cols-3">
          {results.map((result) => (
            <div key={result.label} data-reveal>
              <Stat value={result.value} label={result.label} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
