import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Section } from "../components/ui/Section";
import { Container } from "../components/ui/Container";
import { SectionTitle } from "../components/ui/SectionTitle";
import { Button } from "../components/ui/Button";
import { caseStudies } from "../data/caseStudies";
import readitImg from "../assets/Readit.png";
import snippifyImg from "../assets/Snippify.png";
import voltaImg from "../assets/Volta.png";

const IMAGE_MAP = {
  ReadIt: readitImg,
  Snippify: snippifyImg,
  Volta: voltaImg,
};

export const CaseStudyDetail = () => {
  const { id } = useParams();
  const project = caseStudies.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  if (!project) {
    return (
      <>
        <Navbar />
        <main>
          <Section>
            <Container className="flex flex-col items-start gap-6 pt-24">
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent font-mono">
                404
              </span>
              <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight text-text">
                Caso studio non trovato
              </h1>
              <p className="text-base text-muted leading-relaxed max-w-xl">
                Il progetto che stai cercando non esiste o è stato rimosso.
              </p>
              <Button as={Link} to="/" variant="outline">
                Torna alla home
              </Button>
            </Container>
          </Section>
        </main>
        <Footer />
      </>
    );
  }

  const image = project.image ?? IMAGE_MAP[project.title] ?? null;

  return (
    <>
      <Navbar />
      <main>
        {/* HERO */}
        <Section className="pt-32">
          <Container className="flex flex-col gap-10">
            <Link
              to="/#case-studies"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-muted hover:text-accent transition-colors duration-200 w-fit"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Torna ai casi studio
            </Link>

            <div className="flex flex-col gap-6">
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent font-mono">
                {project.role}
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-text">
                {project.title}
              </h1>
              <p className="text-lg md:text-xl text-muted leading-relaxed max-w-3xl">
                {project.description}
              </p>
            </div>

            {/* Meta info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/5">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted">Anno</span>
                <span className="text-sm font-medium text-text">{project.year ?? "—"}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted">Durata</span>
                <span className="text-sm font-medium text-text">{project.duration ?? "—"}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted">Cliente</span>
                <span className="text-sm font-medium text-text">{project.client ?? "—"}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted">Ruolo</span>
                <span className="text-sm font-medium text-text">{project.role}</span>
              </div>
            </div>

            {/* Stack */}
            {project.stack?.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase text-muted border border-white/8 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4">
              {project.liveUrl && (
                <Button as="a" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  Visita il sito
                </Button>
              )}
              {project.repoUrl && (
                <Button as="a" href={project.repoUrl} target="_blank" rel="noopener noreferrer" variant="outline">
                  Codice su GitHub
                </Button>
              )}
            </div>
          </Container>
        </Section>

        {/* COVER */}
        {image && (
          <Section className="py-0">
            <Container>
              <div className="relative w-full aspect-video overflow-hidden rounded-xl u-border-subtle">
                <img
                  src={image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Container>
          </Section>
        )}

        {/* OVERVIEW */}
        {project.overview && (
          <Section>
            <Container className="grid md:grid-cols-12 gap-10">
              <div className="md:col-span-4">
                <SectionTitle number="01" title="Overview" />
              </div>
              <div className="md:col-span-8">
                <p className="text-base md:text-lg text-muted leading-relaxed">
                  {project.overview}
                </p>
              </div>
            </Container>
          </Section>
        )}

        {/* CHALLENGE & SOLUTION */}
        {(project.challenge || project.solution) && (
          <Section>
            <Container className="grid md:grid-cols-2 gap-10">
              {project.challenge && (
                <div className="flex flex-col gap-4 p-8 u-surface u-border-subtle rounded-xl">
                  <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent font-mono">
                    Challenge
                  </span>
                  <h3 className="text-2xl font-bold text-text leading-tight">
                    Il problema
                  </h3>
                  <p className="text-sm md:text-base text-muted leading-relaxed">
                    {project.challenge}
                  </p>
                </div>
              )}
              {project.solution && (
                <div className="flex flex-col gap-4 p-8 u-surface u-border-subtle rounded-xl">
                  <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent font-mono">
                    Solution
                  </span>
                  <h3 className="text-2xl font-bold text-text leading-tight">
                    L'approccio
                  </h3>
                  <p className="text-sm md:text-base text-muted leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              )}
            </Container>
          </Section>
        )}

        {/* FEATURES */}
        {project.features?.length > 0 && (
          <Section>
            <Container className="flex flex-col gap-12">
              <SectionTitle
                number="02"
                title="Feature chiave"
                subtitle="Le funzionalità che rendono il prodotto unico"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.features.map((feature, i) => (
                  <div
                    key={feature.title}
                    className="flex flex-col gap-3 p-6 u-surface u-border-subtle rounded-xl"
                  >
                    <span className="text-xs font-mono text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h4 className="text-lg font-bold text-text leading-tight">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </Container>
          </Section>
        )}

        {/* RESULTS */}
        {project.results?.length > 0 && (
          <Section>
            <Container className="flex flex-col gap-12">
              <SectionTitle number="03" title="Risultati" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {project.results.map((r) => (
                  <div
                    key={r.label}
                    className="flex flex-col gap-2 p-8 u-surface u-border-subtle rounded-xl"
                  >
                    <span className="text-4xl md:text-5xl font-black text-accent leading-none">
                      {r.value}
                    </span>
                    <span className="text-xs font-medium tracking-wide text-muted uppercase">
                      {r.label}
                    </span>
                  </div>
                ))}
              </div>
            </Container>
          </Section>
        )}

        {/* GALLERY */}
        {project.gallery?.length > 0 && (
          <Section>
            <Container className="flex flex-col gap-12">
              <SectionTitle number="04" title="Galleria" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.gallery.map((src, i) => (
                  <div
                    key={i}
                    className="relative w-full aspect-video overflow-hidden rounded-xl u-border-subtle"
                  >
                    <img
                      src={src}
                      alt={`${project.title} — screenshot ${i + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </Container>
          </Section>
        )}

        {/* CTA FINALE */}
        <Section>
          <Container className="flex flex-col items-start gap-6 p-10 u-surface u-border-subtle rounded-xl">
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent font-mono">
              Next
            </span>
            <h3 className="text-3xl md:text-4xl font-black text-text leading-tight">
              Ti piace quello che vedi?
            </h3>
            <p className="text-base text-muted leading-relaxed max-w-xl">
              Scopri gli altri casi studio o scrivimi per parlare di un nuovo progetto insieme.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button as={Link} to="/#case-studies" variant="outline">
                Altri casi studio
              </Button>
              <Button as={Link} to="/#contact">
                Contattami
              </Button>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
};
