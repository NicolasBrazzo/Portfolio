import { ArrowUpRight } from 'lucide-react'
import { Container } from '../ui/Container'
import { Label } from '../ui/Label'
import { OWNER, SOCIAL_LINKS } from '../../constants/site'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line">
      <Container className="flex flex-wrap items-center justify-between gap-21 py-34">
        <Label>
          © {year} {OWNER}
        </Label>

        <nav aria-label="Social" className="flex items-center gap-21">
          {SOCIAL_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="u-label group inline-flex items-center gap-5 text-fg-2 no-underline transition-colors duration-(--duration-micro) hover:text-accent"
            >
              {label}
              <ArrowUpRight
                aria-hidden
                size={13}
                strokeWidth={1.75}
                className="transition-transform duration-(--duration-micro) ease-out-expo group-hover:-translate-y-2 group-hover:translate-x-2"
              />
            </a>
          ))}
        </nav>
      </Container>
    </footer>
  )
}
