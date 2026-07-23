import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/gsap";
import { prefersReducedMotion } from "../../lib/motion";
import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";

export function Hero() {
  const containerRef = useRef(null);
  const scrollIndRef = useRef(null);
  const badgeLineRef = useRef(null);
  const nameLineRef = useRef(null);
  const headlineLinesRef = useRef([]);
  const subLinesRef = useRef([]);
  const ctaLineRef = useRef(null);
  const gridRafRef = useRef(0);
  const gridPosRef = useRef({ x: 0, y: 0 });

  // Reset array refs ad ogni render per evitare accumuli
  headlineLinesRef.current = [];
  subLinesRef.current = [];

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const updateGridVars = () => {
    gridRafRef.current = 0;
    const el = containerRef.current;
    if (!el) return;
    el.style.setProperty("--grid-x", `${gridPosRef.current.x}px`);
    el.style.setProperty("--grid-y", `${gridPosRef.current.y}px`);
  };

  const onGridMove = (e) => {
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    gridPosRef.current.x = e.clientX - r.left;
    gridPosRef.current.y = e.clientY - r.top;
    if (!gridRafRef.current) {
      gridRafRef.current = requestAnimationFrame(updateGridVars);
    }
  };

  const onGridLeave = () => {
    const el = containerRef.current;
    if (gridRafRef.current) {
      cancelAnimationFrame(gridRafRef.current);
      gridRafRef.current = 0;
    }
    if (el) {
      el.style.setProperty("--grid-x", "50%");
      el.style.setProperty("--grid-y", "45%");
    }
  };

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const headlineEls = headlineLinesRef.current.filter(Boolean);
      const restEls = [
        badgeLineRef.current,
        nameLineRef.current,
        ...subLinesRef.current.filter(Boolean),
        ctaLineRef.current,
      ].filter(Boolean);
      const scrollEl = scrollIndRef.current;

      // Stato iniziale – headline chiusa nella maschera, resto invisibile
      gsap.set(headlineEls, { yPercent: 110 });
      gsap.set(restEls, { opacity: 0, y: 8 });
      if (scrollEl) gsap.set(scrollEl, { opacity: 0, y: 8 });

      // Un gesto solo: la headline si rivela dal basso, decisa;
      // tutto il resto arriva subito dopo, compatto, quasi insieme.
      const tl = gsap.timeline();

      if (headlineEls.length) {
        tl.to(headlineEls, {
          yPercent: 0,
          duration: 0.6,
          ease: "power4.out",
          stagger: 0.05,
        });
      }

      if (restEls.length) {
        tl.to(
          restEls,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
            stagger: 0.03,
          },
          headlineEls.length ? "-=0.25" : 0,
        );
      }

      if (scrollEl) {
        tl.to(
          scrollEl,
          { opacity: 0.4, y: 0, duration: 0.45, ease: "power2.out" },
          "<",
        );
      }

      // Saltabile: al primo scroll dell'utente, salta subito alla fine
      const skipIntro = () => tl.progress(1);
      window.addEventListener("scroll", skipIntro, {
        passive: true,
        once: true,
      });
      window.addEventListener("wheel", skipIntro, {
        passive: true,
        once: true,
      });
      window.addEventListener("touchmove", skipIntro, {
        passive: true,
        once: true,
      });

      return () => {
        window.removeEventListener("scroll", skipIntro);
        window.removeEventListener("wheel", skipIntro);
        window.removeEventListener("touchmove", skipIntro);
      };
    },
    { scope: containerRef },
  );

  return (
    <Section
      id="hero"
      className="group py-0 min-h-screen flex flex-col justify-center"
      ref={containerRef}
      onPointerMove={onGridMove}
      onPointerLeave={onGridLeave}
      style={{
        "--grid-reveal-size": "260px",
        "--grid-x": "50%",
        "--grid-y": "45%",
      }}
    >
      {/* ── Grid background (full viewport) ───────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--color-rule) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-rule) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          backgroundPosition: "center",
          maskImage:
            "radial-gradient(circle var(--grid-reveal-size) at var(--grid-x) var(--grid-y), rgba(0,0,0,1) 0%, rgba(0,0,0,0) 72%)",
          WebkitMaskImage:
            "radial-gradient(circle var(--grid-reveal-size) at var(--grid-x) var(--grid-y), rgba(0,0,0,1) 0%, rgba(0,0,0,0) 72%)",
        }}
      />

      <Container className="relative pt-89 pb-55 md:pb-89">
        <div className="mx-auto flex flex-col items-center text-center gap-34 max-w-3xl">

          {/* Name */}
          <div
            ref={nameLineRef}
            className="text-micro font-semibold tracking-[0.22em] uppercase text-graphite/90"
          >
            Nicolas Brazzo<span className="text-accent">.</span>
          </div>

          {/* Headline — mask reveal dal basso */}
          <h1 className="font-display text-lg md:text-xl lg:text-2xl font-medium leading-[0.95] tracking-tighter text-graphite">
            <span className="block overflow-hidden">
              <span
                ref={(el) => el && headlineLinesRef.current.push(el)}
                className="block"
              >
                Web developer
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                ref={(el) => el && headlineLinesRef.current.push(el)}
                className="block"
              >
                <span className="inline-flex items-baseline gap-13 flex-wrap">
                  <em className="font-display italic text-accent leading-none">
                    front-end
                  </em>
                </span>
                <span className="text-accent">.</span>
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base text-graphite-2 leading-relaxed max-w-xl">
            <span
              ref={(el) => el && subLinesRef.current.push(el)}
              className="block"
            >
              Progetto e costruisco sistemi digitali che funzionano davvero.
            </span>
            <span
              ref={(el) => el && subLinesRef.current.push(el)}
              className="block"
            >
              Ogni interfaccia nasce da un{" "}
              <span className="text-graphite font-medium">sistema</span>, non da
              un'ispirazione casuale.
            </span>
          </p>

          {/* CTA row */}
          <div
            ref={ctaLineRef}
            className="flex items-center justify-center gap-13 flex-wrap pt-8"
          >
            <Button onClick={() => scrollTo("projects")}>
              Vedi i progetti <span aria-hidden>→</span>
            </Button>
            <Button variant="outline" onClick={() => scrollTo("contact")}>
              Contattami
            </Button>
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <div
        ref={scrollIndRef}
        className="absolute bottom-34 left-1/2 -translate-x-1/2 flex flex-col items-center gap-8"
      >
        <span className="font-mono text-(length:--fs-2xs) font-medium tracking-[0.25em] uppercase text-graphite-3">
          Scroll
        </span>
        <div className="w-px h-34 bg-rule" />
      </div>
    </Section>
  );
}
