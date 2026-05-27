import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { prefersReducedMotion } from "../../lib/motion";
import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { SkillBar } from "../ui/SkillBar";
import { skills } from "../../data/skills";

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
            number="03"
            title="Competenze"
            subtitle="Le tecnologie e gli strumenti con cui lavoro ogni giorno."
          />
        </div>

        {/* 3 colonne – una per categoria */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
          {Object.entries(skills).map(([key, category]) => (
            <div
              key={key}
              ref={(el) => {
                columnsRef.current[Object.keys(skills).indexOf(key)] = el;
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
                  {category.label}
                </span>
              </div>

              {/* Skill items */}
              <ul className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="group/skill relative inline-flex items-center gap-2 pl-3 pr-4 py-2 text-[13px] font-medium tracking-wide text-text/90 u-surface u-border-subtle rounded-full cursor-default overflow-hidden transition-all duration-300 ease-out hover:border-accent/60 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-12px_var(--color-accent-glow)]"
                  >
                    {/* glow di sfondo on hover */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300"
                      style={{
                        background:
                          'radial-gradient(circle at 0% 50%, var(--color-accent-glow), transparent 60%)',
                      }}
                    />
                    {/* dot accent */}
                    <span
                      aria-hidden
                      className="relative block w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent-glow)] transition-all duration-300 group-hover/skill:scale-125 group-hover/skill:shadow-[0_0_12px_var(--color-accent)]"
                    />
                    <span className="relative transition-colors duration-300 group-hover/skill:text-text">
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>  
      </Container>
    </Section>
  );
}
