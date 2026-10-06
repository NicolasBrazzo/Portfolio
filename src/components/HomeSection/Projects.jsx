import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { prefersReducedMotion } from "../../lib/motion";
import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { projects } from "../../data/projects";
import { ProjectCard } from "../ui/ProjectCard";

export function Projects() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const cards = cardsRef.current.filter(Boolean);
      if (!cards.length) return;

      gsap.set(cards, { opacity: 0, y: 48 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            stagger: 0.12,
          });
        },
        once: true,
      });
    },
    { scope: sectionRef },
  );

  return (
    <Section id="projects" ref={sectionRef}>
      <Container className="flex flex-col gap-55">
        {/* Header sezione */}
        <SectionTitle
          number="01"
          title="Progetti"
          subtitle="I progetti più significativi, con focus su processo e risultati"
        />

        {/* Grid progetti */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-21">
          {projects.map((project, i) => (
            <div
              key={project.id}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="h-full"
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
