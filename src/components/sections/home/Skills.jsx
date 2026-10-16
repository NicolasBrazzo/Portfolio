import { useRef } from 'react'
import { cx } from '../../../lib/cx'
import { useReveal } from '../../../hooks/useReveal'
import { Container } from '../../ui/Container'
import { Section } from '../../ui/Section'
import { SectionHeader } from '../../ui/SectionHeader'
import { SkillColumn } from '../../ui/SkillColumn'
import { SKILL_GROUPS } from '../../../data/skills'
import { SKILLS_SECTION } from '../../../data/home'

export function Skills() {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <Section id="competenze" ref={ref}>
      <Container>
        <SectionHeader
          index={SKILLS_SECTION.index}
          title={SKILLS_SECTION.title}
          aside={SKILLS_SECTION.aside}
          underline={1}
          className="mb-55 lg:mb-89"
        />

        <div className="grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.id}
              data-reveal
              className="border-b border-line sm:odd:pr-21 sm:even:pl-21 lg:border-r lg:border-b-0 lg:px-34 lg:odd:pr-34 lg:even:pl-34 lg:first:pl-0 lg:last:border-r-0"
            >
              <SkillColumn
                title={group.title}
                items={group.items}
                highlighted={group.highlighted}
                className={cx(group.highlighted && 'px-21')}
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
