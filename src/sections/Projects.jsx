import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/motion'
import { Section } from '../components/ui/Section'
import { Container } from '../components/ui/Container'
import { SectionTitle } from '../components/ui/SectionTitle'
import { ProjectCard } from '../components/ui/ProjectCard'
import { projects } from '../data/projects'
import readitImg from '../assets/Readit.png'
import snippifyImg from '../assets/Snippify.png'

export function Projects() {
  const sectionRef = useRef(null)
  const cardsRef   = useRef([])

  const projectsWithImages = projects.map((p) => {
    if (p.title === 'ReadIt') return { ...p, image: readitImg }
    if (p.title === 'Snippify') return { ...p, image: snippifyImg }
    return p
  })

  useGSAP(() => {
    if (prefersReducedMotion()) return

    const cards = cardsRef.current.filter(Boolean)
    if (!cards.length) return

    gsap.set(cards, { opacity: 0, y: 48 })

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 75%',
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power3.out',
          stagger: 0.12,
        })
      },
      once: true,
    })
  }, { scope: sectionRef })

  return (
    <Section id="projects" ref={sectionRef}>
      <Container className="flex flex-col gap-14">

        {/* Header sezione */}
        <SectionTitle
          number="01"
          title="Progetti selezionati"
          subtitle="Una selezione dei lavori che meglio rappresentano il mio approccio al design e allo sviluppo."
        />

        {/* Grid progetti */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsWithImages.map((project, i) => (
            <div
              key={project.id}
              ref={(el) => { cardsRef.current[i] = el }}
              className="h-full"
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>

      </Container>
    </Section>
  )
}
