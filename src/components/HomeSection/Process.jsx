import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { prefersReducedMotion } from "../../lib/motion";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionTitle } from "../ui/SectionTitle";

const steps = [
  {
    number: "01",
    label: "Discover",
    title: "Ricerca e scoperta",
    description:
      "Analizzo il progetto, il target e gli obiettivi. Niente pixel finché il problema non è chiaro.",
  },
  {
    number: "02",
    label: "Define",
    title: "Strategia e wireframe",
    description:
      "Architettura delle informazioni, flussi e gerarchie. La struttura prima del visivo.",
  },
  {
    number: "03",
    label: "Design",
    title: "Design e prototipo",
    description:
      "Interfacce curate e coerenti, costruite da un sistema scalabile — non da un'ispirazione casuale.",
  },
  {
    number: "04",
    label: "Deliver",
    title: "Sviluppo e consegna",
    description:
      "Codice React/Tailwind pulito, performante e accessibile. Pronto per la produzione.",
  },
];

export const Process = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const pathRef = useRef(null);
  const dotsRef = useRef([]);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const cards = cardsRef.current.filter(Boolean);
      const dots = dotsRef.current.filter(Boolean);
      const path = pathRef.current;

      if (cards.length) gsap.set(cards, { opacity: 0, y: 48 });
      if (dots.length) gsap.set(dots, { scale: 0, transformOrigin: "center" });

      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

          if (path) {
            tl.to(path, {
              strokeDashoffset: 0,
              duration: 1.6,
              ease: "power2.inOut",
            });
          }

          if (cards.length) {
            tl.to(
              cards,
              {
                opacity: 1,
                y: 0,
                duration: 0.65,
                stagger: 0.14,
              },
              "-=1.2",
            );
          }

          if (dots.length) {
            tl.to(
              dots,
              {
                scale: 1,
                duration: 0.45,
                ease: "back.out(2)",
                stagger: 0.14,
              },
              "-=1.0",
            );
          }
        },
        once: true,
      });
    },
    { scope: sectionRef },
  );

  return (
    <Section id="process" ref={sectionRef}>
      <Container className="relative flex flex-col gap-34">
        <SectionTitle
          number="02"
          title="Il mio processo"
          subtitle="Quattro passaggi, un metodo. Così trasformo un'idea in un prodotto che funziona."
        />

        {/* ─── Layout orizzontale (lg+) ─────────────────────────── */}
        <div className="relative hidden lg:block">
          {/* Filo SVG – serpentina orizzontale che thread-a tra le card */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1200 360"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              ref={pathRef}
              d="M 0 180 C 100 180, 100 70, 200 70 C 300 70, 300 290, 450 290 C 600 290, 600 70, 750 70 C 900 70, 900 290, 1050 290 C 1150 290, 1150 180, 1200 180"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />

            {/* Dot di intersezione su ogni card */}
            {[
              { cx: 200, cy: 70 },
              { cx: 450, cy: 290 },
              { cx: 750, cy: 70 },
              { cx: 1050, cy: 290 },
            ].map((d, i) => (
              <circle
                key={i}
                ref={(el) => {
                  dotsRef.current[i] = el;
                }}
                cx={d.cx}
                cy={d.cy}
                r="5"
                fill="var(--color-accent)"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>

          {/* Card sfalsate – stessa grid del SVG (4 col, due "row band") */}
          <div className="relative grid grid-cols-4 gap-x-21" style={{ minHeight: "560px" }}>
            {steps.map((step, i) => {
              const isTop = i % 2 === 0;
              return (
                <div
                  key={step.number}
                  ref={(el) => {
                    cardsRef.current[i] = el;
                  }}
                  className={[
                    "relative",
                    isTop ? "self-start mt-55" : "self-end mb-55",
                  ].join(" ")}
                >
                  <ProcessCard step={step} />
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── Fallback md – griglia 2x2 ───────────────────────── */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-21">
          {steps.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
            >
              <ProcessCard step={step} />
            </div>
          ))}
        </div>

        {/* ─── Mobile – stack verticale con filo a sinistra ─── */}
        <div className="md:hidden relative pl-34">
          <div
            aria-hidden
            className="absolute left-13 top-8 bottom-8 w-px bg-accent"
          />
          <div className="flex flex-col gap-34">
            {steps.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                className="relative"
              >
                <span
                  className="absolute -left-21 top-21 w-13 h-13 rounded-full bg-accent"
                  aria-hidden
                />
                <ProcessCard step={step} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

/* ─── Card singola – isolata per riusare nei 3 breakpoint ──── */
function ProcessCard({ step }) {
  return (
    <article className="group relative h-full u-surface u-rule p-21 transition-all duration-300 hover:-translate-y-5">
      {/* Header – numero + label */}
      <div className="flex items-baseline justify-between gap-13 pb-13 u-rule-b">
        <span
          className="font-display italic text-lg font-medium leading-none text-accent"
          aria-hidden
        >
          {step.number}
        </span>
        <span className="font-mono text-(length:--fs-2xs) font-semibold tracking-[0.25em] uppercase text-graphite-3">
          {step.label}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-8 pt-13">
        <h3 className="text-base font-semibold leading-tight text-graphite group-hover:text-accent transition-colors duration-200">
          {step.title}
        </h3>
        <p className="text-base text-graphite-2 leading-relaxed">
          {step.description}
        </p>
      </div>
    </article>
  );
}
