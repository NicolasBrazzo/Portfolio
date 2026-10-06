import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { prefersReducedMotion } from "../../lib/motion";
import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { Timeline } from "../ui/Timeline";
import { TIMELINE_ITEMS, STATS } from "../../constants/about.js";


export function About() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const statsRef = useRef([]);
  const timelineRef = useRef([]);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const leftEl = leftRef.current;
      const statsEls = statsRef.current.filter(Boolean);
      const timelineEls = timelineRef.current.filter(Boolean);

      gsap.set([leftEl, ...statsEls, ...timelineEls], { opacity: 0, y: 32 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

          tl.to(leftEl, { opacity: 1, y: 0, duration: 0.65 })
            .to(
              statsEls,
              { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
              "-=0.35",
            )
            .to(
              timelineEls,
              { opacity: 1, y: 0, duration: 0.55, stagger: 0.12 },
              "-=0.30",
            );
        },
        once: true,
      });
    },
    { scope: sectionRef },
  );

  return (
    <Section id="about" ref={sectionRef}>
      <Container>
        <div className="grid lg:grid-cols-[1fr_1fr] gap-55 xl:gap-89 items-start">
          {/* ── Colonna sinistra – testo + stat ─────── */}
          <div className="flex flex-col gap-34">
            <div ref={leftRef} className="flex flex-col gap-34">
              <SectionTitle number="03" title="Chi sono" />

              {/* Intro – parole chiave in colore accento */}
              <div className="flex flex-col gap-21 text-base leading-relaxed text-graphite-2 max-w-lg">
                <p>
                  Sono un{" "}
                  <em className="text-graphite not-italic">web developer</em> con
                  una formazione{" "}
                  <em className="text-accent not-italic">full stack</em> e una
                  passione per il frontend. Oggi lavoro come sviluppatore in
                  un'azienda software, dove mi occupo soprattutto di interfacce,
                  e nel frattempo completo il percorso ITS da Web Developer.
                </p>
                <p>
                  Lavoro con{" "}
                  <em className="text-accent not-italic">React</em>,{" "}
                  <em className="text-accent not-italic">Node.js</em>,{" "}
                  <em className="text-accent not-italic">Express</em> e{" "}
                  <em className="text-accent not-italic">Tailwind</em>, e mi
                  trovo a mio agio su tutto il ciclo di un'applicazione: dal
                  database alle API, fino all'ultimo dettaglio dell'interfaccia.
                  Cerco codice leggibile, componenti riutilizzabili e{" "}
                  <em className="text-graphite not-italic">dettagli</em> curati.
                </p>
                <p>
                  Ho imparato a programmare da autodidatta e non ho più smesso:
                  sviluppo progetti personali per sperimentare nuove tecnologie,
                  e cerco un team dove portare questa{" "}
                  <em className="text-graphite not-italic">curiosità</em> ogni
                  giorno.
                </p>
              </div>
            </div>

            {/* Stat numbers */}
            <div className="grid grid-cols-3 gap-13 pt-8">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  ref={(el) => {
                    statsRef.current[i] = el;
                  }}
                  className="flex flex-col gap-5 p-21 u-surface u-rule"
                >
                  <span className="font-mono text-md font-semibold text-accent leading-none">
                    {stat.value}
                  </span>
                  <span className="font-mono text-(length:--fs-2xs) text-graphite-3 leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Colonna destra – timeline ──────────── */}
          <div className="lg:pt-89">
            <Timeline items={TIMELINE_ITEMS} itemRefs={timelineRef} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
