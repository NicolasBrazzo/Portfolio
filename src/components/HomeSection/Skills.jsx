import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { prefersReducedMotion } from "../../lib/motion";
import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { SkillBar } from "../ui/SkillBar";
import { skills, skillCategories } from "../../data/skills";

export function Skills() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const columnsRef = useRef([]);
  const [triggered, setTriggered] = useState(false);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        setTriggered(true);
        return;
      }

      const cols = columnsRef.current.filter(Boolean);
      gsap.set(titleRef.current, { opacity: 0, y: 24 });
      gsap.set(cols, { opacity: 0, y: 40 });

      /* Titolo entra prima, poi le colonne in stagger */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
          });
          gsap.to(cols, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.14,
            delay: 0.2,
          });
        },
        once: true,
      });

      /* Barre + count-up al 60% di entrata */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        onEnter: () => setTriggered(true),
        once: true,
      });
    },
    { scope: sectionRef },
  );

  return (
    <Section id="skills" ref={sectionRef} noise>
      <Container className="flex flex-col gap-16">
        {/* Header */}
        <div ref={titleRef}>
          <SectionTitle
            number="02"
            title="Competenze"
            subtitle="Le tecnologie e gli strumenti con cui lavoro ogni giorno."
          />
        </div>

        {/* 3 colonne – una per categoria */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
          {skillCategories.map(({ id, label }, i) => {
            const categorySkills = skills.filter((s) => s.category === id);

            return (
              <div
                key={id}
                ref={(el) => {
                  columnsRef.current[i] = el;
                }}
                className="flex flex-col"
              >
                {/* Category label */}
                <div className="flex items-center gap-3 mb-8">
                  <span
                    className="block w-5 h-px bg-accent shrink-0"
                    aria-hidden
                  />
                  <span className="text-[11px] font-bold tracking-[0.28em] uppercase text-accent">
                    {label}
                  </span>
                </div>

                {/* Skill items */}
                <div className="flex flex-col">
                  {categorySkills.map((skill) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      percent={skill.percent}
                      triggered={triggered}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
