import { useRef } from 'react'
import { useReveal } from '../../../hooks/useReveal'
import { Container } from '../../ui/Container'
import { JourneyRuler } from '../../ui/JourneyRuler'
import { Section } from '../../ui/Section'
import { SectionHeader } from '../../ui/SectionHeader'
import { Stat } from '../../ui/Stat'
import { JOURNEY_SECTION } from '../../../data/home'
import { JOURNEY_INTRO, JOURNEY_STEPS, STATS } from '../../../data/journey'

export function Journey() {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <Section id="percorso" ref={ref}>
      <Container>
        <SectionHeader
          index={JOURNEY_SECTION.index}
          title={JOURNEY_SECTION.title}
          underline={2}
          className="mb-55 lg:mb-89"
        />

        <div className="mb-89 grid grid-cols-12 gap-x-21 gap-y-55 lg:mb-144">
          <div className="col-span-12 flex flex-col gap-21 text-lg tracking-normal text-fg-2 lg:col-span-6 lg:col-start-3">
            {JOURNEY_INTRO.map((paragraph) => (
              <p key={paragraph.before} data-reveal className="m-0 leading-relaxed">
                {paragraph.before}
                {paragraph.strong && <strong className="font-medium text-fg">{paragraph.strong}</strong>}
                {paragraph.after}
              </p>
            ))}
          </div>

          <div className="col-span-12 grid grid-cols-1 gap-34 sm:grid-cols-3 lg:col-span-3 lg:col-start-10 lg:grid-cols-1">
            {STATS.map((stat) => (
              <div key={stat.label} data-reveal>
                <Stat {...stat} />
              </div>
            ))}
          </div>
        </div>

        <JourneyRuler steps={JOURNEY_STEPS} />
      </Container>
    </Section>
  )
}
