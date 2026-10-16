import { Link, useParams } from 'react-router-dom'
import { PageShell } from '../components/layout/PageShell'
import { ProjectHero } from '../components/sections/project/ProjectHero'
import { ProjectOverview } from '../components/sections/project/ProjectOverview'
import { ProjectFeatures } from '../components/sections/project/ProjectFeatures'
import { ProjectResults } from '../components/sections/project/ProjectResults'
import { ProjectGallery } from '../components/sections/project/ProjectGallery'
import { ProjectNext } from '../components/sections/project/ProjectNext'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { Label } from '../components/ui/Label'
import { Section } from '../components/ui/Section'
import { projects } from '../data/projects'
import { PROJECT_PAGE } from '../data/projectPage'

function NotFound() {
  const copy = PROJECT_PAGE.notFound

  return (
    <Section className="pt-144">
      <Container className="flex flex-col items-start gap-34">
        <Label tone="accent">{copy.label}</Label>
        <h1 className="m-0 font-display text-title font-extrabold">{copy.title}</h1>
        <p className="m-0 max-w-[48ch] text-fg-2">{copy.text}</p>
        <Button as={Link} to="/" variant="outline">
          {copy.back}
        </Button>
      </Container>
    </Section>
  )
}

export function ProjectDetail() {
  const { id } = useParams()
  const project = projects.find((p) => p.id === id)

  return (
    <PageShell>
      {project ? (
        <>
          <ProjectHero project={project} />
          {(project.overview || project.challenge || project.solution) && <ProjectOverview project={project} />}
          {project.features?.length > 0 && <ProjectFeatures features={project.features} />}
          {project.results?.length > 0 && <ProjectResults results={project.results} />}
          {project.gallery?.length > 0 && <ProjectGallery title={project.title} images={project.gallery} />}
          <ProjectNext />
        </>
      ) : (
        <NotFound />
      )}
    </PageShell>
  )
}
