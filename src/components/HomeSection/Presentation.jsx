import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { prefersReducedMotion } from "../../lib/motion";
import { Section } from "../ui/Section";
import { Container } from "../ui/Container";

export const Presentation = () => {
  const sectionRef = useRef(null);
  const kickerRef = useRef(null);
  const quoteRef = useRef(null);
  const ruleRef = useRef(null);

  useGSAP(
    () => { 
      if (prefersReducedMotion()) return;

      const els = [kickerRef.current, quoteRef.current, ruleRef.current].filter(
        Boolean,
      );
      gsap.set(els, { opacity: 0, y: 28 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.to(els, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.15,
          });
        },
        once: true,
      });
    },
    { scope: sectionRef },
  );

  return (
    <Section id="presentation" ref={sectionRef}>
      <Container>
        <div className="mx-auto flex flex-col items-center gap-34 max-w-3xl text-center">
          <span
            ref={kickerRef}
            className="font-mono text-(length:--fs-2xs) font-semibold tracking-[0.28em] uppercase text-accent"
          >
            Manifesto
          </span>

          <blockquote
            ref={quoteRef}
            className="font-display text-md md:text-lg font-medium leading-[1.3] tracking-tight text-graphite"
          >
            Vivo nel punto in cui{" "}
            <em className="font-display italic text-accent">
              il design incontra il codice
            </em>
            . Mi piace far sembrare semplice ciò che è complesso, e dare la
            stessa attenzione a come una cosa appare e a come è fatta dentro.
          </blockquote>

          <div ref={ruleRef} className="w-55 h-px bg-rule" aria-hidden />
        </div>
      </Container>
    </Section>
  );
};
