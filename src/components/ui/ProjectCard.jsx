/**
 * ProjectCard – card singolo progetto.
 *
 * Props: { title, role, description, stack[], liveUrl, repoUrl, image }
 */
export function ProjectCard({ title, role, description, stack = [], liveUrl, repoUrl, image }) {
  return (
    <article className="group flex flex-col h-full min-h-[540px] u-surface u-border-subtle rounded-xl overflow-hidden transition-all duration-300 hover:u-glow-accent hover:-translate-y-1">

      {/* Immagine / placeholder */}
      <div className="relative w-full aspect-video overflow-hidden bg-surface-raised">
        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* Placeholder grafico quando l'immagine non è disponibile */
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  'linear-gradient(var(--color-text) 1px, transparent 1px), linear-gradient(90deg, var(--color-text) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
            <div
              className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-3xl opacity-20"
              style={{ background: 'var(--color-accent)' }}
            />
            <span className="relative text-xs font-medium tracking-[0.2em] uppercase text-muted">
              {title}
            </span>
          </div>
        )}

        {/* Overlay gradient leggero sull'immagine */}
        <div className="absolute inset-0 bg-linear-to-t from-surface/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Corpo card */}
      <div className="flex flex-col gap-4 p-6 flex-1">

        {/* Stack badges */}
        <div className="flex flex-wrap items-start content-start gap-1.5 min-h-[56px] max-h-[56px] overflow-hidden">
          {stack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase text-muted border border-white/8 rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Titolo + ruolo */}
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold text-text leading-tight group-hover:text-accent transition-colors duration-200 line-clamp-2 min-h-[3.1em]">
            {title}
          </h3>
          <p className="text-xs font-medium tracking-wide text-muted uppercase">
            {role}
          </p>
        </div>

        {/* Descrizione */}
        <p className="text-sm text-muted leading-relaxed line-clamp-4 min-h-[5.6em] flex-1">
          {description}
        </p>

        {/* Link */}
        <div className="flex items-center gap-4 pt-2 mt-auto border-t border-white/5">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-text hover:text-accent transition-colors duration-200"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Live
            </a>
          )}
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted hover:text-accent transition-colors duration-200"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>
          )}
          {!liveUrl && !repoUrl && (
            <span className="text-xs text-muted/50 italic">Privato</span>
          )}
        </div>

      </div>
    </article>
  )
}
