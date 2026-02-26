import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import { prefersReducedMotion } from "../lib/motion";
import { Section } from "../components/ui/Section";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";

export function Hero() {
  const containerRef = useRef(null);
  const scrollIndRef = useRef(null);
  const badgeLineRef = useRef(null);
  const titleLinesRef = useRef([]);
  const subLinesRef = useRef([]);
  const ctaLineRef = useRef(null);
  const gridRafRef = useRef(0);
  const gridPosRef = useRef({ x: 0, y: 0 });

  // Reset array refs ad ogni render per evitare accumuli
  titleLinesRef.current = [];
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

      const badgeEl = badgeLineRef.current;
      const titleEls = titleLinesRef.current.filter(Boolean);
      const subEls = subLinesRef.current.filter(Boolean);
      const ctaEl = ctaLineRef.current;

      // Stato iniziale – elementi invisibili prima del primo paint
      gsap.set([badgeEl, ...titleEls, ...subEls, ctaEl].filter(Boolean), {
        opacity: 0,
        y: 10,
      });
      if (scrollIndRef.current)
        gsap.set(scrollIndRef.current, { opacity: 0, y: 10 });

      // Timeline d'ingresso
      const tl = gsap.timeline({ defaults: { ease: "sine.out" } });

      // 1) Titolo (con badge)
      if (badgeEl) {
        tl.to(
          badgeEl,
          { opacity: 1, y: 0, duration: 0.55, ease: "sine.out" },
          0.05,
        );
      }

      if (titleEls.length) {
        tl.to(
          titleEls,
          {
            opacity: 1,
            y: 0,
            duration: 0.78,
            ease: "sine.out",
            stagger: { amount: 0.16, from: "start" },
          },
          badgeEl ? "-=0.18" : 0.06,
        );
      }

      // 2) Sottotitolo (più vicino)
      if (subEls.length) {
        tl.to(
          subEls,
          {
            opacity: 1,
            y: 0,
            duration: 0.62,
            ease: "sine.out",
            stagger: { amount: 0.14, from: "start" },
          },
          "+=0.14",
        );
      }

      // 3) CTA (più vicino)
      if (ctaEl) {
        tl.to(
          ctaEl,
          { opacity: 1, y: 0, duration: 0.56, ease: "sine.out" },
          "+=0.16",
        );
      }

      if (scrollIndRef.current) {
        tl.to(
          scrollIndRef.current,
          { opacity: 0.4, y: 0, duration: 0.6, ease: "sine.out" },
          "-=0.28",
        );
      }
    },
    { scope: containerRef },
  );

  return (
    <Section
      id="hero"
      noise
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
      {/* ── Gradient background decorativo ────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 65% 55% at 82% 12%, rgba(255,92,0,0.11) 0%, transparent 70%),
            radial-gradient(ellipse 45% 40% at 8%  88%, rgba(255,92,0,0.06) 0%, transparent 65%),
            radial-gradient(ellipse 85% 65% at 50% 50%, rgba(255,92,0,0.02) 0%, transparent 75%)
          `,
        }}
      />

      {/* ── Grid background (full viewport) ───────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff10 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff10 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          backgroundPosition: "center",
          maskImage:
            "radial-gradient(circle var(--grid-reveal-size) at var(--grid-x) var(--grid-y), rgba(0,0,0,1) 0%, rgba(0,0,0,0) 72%)",
          WebkitMaskImage:
            "radial-gradient(circle var(--grid-reveal-size) at var(--grid-x) var(--grid-y), rgba(0,0,0,1) 0%, rgba(0,0,0,0) 72%)",
        }}
      />

      <Container className="relative pt-24 pb-16 md:pb-20">
        <div className="mx-auto flex flex-col items-center text-center gap-8 max-w-3xl">
          {/* Badge "available" */}
          <div
            ref={badgeLineRef}
            className="inline-flex items-center gap-2 w-fit px-3.5 py-1.5 rounded-full border border-white/10 bg-surface"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium tracking-[0.15em] uppercase text-muted">
              Available for work
            </span>
          </div>

          {/* Name */}
          <div
            ref={(el) => el && titleLinesRef.current.push(el)}
            className="text-[11px] font-semibold tracking-[0.22em] uppercase text-text/90"
          >
            Nicolas Brazzo<span className="text-accent">.</span>
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(3rem,8vw,6rem)] font-black leading-[0.95] tracking-tight text-text">
            <span
              ref={(el) => el && titleLinesRef.current.push(el)}
              className="block"
            >
              Frontend dev
            </span>
            <span
              ref={(el) => el && titleLinesRef.current.push(el)}
              className="block"
            >
              <span className="inline-flex items-baseline gap-3 flex-wrap">
                <span className="opacity-70 font-medium">&amp; </span>
                <em
                  className="not-italic text-accent leading-none"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                  }}
                >
                  designer
                </em>
              </span>
              <span className="text-accent">.</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-muted leading-relaxed max-w-xl">
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
              <span className="text-text font-medium">sistema</span>, non da
              un'ispirazione casuale.
            </span>
          </p>

          {/* CTA row */}
          <div
            ref={ctaLineRef}
            className="flex items-center justify-center gap-4 flex-wrap pt-2"
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-muted">
          Scroll
        </span>
        <div className="w-px h-10 bg-linear-to-b from-muted to-transparent" />
      </div>
    </Section>
  );
}
