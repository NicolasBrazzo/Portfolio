import { useRef } from 'react'
import { useReveal } from '../../../hooks/useReveal'
import { Container } from '../../ui/Container'
import { ProjectRow } from '../../ui/ProjectRow'
import { Section } from '../../ui/Section'
import { SectionHeader } from '../../ui/SectionHeader'
import { projects } from '../../../data/projects'
import { PROJECTS_SECTION } from '../../../data/home'

const toSpecs = (project, labels) => [
  { label: labels.year, value: project.year },
  { label: labels.role, value: project.role },
  { label: labels.stack, value: project.stack.slice(0, 4).join(' · ') },
]

export function Projects() {
  const ref = useRef(null)
  useReveal(ref)
  const copy = PROJECTS_SECTION

  return (
    <Section id="lavori" ref={ref}>
      <Container>
        <SectionHeader index={copy.index} title={copy.title} aside={copy.aside} className="mb-55 lg:mb-89" />

        <div className="flex flex-col border-t border-line">
          {projects.map((project, i) => (
            <div key={project.id} data-reveal>
              <ProjectRow
                index={`P—${String(i + 1).padStart(2, '0')}`}
                title={project.title}
                tag={project.tag}
                description={project.description}
                specs={toSpecs(project, copy.specLabels)}
                image={project.image}
                imageAlt={`Schermata di ${project.title}`}
                mediaNote={project.liveUrl ? copy.liveNote : null}
                placeholder={copy.placeholder}
                to={`/projects/${project.id}`}
                cta={copy.cta}
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
