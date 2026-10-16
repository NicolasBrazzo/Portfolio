import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cx } from '../../lib/cx'
import { Label } from './Label'
import { MediaFrame } from './MediaFrame'
import { SpecList } from './SpecList'

/**
 * Riga progetto: indice, titolo display con parola "a mano", descrizione,
 * scheda tecnica e immagine. All'hover una linea accento attraversa la
 * riga, il titolo scivola e l'immagine va a fuoco.
 *
 * Con `to` la riga è un link; senza (es. progetto "in arrivo") resta statica.
 */
export function ProjectRow({ index, title, tag, description, specs, image, imageAlt, mediaNote, placeholder, to, cta }) {
  const Tag = to ? Link : 'div'

  return (
    <Tag
      to={to}
      className={cx(
        'group/project relative grid grid-cols-12 gap-x-21 gap-y-34 border-b border-line py-55 text-fg no-underline lg:py-89',
        'before:absolute before:-top-px before:left-0 before:h-px before:w-full before:origin-left before:scale-x-0 before:bg-accent',
        'before:transition-transform before:duration-1000 before:ease-out-expo',
        to && 'hover:before:scale-x-100',
      )}
    >
      <Label className="col-span-12 lg:col-span-1 lg:pt-13">{index}</Label>

      <div className="col-span-12 flex min-w-0 flex-col gap-34 lg:col-span-5">
        <h3 className="m-0 inline-flex flex-wrap items-baseline gap-x-13 font-display text-project font-extrabold transition-transform duration-1000 ease-out-expo group-hover/project:translate-x-8">
          {title}
          {tag && (
            <span className="u-hand text-[0.38em] text-fg-3 transition-colors duration-(--duration-micro) group-hover/project:text-accent">
              {tag}
            </span>
          )}
        </h3>
        <p className="m-0 max-w-[46ch] text-fg-2">{description}</p>
        <SpecList items={specs} />
        {cta && (
          <Label
            tone="muted"
            className="inline-flex items-center gap-8 transition-colors duration-(--duration-micro) group-hover/project:text-accent"
          >
            {cta}
            <ArrowRight
              aria-hidden
              size={14}
              strokeWidth={1.75}
              className="transition-transform duration-(--duration-micro) ease-out-expo group-hover/project:translate-x-5"
            />
          </Label>
        )}
      </div>

      <MediaFrame
        src={image}
        alt={imageAlt}
        note={mediaNote}
        placeholder={placeholder}
        className="col-span-12 lg:col-span-6"
        imageClassName="scale-[1.04] brightness-90 saturate-[.85] transition-[transform,filter] duration-1000 ease-out-expo group-hover/project:scale-100 group-hover/project:brightness-100 group-hover/project:saturate-100"
      />
    </Tag>
  )
}
