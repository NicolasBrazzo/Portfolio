import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { prefersReducedMotion } from "../../lib/motion";
import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { SOCIALS } from "../../constants/contact.jsx";

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
    <Section id="contact" ref={sectionRef}>
      <Container>
        <div className="flex flex-col items-start gap-34 max-w-2xl">
          {/* Badge disponibilità */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-8 px-13 py-5 u-rule bg-paper-2"
          >
            <span className="w-5 h-5 rounded-full bg-accent animate-pulse" />
            <span className="text-micro font-medium tracking-[0.15em] uppercase text-graphite-3">
              Disponibile per nuove opportunità — 2026
            </span>
          </div>

          {/* Headline grande */}
          <h2
            ref={headlineRef}
            className="font-display text-lg lg:text-xl font-medium leading-[0.95] tracking-tighter text-graphite"
          >
            Cerchi uno
            <br />
            sviluppatore?
            <br />
            <em className="font-display italic text-accent">
              Parliamone.
            </em>
          </h2>

          {/* Sottotitolo */}
          <p
            ref={subRef}
            className="text-base text-graphite-2 leading-relaxed"
          >
            Sono aperto a ruoli da developer in sede, ibridi o da remoto, e
            posso iniziare 30 giorni dopo il colloquio.{" "}
            <span className="text-graphite font-medium">Scrivimi qui</span>{" "}
            oppure a{" "}
            <a
              href="mailto:nicolasbrazzo8@gmail.com"
              className="text-accent underline underline-offset-4 hover:text-graphite transition-colors duration-200"
            >
              nicolasbrazzo8@gmail.com
            </a>
            .
          </p>

          {/* Form di contatto */}
          <div ref={ctaRef} className="w-full">
            {status === "success" ? (
              <div
                role="status"
                aria-live="polite"
                className="flex flex-col gap-8 p-21 u-rule bg-paper-2"
              >
                <div className="flex items-center gap-13">
                  <span aria-hidden className="text-md text-accent">
                    ✓
                  </span>
                  <p className="text-graphite font-medium text-base">
                    Grazie per avermi scritto!
                  </p>
                </div>
                <p className="text-graphite-2 text-base pl-34">
                  Ho ricevuto il tuo messaggio. Ti rispondo il prima possibile.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-13 w-full"
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-13">
                  <input
                    type="text"
                    name="name"
                    placeholder="Il tuo nome"
                    required
                    disabled={status === "sending"}
                    className="bg-paper-2 u-rule px-13 py-13 text-graphite placeholder:text-graphite-3 focus:outline-none focus:border-accent/50 transition-colors duration-200 disabled:opacity-50"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="La tua email"
                    required
                    disabled={status === "sending"}
                    className="bg-paper-2 u-rule px-13 py-13 text-graphite placeholder:text-graphite-3 focus:outline-none focus:border-accent/50 transition-colors duration-200 disabled:opacity-50"
                  />
                </div>

                <textarea
                  name="message"
                  placeholder="Il tuo messaggio"
                  rows={5}
                  required
                  disabled={status === "sending"}
                  className="bg-paper-2 u-rule px-13 py-13 text-graphite placeholder:text-graphite-3 focus:outline-none focus:border-accent/50 transition-colors duration-200 resize-none disabled:opacity-50"
                />

                <div className="flex flex-col gap-13 pt-5">
                  <Button
                    type="submit"
                    disabled={status === "sending"}
                    className="text-base px-34 py-13 self-start disabled:opacity-60 disabled:cursor-wait"
                  >
                    {status === "sending"
                      ? "Invio in corso…"
                      : "Invia messaggio"}
                    {status !== "sending" && (
                      <span aria-hidden className="text-base">
                        →
                      </span>
                    )}
                  </Button>

                  {status === "error" && (
                    <p
                      role="alert"
                      className="text-base text-accent leading-relaxed"
                    >
                      {errorMessage}
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* Social links */}
          <div ref={socialsRef} className="flex items-center gap-21 pt-8">
            <span className="text-micro font-medium tracking-[0.2em] uppercase text-graphite-3">
              Trovami su
            </span>
            <div className="flex items-center gap-13">
              {SOCIALS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-34 h-34 text-graphite-2 u-rule hover:text-accent hover:border-accent/30 transition-colors duration-200"
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
