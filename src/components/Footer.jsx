const SOCIAL_LINKS = [
  { label: 'GitHub',      href: 'https://github.com/NicolasBrazzo'   },
  { label: 'LinkedIn',    href: 'https://www.linkedin.com/in/nicolas-brazzo-a91509286/' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5 py-8">
      <div
        className="w-full mx-auto px-(--section-padding-x) max-w-(--container-max) flex flex-col sm:flex-row items-center justify-between gap-4"
      >

        {/* Copyright + firma */}
        <p className="text-xs text-muted tracking-wide text-center sm:text-left">
          © {year}{' '}
          <span className="text-text font-medium">Nicolas Brazzo</span>
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
              className="text-xs font-medium text-muted hover:text-accent transition-colors duration-200 tracking-wide"
            >
              {label}
            </a>
          ))}
        </nav>

      </div>
    </footer>
  )
}
