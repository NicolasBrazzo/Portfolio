import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { prefersReducedMotion } from "../../lib/motion";
import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { skills } from "../../data/skills";

const { ai: aiSkills, ...codeSkillCategories } = skills;

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

  const codeCategoriesCount = Object.keys(codeSkillCategories).length;

  return (
    <Section id="skills" ref={sectionRef}>
      <Container className="flex flex-col gap-55">
        {/* Header */}
        <div ref={titleRef}>
          <SectionTitle
            number="02"
            title="Competenze"
            subtitle="Le tecnologie e gli strumenti con cui lavoro ogni giorno."
          />
        </div>

        {/* Due zone: competenze tecniche a sinistra, AI a destra */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-34 lg:gap-55 items-start">
          {/* Competenze tecniche */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-34 lg:gap-55">
            {Object.entries(codeSkillCategories).map(([key, category], i) => (
              <div
                key={key}
                ref={(el) => {
                  columnsRef.current[i] = el;
                }}
                className="flex flex-col"
              >
                {/* Category label */}
                <div className="mb-34">
                  <span className="font-mono text-(length:--fs-2xs) font-semibold tracking-[0.28em] uppercase text-accent">
                    {category.label}
                  </span>
                </div>

                {/* Skill items */}
                <ul className="flex flex-wrap gap-8">
                  {category.skills.map((skill) => (
                    <SkillPill key={skill} skill={skill} />
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Competenze AI – pannello ingrandito */}
          <div
            ref={(el) => {
              columnsRef.current[codeCategoriesCount] = el;
            }}
            className="relative w-full lg:w-233 shrink-0 u-rule bg-paper-2 p-34 pt-55 overflow-hidden"
          >
            {/* Category label */}
            <div className="relative mb-34">
              <span className="font-mono text-(length:--fs-2xs) font-semibold tracking-[0.28em] uppercase text-accent">
                {aiSkills.label}
              </span>
            </div>

            {/* Skill items */}
            <ul className="relative flex flex-wrap gap-8">
              {aiSkills.skills.map((skill) => (
                <SkillPill key={skill} skill={skill} />
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function SkillPill({ skill }) {
  return (
    <li className="group/skill relative inline-flex items-center gap-8 pl-13 pr-13 py-8 text-base font-medium tracking-wide text-graphite/90 u-surface u-rule cursor-default overflow-hidden transition-all duration-300 ease-out hover:border-accent/60 hover:-translate-y-2">
      {/* dot accent */}
      <span
        aria-hidden
        className="relative block w-5 h-5 rounded-full bg-accent transition-all duration-300 group-hover/skill:scale-125"
      />
      <span className="relative transition-colors duration-300 group-hover/skill:text-graphite">
        {skill}
      </span>
    </li>
  );
}
