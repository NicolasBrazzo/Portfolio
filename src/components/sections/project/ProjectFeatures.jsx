import { useRef } from 'react'
import { useReveal } from '../../../hooks/useReveal'
import { Container } from '../../ui/Container'
import { Label } from '../../ui/Label'
import { Section } from '../../ui/Section'
import { SectionHeader } from '../../ui/SectionHeader'
import { PROJECT_PAGE } from '../../../data/projectPage'

export function ProjectFeatures({ features }) {
  const ref = useRef(null)
  useReveal(ref)
  const copy = PROJECT_PAGE.features

  return (
    <Section ref={ref}>
      <Container className="flex flex-col gap-55 lg:gap-89">
        <SectionHeader index={copy.index} title={copy.title} aside={copy.aside} underline={1} />

        <ol className="m-0 grid list-none grid-cols-1 border-t border-line p-0 md:grid-cols-3">
          {features.map((feature, i) => (
            <li
              key={feature.title}
              data-reveal
              className="flex flex-col gap-13 border-b border-line py-34 md:border-r md:border-b-0 md:px-34 md:first:pl-0 md:last:border-r-0"
            >
              <Label tone="accent">{String(i + 1).padStart(2, '0')}</Label>
              <h3 className="m-0 font-display text-xl font-semibold">{feature.title}</h3>
              <p className="m-0 text-fg-2">{feature.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
