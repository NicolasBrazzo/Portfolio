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
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 xl:gap-24 items-start">
          {/* ── Colonna sinistra – testo + stat ─────── */}
          <div className="flex flex-col gap-10">
            <div ref={leftRef} className="flex flex-col gap-8">
              <SectionTitle number="04" title="Chi sono" />

              {/* Intro – parole chiave in Instrument Serif italic + arancio */}
              <div className="flex flex-col gap-5 text-base md:text-lg leading-relaxed text-muted max-w-lg">
                <p>
                  Sono un{" "}
                  <em className="text-text not-italic">frontend developer</em> e{" "}
                  <em className="text-accent not-italic">UI designer</em> con
                  una forte ossessione per i{" "}
                  <em className="text-text not-italic">dettagli</em>. Progetto
                  partendo dal sistema, non dall'ispirazione del momento.
                </p>
                <p>
                  Il mio approccio unisce rigore da ingegnere e sensibilità da
                  designer: ogni componente deve essere coerente, scalabile e
                  bello da usare. Lavoro con{" "}
                  <em className="text-accent not-italic">React</em>,{" "}
                  <em className="text-accent not-italic">Tailwind</em> e{" "}
                  <em className="text-accent not-italic">GSAP</em> per costruire
                  interfacce che si muovono bene, si caricano veloce e si usano
                  con piacere.
                </p>
                <p>
                  Quando non scrivo codice, studio tipografia, esploro design
                  system di altri e cerco la combinazione perfetta tra{" "}
                  <em className="text-text not-italic">forma</em> e{" "}
                  <em className="text-text not-italic">funzione</em>.
                </p>
              </div>
            </div>

            {/* Stat numbers */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 pt-2">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  ref={(el) => {
                    statsRef.current[i] = el;
                  }}
                  className="flex flex-col gap-1 p-5 u-surface u-border-subtle rounded-xl"
                >
                  <span className="text-3xl font-black text-accent leading-none">
                    {stat.value}
                  </span>
                  <span className="text-[11px] text-muted leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Colonna destra – timeline ──────────── */}
          <div className="lg:pt-18">
            <Timeline items={TIMELINE_ITEMS} itemRefs={timelineRef} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
