import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { useReveal } from '../../../hooks/useReveal'
import { Button } from '../../ui/Button'
import { Container } from '../../ui/Container'
import { Label } from '../../ui/Label'
import { MediaFrame } from '../../ui/MediaFrame'
import { Section } from '../../ui/Section'
import { Tag } from '../../ui/Tag'
import { PROJECT_PAGE } from '../../../data/projectPage'

export function ProjectHero({ project }) {
  const ref = useRef(null)
  useReveal(ref)
  const copy = PROJECT_PAGE

  const meta = [
    { label: copy.meta.year, value: project.year },
    { label: copy.meta.duration, value: project.duration },
    { label: copy.meta.client, value: project.client },
    { label: copy.meta.role, value: project.role },
  ]

  return (
    <Section ref={ref} className="pt-89 lg:pt-144">
      <Container className="flex flex-col gap-55">
        <Link
          to="/#lavori"
          className="u-label group inline-flex w-fit items-center gap-8 text-fg-2 no-underline transition-colors duration-(--duration-micro) hover:text-accent"
        >
          <ArrowLeft
            aria-hidden
            size={14}
            strokeWidth={1.75}
            className="transition-transform duration-(--duration-micro) ease-out-expo group-hover:-translate-x-3"
          />
          {copy.back}
        </Link>

        <div className="flex flex-col gap-34">
          <Label tone="accent" data-reveal>
            {project.role}
          </Label>
          <h1 data-reveal className="m-0 font-display text-hero font-extrabold">
            {project.title}{' '}
            {project.tag && <span className="u-hand text-[0.5em] text-accent">{project.tag}</span>}
          </h1>
          <p data-reveal className="m-0 max-w-[60ch] text-lg leading-relaxed tracking-normal text-fg-2">
            {project.description}
          </p>
        </div>

        <dl data-reveal className="m-0 grid grid-cols-2 gap-34 border-t border-line pt-34 md:grid-cols-4">
          {meta.map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-8">
              <dt className="u-label text-fg-3">{label}</dt>
              <dd className="m-0 font-display text-lg font-semibold">{value ?? '—'}</dd>
            </div>
          ))}
        </dl>

        {project.stack?.length > 0 && (
          <div data-reveal className="flex flex-wrap gap-8">
            {project.stack.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        )}

        {(project.liveUrl || project.repoUrl) && (
          <div data-reveal className="flex flex-wrap gap-13">
            {project.liveUrl && (
              <Button as="a" href={project.liveUrl} target="_blank" rel="noopener noreferrer" icon={ArrowUpRight} magnetic>
                {copy.visit}
              </Button>
            )}
            {project.repoUrl && (
              <Button
                as="a"
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                icon={ArrowUpRight}
                magnetic
              >
                {copy.code}
              </Button>
            )}
          </div>
        )}

        <MediaFrame
          src={project.image}
          alt={`Schermata di ${project.title}`}
          note={project.liveUrl ? copy.liveNote : null}
          placeholder={copy.placeholder}
          className="mt-34"
        />
      </Container>
    </Section>
  )
}
