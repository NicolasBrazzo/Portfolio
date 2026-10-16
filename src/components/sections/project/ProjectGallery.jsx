import { useRef } from 'react'
import { useReveal } from '../../../hooks/useReveal'
import { Container } from '../../ui/Container'
import { MediaFrame } from '../../ui/MediaFrame'
import { Section } from '../../ui/Section'
import { SectionHeader } from '../../ui/SectionHeader'
import { PROJECT_PAGE } from '../../../data/projectPage'

export function ProjectGallery({ title, images }) {
  const ref = useRef(null)
  useReveal(ref)
  const copy = PROJECT_PAGE.gallery

  return (
    <Section ref={ref}>
      <Container className="flex flex-col gap-55 lg:gap-89">
        <SectionHeader index={copy.index} title={copy.title} />

        <div className="grid grid-cols-1 gap-21 md:grid-cols-2">
          {images.map((src, i) => (
            <div key={src} data-reveal>
              <MediaFrame src={src} alt={`${title}, schermata ${i + 1}`} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
