import { SOCIAL_LINKS } from '../constants/footer'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="u-rule-t py-8">
      <div
        className="w-full mx-auto px-(--section-padding-x) max-w-(--container-max) flex flex-col sm:flex-row items-center justify-between gap-4"
      >

        {/* Copyright + firma */}
        <p className="text-xs text-graphite-2 tracking-wide text-center sm:text-left">
          © {year}{' '}
          <span className="text-graphite font-medium">Nicolas Brazzo</span>
          {' '}— Built with React &amp; Tailwind
        </p>

        {/* Social links */}
        <nav aria-label="Social links" className="flex items-center gap-5">
          {SOCIAL_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-graphite-2 hover:text-accent transition-colors duration-200 tracking-wide"
            >
              {label}
            </a>
          ))}
        </nav>

      </div>
    </footer>
  )
}
