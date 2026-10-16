import { useRef } from 'react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { cx } from '../../../lib/cx'
import { gsap, useGSAP, EASE_OUT } from '../../../lib/gsap'
import { prefersReducedMotion } from '../../../lib/motion'
import { scrollToTarget } from '../../../lib/scroll'
import { Button } from '../../ui/Button'
import { Container } from '../../ui/Container'
import { Crosshair } from '../../ui/Crosshair'
import { Label } from '../../ui/Label'
import { PencilArrow } from '../../ui/pencil/PencilArrow'
import { PencilCircle } from '../../ui/pencil/PencilCircle'
import { HERO } from '../../../data/home'
import { CV_FILENAME } from '../../../constants/site'
import cvUrl from '../../../assets/Nicolas Brazzo Frontend Developer · React.pdf?url'

/* Riga del titolo: la maschera serve solo durante l'intro, poi torna
   visibile per non tagliare il cerchio a matita. */
const Line = ({ className, children }) => (
  <span data-hero-line className="block pb-[0.04em]">
    <span className={cx('block', className)}>{children}</span>
  </span>
)

export function Hero() {
  const ref = useRef(null)
  const { corners, headline, note, intro } = HERO

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      const lines = gsap.utils.toArray('[data-hero-line]')
      gsap.set(lines, { overflow: 'hidden' })

      gsap
        .timeline({ onComplete: () => gsap.set(lines, { overflow: 'visible' }) })
        .from('[data-hero-line] > span', { yPercent: 108, duration: 1.2, ease: EASE_OUT, stagger: 0.09 })
        .from('[data-hero-fade]', { autoAlpha: 0, y: 13, duration: 1.2, ease: EASE_OUT, stagger: 0.06 }, 0.5)
    },
    { scope: ref },
  )

  return (
    <section id="hero" ref={ref} className="relative cursor-crosshair overflow-hidden">
      <Crosshair />

      <Container className="relative grid min-h-[min(860px,calc(100svh-var(--nav-h)))] grid-cols-12 grid-rows-[auto_1fr_auto] gap-x-21 gap-y-34 pt-55 pb-55 lg:pb-89">
        {/* Quote agli angoli, come in un foglio tecnico */}
        <Label data-hero-fade className="col-span-6 flex flex-col gap-5 lg:col-span-3">
          {corners.left.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </Label>
        <Label data-hero-fade className="hidden flex-col gap-5 lg:col-span-4 lg:col-start-5 lg:flex">
          {corners.center.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </Label>
        <Label data-hero-fade className="col-span-6 flex flex-col items-end gap-5 text-right lg:col-span-3 lg:col-start-10">
          {corners.right.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </Label>

        <h1 className="relative col-span-12 m-0 self-center font-display text-hero font-extrabold">
          <Line>{headline.first}</Line>
          <Line className="pl-[8%] lg:pl-[17%]">
            <span className="u-hand text-[0.92em] tracking-[-0.03em] text-accent">{headline.hand}</span>{' '}
            <span className="u-outline">{headline.outline}</span>
          </Line>
          <Line className="text-right">
            {headline.lead} <PencilCircle>{headline.circled}</PencilCircle>.
          </Line>

          <span
            data-hero-fade
            className="u-hand absolute top-[4%] right-[2%] hidden text-base leading-tight font-normal tracking-normal text-fg-2 lg:block"
          >
            <PencilArrow className="absolute top-8 -left-55 h-34 w-55" />
            {note[0]}
            <br />
            {note[1]}
          </span>
        </h1>

        <div className="col-span-12 grid grid-cols-12 items-end gap-x-21 gap-y-34">
          <p data-hero-fade className="col-span-12 m-0 max-w-[44ch] text-fg-2 lg:col-span-5">
            {intro.before}
            <strong className="font-medium text-fg">{intro.strong}</strong>
            {intro.after}
          </p>
          <div
            data-hero-fade
            className="col-span-12 flex flex-wrap gap-13 lg:col-span-5 lg:col-start-8 lg:justify-end"
          >
            <Button
              as="a"
              href="#lavori"
              icon={ArrowRight}
              magnetic
              onClick={(e) => {
                e.preventDefault()
                scrollToTarget('#lavori')
              }}
            >
              {HERO.ctaPrimary}
            </Button>
            <Button as="a" href={cvUrl} download={CV_FILENAME} variant="outline" icon={ArrowDown} iconShift="y" magnetic>
              {HERO.ctaSecondary}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
