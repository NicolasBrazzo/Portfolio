import { useRef } from 'react'
import { useReveal } from '../../../hooks/useReveal'
import { Container } from '../../ui/Container'
import { Label } from '../../ui/Label'
import { Section } from '../../ui/Section'
import { SectionHeader } from '../../ui/SectionHeader'
import { PROJECT_PAGE } from '../../../data/projectPage'

/** Panoramica + coppia problema / approccio. */
export function ProjectOverview({ project }) {
  const ref = useRef(null)
  useReveal(ref)
  const copy = PROJECT_PAGE

  const panels = [
    { label: copy.challenge.label, text: project.challenge },
    { label: copy.solution.label, text: project.solution },
  ].filter((panel) => panel.text)

  return (
    <Section ref={ref}>
      <Container className="flex flex-col gap-55 lg:gap-89">
        <SectionHeader index={copy.overview.index} title={copy.overview.title} />

        {project.overview && (
          <p data-reveal className="m-0 max-w-[60ch] text-lg leading-relaxed tracking-normal text-fg-2 lg:ml-[16.66%]">
            {project.overview}
          </p>
        )}

        {panels.length > 0 && (
          <div className="grid grid-cols-1 gap-21 md:grid-cols-2">
            {panels.map((panel) => (
              <div key={panel.label} data-reveal className="flex flex-col gap-21 rounded-md border border-line bg-surface p-34">
                <Label tone="accent">{panel.label}</Label>
                <p className="m-0 text-fg-2">{panel.text}</p>
              </div>
            ))}
          </div>
        )}
      </Container>
    </Section>
  )
}
