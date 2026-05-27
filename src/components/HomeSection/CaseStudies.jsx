import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { prefersReducedMotion } from "../../lib/motion";
import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { caseStudies } from "../../data/caseStudies";
import readitImg from "../../assets/Readit.png";
import snippifyImg from "../../assets/Snippify.png";
import voltaImg from "../../assets/Volta.png";
import { CaseStudyCard } from "../ui/CaseStudyCaard";

export function CaseStudies() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const caseStudyWithImages = caseStudies.map((p) => {
    if (p.title === "ReadIt") return { ...p, image: readitImg };
    if (p.title === "Snippify") return { ...p, image: snippifyImg };
    if (p.title === "Volta") return { ...p, image: voltaImg };
    return p;
  });

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
    <Section id="case-studies" ref={sectionRef}>
      <Container className="flex flex-col gap-14">
        {/* Header sezione */}
        <SectionTitle
          number="02"
          title="Casi studio"
          subtitle="I progetti più significativi, con focus su processo e risultati"
        />

        {/* Grid progetti */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudyWithImages.map((project, i) => (
            <div
              key={project.id}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="h-full"
            >
              <CaseStudyCard {...project} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
