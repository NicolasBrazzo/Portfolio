import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { prefersReducedMotion } from "../../lib/motion";
import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { SOCIALS } from "../../data/socials";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mqejgpyg";

export function Contact() {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const socialsRef = useRef(null);

  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        return;
      }

      const data = await response.json().catch(() => null);
      const message =
        data?.errors?.[0]?.message ||
        "Qualcosa è andato storto durante l'invio. Riprova tra qualche istante.";
      setErrorMessage(message);
      setStatus("error");
    } catch {
      setErrorMessage(
        "Errore di rete. Controlla la connessione e riprova.",
      );
      setStatus("error");
    }
  };

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const els = [
        badgeRef.current,
        headlineRef.current,
        subRef.current,
        ctaRef.current,
        socialsRef.current,
      ].filter(Boolean);
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
            stagger: 0.12,
          });
        },
        once: true,
      });
    },
    { scope: sectionRef },
  );

  return (
    <Section id="contact" ref={sectionRef} noise>
      <Container>
        <div className="flex flex-col items-start gap-10 max-w-2xl">
          {/* Badge disponibilità */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-surface"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium tracking-[0.15em] uppercase text-muted">
              Aperto a nuovi progetti — 2026
            </span>
          </div>

          {/* Headline grande */}
          <h2
            ref={headlineRef}
            className="text-[clamp(2.8rem,7vw,5.5rem)] font-black leading-[0.95] tracking-tight text-text"
          >
            Costruiamo
            <br />
            qualcosa
            <br />
            <em
              className="not-italic text-accent"
              style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
            >
              insieme.
            </em>
          </h2>

          {/* Sottotitolo */}
          <p
            ref={subRef}
            className="text-base md:text-lg text-muted leading-relaxed"
          >
            Hai un progetto in mente, un'idea da sviluppare o semplicemente vuoi
            scambiare due parole?{" "}
            <span className="text-text font-medium">Scrivimi.</span> Rispondo
            entro 24 ore.
          </p>

          {/* Form di contatto */}
          <div ref={ctaRef} className="w-full">
            {status === "success" ? (
              <div
                role="status"
                aria-live="polite"
                className="flex flex-col gap-2 p-6 rounded-2xl border border-accent/30 bg-accent/5"
              >
                <div className="flex items-center gap-3">
                  <span aria-hidden className="text-2xl text-accent">
                    ✓
                  </span>
                  <p className="text-text font-medium text-lg">
                    Grazie per avermi scritto!
                  </p>
                </div>
                <p className="text-muted text-sm pl-9">
                  Ho ricevuto il tuo messaggio. Ti rispondo entro 24 ore.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 w-full"
              >
                {/* Honeypot anti-spam (invisibile agli utenti reali) */}
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Il tuo nome"
                    required
                    disabled={status === "sending"}
                    className="bg-surface border border-white/10 rounded-xl px-4 py-3 text-text placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors duration-200 disabled:opacity-50"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="La tua email"
                    required
                    disabled={status === "sending"}
                    className="bg-surface border border-white/10 rounded-xl px-4 py-3 text-text placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors duration-200 disabled:opacity-50"
                  />
                </div>

                <textarea
                  name="message"
                  placeholder="Raccontami del tuo progetto"
                  rows={5}
                  required
                  disabled={status === "sending"}
                  className="bg-surface border border-white/10 rounded-xl px-4 py-3 text-text placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors duration-200 resize-none disabled:opacity-50"
                />

                <div className="flex flex-col gap-3 pt-1">
                  <Button
                    type="submit"
                    disabled={status === "sending"}
                    className="text-base px-8 py-4 self-start disabled:opacity-60 disabled:cursor-wait"
                  >
                    {status === "sending"
                      ? "Invio in corso…"
                      : "Invia messaggio"}
                    {status !== "sending" && (
                      <span aria-hidden className="text-lg">
                        →
                      </span>
                    )}
                  </Button>

                  {status === "error" && (
                    <p
                      role="alert"
                      className="text-sm text-red-400 leading-relaxed"
                    >
                      {errorMessage}
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* Social links */}
          <div ref={socialsRef} className="flex items-center gap-6 pt-2">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-muted">
              Trovami su
            </span>
            <div className="flex items-center gap-4">
              {SOCIALS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-lg text-muted u-border-subtle hover:text-accent hover:border-accent/30 transition-colors duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
