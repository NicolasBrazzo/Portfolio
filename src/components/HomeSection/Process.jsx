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
      {/* Glow decorativo coerente con Hero */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
      />

      <Container className="relative flex flex-col gap-10">
        <SectionTitle
          number="01"
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
            <defs>
              <linearGradient id="thread-gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0" />
                <stop offset="8%" stopColor="var(--color-accent)" stopOpacity="1" />
                <stop offset="92%" stopColor="var(--color-accent)" stopOpacity="1" />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              ref={pathRef}
              d="M 0 180 C 100 180, 100 70, 200 70 C 300 70, 300 290, 450 290 C 600 290, 600 70, 750 70 C 900 70, 900 290, 1050 290 C 1150 290, 1150 180, 1200 180"
              fill="none"
              stroke="url(#thread-gradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{
                filter: "drop-shadow(0 0 8px var(--color-accent-glow))",
              }}
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
                style={{
                  filter: "drop-shadow(0 0 6px var(--color-accent-glow))",
                }}
              />
            ))}
          </svg>

          {/* Card sfalsate – stessa grid del SVG (4 col, due "row band") */}
          <div className="relative grid grid-cols-4 gap-x-6" style={{ minHeight: "560px" }}>
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
                    isTop ? "self-start mt-16" : "self-end mb-16",
                  ].join(" ")}
                >
                  <ProcessCard step={step} />
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── Fallback md – griglia 2x2 ───────────────────────── */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-6">
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
        <div className="md:hidden relative pl-8">
          <div
            aria-hidden
            className="absolute left-3 top-2 bottom-2 w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent, var(--color-accent) 10%, var(--color-accent) 90%, transparent)",
            }}
          />
          <div className="flex flex-col gap-8">
            {steps.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                className="relative"
              >
                <span
                  className="absolute -left-[1.55rem] top-6 w-3 h-3 rounded-full bg-accent"
                  style={{ boxShadow: "0 0 8px var(--color-accent-glow)" }}
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
    <article className="group relative h-full u-surface u-border-subtle rounded-xl p-6 transition-all duration-300 hover:u-glow-accent hover:-translate-y-1">
      {/* Header – numero + label */}
      <div className="flex items-baseline justify-between gap-3 pb-4 border-b border-white/5">
        <span
          className="text-4xl font-black leading-none text-accent"
          style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
          aria-hidden
        >
          {step.number}
        </span>
        <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-muted">
          {step.label}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2.5 pt-4">
        <h3 className="text-lg font-bold leading-tight text-text group-hover:text-accent transition-colors duration-200">
          {step.title}
        </h3>
        <p className="text-sm text-muted leading-relaxed">
          {step.description}
        </p>
      </div>
    </article>
  );
}
